import { useCreateFollowMutation, useGetFollowerUserQuery } from "@/generated/types"
import { useUserStorage } from "@/lib/store/userStorage"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import { useState } from "react"
import Link from "next/link"
import { toast } from "../ui/use-toast"

const FollowerZone = () => {
    const { user } = useUserStorage()
    const [Follow] = useCreateFollowMutation()
    const { data, loading, error, refetch } = useGetFollowerUserQuery({
        variables: {
            userid: user?.userid
        }
    })

    const handleUnfollow = (id: string) => {
        if (!id) {
            return
        }
        Follow({
            variables: {
                followerid: user?.userid,
                userid: id
            }
        }).then(() => refetch())
        .catch((err) => {
            toast({
                title: 'Lỗi',
                description: err.message,
                variant: 'destructive'
            })
        })
    }
    return <>
        <div className="space-y-2">
            {data?.get_all_follower_by_user?.map((user) => <div key={user?.userid} className="flex items-center justify-between p-4">
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
                        className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white ml-2"
                        onClick={() => handleUnfollow(user?.userid as string)}
                        disabled={loading}
                    >
                        Theo dõi
                    </Button>
                </div>
            </div>)}
        </div>
    </>
}

export default FollowerZone