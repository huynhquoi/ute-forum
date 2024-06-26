"use client"

import { useUserStorage } from "@/lib/store/userStorage"
import { Bell, Dot } from "../svgs"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet"
import { useGetNoticeSubscription, useGetNotificationByUserIdSubscription, useIsSeenMutation } from "@/generated/types"
import Description from "../shared/description"
import { Card } from "../ui/card"
import { useEffect, useState } from "react"

const UserNotification = () => {
  const userStorage = useUserStorage((state) => state.user)
  const [notice, setNotice] = useState(0)

  const { data, loading, error } = useGetNotificationByUserIdSubscription({
    variables: {
      userid: userStorage?.userid
    }
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
  }, [IsSeen, notice])
  return <><Sheet>
    <SheetTrigger asChild >
      <div className="relative inline-block mr-4 hover:cursor-pointer">
        <Bell className="text-2xl" />
        {data?.sub_all_notice_by_userid?.filter(item => !item?.isseen).length
          ? <span className="absolute top-[-10px] right-[-10px] bg-red-500 rounded-full text-xs font-bold text-white h-4 w-4 flex items-center justify-center">
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
              <Description value={item?.content as string} />
              {item?.isseen === 0 ? <Dot className="text-2xl text-blue-600" /> : <></>}
            </Card>
          ))}
        </div>
      </> : <>Không có thông báo</>}
    </SheetContent>
  </Sheet></>
}

export default UserNotification