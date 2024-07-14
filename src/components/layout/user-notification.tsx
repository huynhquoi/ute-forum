"use client"

import { useUserStorage } from "@/lib/store/userStorage"
import { Bell, Dot } from "../svgs"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet"
import { useGetNoticeSubscription, useGetNotificationByUserIdSubscription, useIsSeenMutation } from "@/generated/types"
import Description from "../shared/description"
import { Card } from "../ui/card"
import { useEffect, useState } from "react"
import DotItem from "../shared/dot-item"
import './styles.scss'
import { format } from "date-fns"
import { toast } from "../ui/use-toast"

const UserNotification = () => {
  const userStorage = useUserStorage((state) => state.user)
  const [notice, setNotice] = useState(0)

  const { data, loading, error } = useGetNotificationByUserIdSubscription({
    variables: {
      userid: userStorage?.userid
    },
  })

  const [IsSeen] = useIsSeenMutation({})

  useEffect(() => {
    if (!notice) {
      return
    }

    IsSeen({
      variables: {
        noticeid: notice
      }
    }).then(() => setNotice(0))
    .catch((err) => {
      toast({
          title: 'Lỗi',
          description: err.message,
          variant: 'destructive'
      })
  })
  }, [IsSeen, notice])
  return <><Sheet>
    <SheetTrigger asChild >
      <div className="relative inline-block mr-4 hover:cursor-pointer">
        <Bell className="text-2xl" />
        {data?.sub_all_notice_by_userid?.filter(item => !item?.isseen).length
          ? <span className="bell_dot">
            {data?.sub_all_notice_by_userid?.filter(item => !item?.isseen).length}
          </span>
          : <></>}
      </div>
    </SheetTrigger>
    <SheetContent>
      <SheetHeader className="mb-4">
        <SheetTitle>Thông báo</SheetTitle>
        <SheetDescription className="">
          Xem thông báo của bạn tại đây, nhớ đánh dấu đã đọc nhé
        </SheetDescription>
      </SheetHeader>
      {data?.sub_all_notice_by_userid?.length ? <>
        <div className="">
          {data?.sub_all_notice_by_userid?.map(item => (
            <Card
              className={`py-4 rounded-none border-x-0 border-b-0 shadow-none flex items-center justify-between hover:cursor-pointer`}
              key={item?.noiticeid}
              onClick={() => {
                setNotice(item?.noiticeid as number)
              }}>
              <div className="flex flex-col items-start">
                <Description value={item?.content as string} />
                <div className="text-gray-400 text-sm">{format(item?.createday || '', 'dd/MM/yyyy, HH:mm')}</div>
              </div>
              {item?.isseen === 0 ? <DotItem className="w-2 h-2 rounded-full bg-blue-500" /> : <></>}
            </Card>
          ))}
        </div>
      </> : <>Không có thông báo</>}
    </SheetContent>
  </Sheet></>
}

export default UserNotification