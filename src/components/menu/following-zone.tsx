import { useDeleteFollowMutation, useGetFollowingUserQuery } from "@/generated/types"
import { useUserStorage } from "@/lib/store/userStorage"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import { useState } from "react"
import Link from "next/link"

const FollowingZone = () => {
    const { user } = useUserStorage()
    const [Unfollow] = useDeleteFollowMutation()
    const { data, loading, error, refetch } = useGetFollowingUserQuery({
        variables: {
            followerid: user?.userid
        }
    })

    const handleUnfollow = (id: string) => {
        if (!id) {
            return
        }
        Unfollow({
            variables: {
                followerid: user?.userid,
                userid: id
            }
        }).then(() => refetch())
    }
    return <>
        <div className="space-y-2">
            {data?.get_all_user_by_follower?.map((user) => <div key={user?.userid} className="flex items-center justify-between p-4">
                <Link href={`/profile/${user?.userid}`} className={`flex items-center space-x-5`}>
                    <Avatar className="w-28 h-28">
                        <AvatarImage src={user?.image || "/userLogo.png"} alt="CN"></AvatarImage>
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="text-left h-28">
                        <p className="font-bold text-xl">{user?.fullname}</p>
                        <p>{user?.email}</p>
                        <p>Reputation: {user?.reputation}</p>
                        <p>{user?.bio}</p>
                    </div>
                </Link>
                <div className="">
                    <Button
                        variant={"outline"}
                        className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white ml-2"
                        onClick={() => handleUnfollow(user?.userid as string)}
                        disabled={loading}
                    >
                        Bỏ theo dõi
                    </Button>
                </div>
            </div>)}
        </div>
    </>
}

export default FollowingZone