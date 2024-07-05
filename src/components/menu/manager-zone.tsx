import { useGetGroupByAdminQuery } from "@/generated/types"
import { useUserStorage } from "@/lib/store/userStorage"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

const MaganerZone = () => {
    const { user: auth } = useUserStorage()
    const { data, loading, error } = useGetGroupByAdminQuery({
        variables: {
            admin: auth?.userid
        }
    })
    return <>
        <div className="space-y-2">
            {data?.get_group_by_admin?.map((forum) => <div key={forum?.groupid} className="flex items-center justify-between p-4">
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
            </div>)}
        </div>
    </>
}

export default MaganerZone