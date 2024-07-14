import { useGetGroupByUserIdQuery, useLeaveGroupMutation } from "@/generated/types"
import { useUserStorage } from "@/lib/store/userStorage"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import { Logout } from "../svgs"
import { toast } from "../ui/use-toast"

const ForumZone = () => {
    const { user: auth } = useUserStorage()
    const [LeaveForum] = useLeaveGroupMutation()
    const { data, loading, error, refetch } = useGetGroupByUserIdQuery({
        variables: {
            userid: auth?.userid
        }
    })

    const handleLeaveGroup = (id: number) => {
        if (!id) {
            return
        }
        LeaveForum({
            variables: {
                groupid: id,
                userid: auth?.userid
            }
        }).then(() => refetch()).catch((err) => {
            toast({
                title: 'Lỗi',
                description: err.message,
                variant: 'destructive'
            })
        })
    }
    return <>
        <div className="space-y-2">
            {data?.get_group_by_userid?.map((forum) => <div key={forum?.groupid} className="flex items-center justify-between p-4">
                <Link href={`/forum/${forum?.groupid}`} className={`flex items-center space-x-5`}>
                    <Avatar className="w-28 h-28">
                        <AvatarImage src={forum?.image || "/userLogo.png"} alt="CN"></AvatarImage>
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="text-left h-28">
                        <p className="font-bold text-xl">{forum?.groupname}</p>
                        <p>{forum?.description}</p>
                        <p>Reputation: {forum?.reputaion}</p>
                    </div>
                </Link>

                <div className="">
                    <Button
                        variant={"outline"}
                        className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white ml-2"
                        onClick={() => handleLeaveGroup(forum?.groupid as number)}
                        disabled={loading}
                    >
                        Rời nhóm
                        <Logout className="text-2xl ml-2" />
                    </Button>
                </div>
            </div>)}
        </div>
    </>
}

export default ForumZone