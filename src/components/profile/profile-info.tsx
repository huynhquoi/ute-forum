import { User, useCreateFollowMutation, useDeleteFollowMutation, useGetFollowingUserQuery } from "@/generated/types"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"
import { Label } from "../ui/label"
import { AboutMe, Address, Connect, Email, Gift, Route } from "../svgs"
import { format } from "date-fns"
import { Button } from "../ui/button"
import { useUserStorage } from "@/lib/store/userStorage"
import { useEffect, useState } from "react"

type ProfileInfoProps = {
  user: User
}

const ProfileInfo = ({ user }: ProfileInfoProps) => {
  const [follow, setFollow] = useState(false);
  const userStorage = useUserStorage(state => state.user)
  const [CreateFollow] = useCreateFollowMutation()
  const [DeleteFollow] = useDeleteFollowMutation()

  const { data: followingU, refetch } = useGetFollowingUserQuery({
    variables: {
      followerid: userStorage?.userid
    }
  })

  useEffect(() => {
    if (!followingU?.get_all_user_by_follower?.length) {
      setFollow(false)
      return
    }

    if (followingU?.get_all_user_by_follower?.find(i => i?.userid === user?.userid)) {
      setFollow(true)
    } else {
      setFollow(false)
    }
  }, [followingU?.get_all_user_by_follower, user?.userid])

  const handleActionFollow = (type: 'follow' | 'unfollow') => {
    if (type === 'follow') {
      CreateFollow({
        variables: {
          followerid: userStorage?.userid,
          userid: user?.userid,
        }
      }).then(() => refetch())
    } else if (type === 'unfollow') {
      DeleteFollow({
        variables: {
          followerid: userStorage?.userid,
          userid: user?.userid,
        }
      }).then(() => refetch())
    }
  }
  return <>
    <Card className="mt-4 mr-4 rounded-md shadow-none">
      <CardHeader className="pb-4">
        <span className="font-bold text-xl">Thông tin cá nhân </span>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className=" flex items-end justify-start space-x-3">
          <AboutMe className="text-2xl mb-1" />
          <div className="align-bottom"><span className="font-bold">{user?.bio}</span></div>
        </div>
        <div className=" flex items-end justify-start space-x-3">
          <Email className="text-2xl mb-1" />
          <div className="align-bottom"><span className="font-bold">{user?.email}</span></div>
        </div>
        <div className=" flex items-end justify-start space-x-3">
          <Address className="text-2xl mb-1" />
          <div className="align-bottom">Đến từ <span className="font-bold">{user?.address}</span></div>
        </div>
        <div className=" flex items-end justify-start space-x-3">
          <Gift className="text-2xl mb-1" />
          <div className="align-bottom">Sinh nhật vào <span className="font-bold">{format(user?.birthday || new Date(), "dd/MM/yyyy")}</span></div>
        </div>
        <div className=" flex items-end justify-start space-x-3">
          <Route className="text-2xl mb-1" />
          <div className="align-bottom">Tham gia từ <span className="font-bold">{format(user?.createday || new Date(), "dd/MM/yyyy")}</span></div>
        </div>
        <div className=" flex items-end justify-start space-x-3">
          <Connect className="text-2xl" />
          <div className="align-bottom">Đang có <span className="font-bold">{user?.totalfollowing || 0}</span> người theo dõi</div>
        </div>
      </CardContent>
      <CardFooter>
        {user?.userid === userStorage?.userid
          ? <></>
          : follow
            ? <Button
              variant={"outline"}
              className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white w-full"
              onClick={() => handleActionFollow('unfollow')}
            >
              Bỏ theo dõi
            </Button>
            : <Button
              variant={"outline"}
              className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white w-full"
              onClick={() => handleActionFollow('follow')}
            >
              Theo dõi
            </Button>}
      </CardFooter>
    </Card>
  </>
}

export default ProfileInfo