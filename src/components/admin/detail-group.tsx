import { Group, useGetUserGroupQuery, User, User_Group } from "@/generated/types"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import UserDisplay from "../users/user-display"
import { AboutMe, Address, ArrowTo, Connect, Email, Eye, Gift, Route } from "../svgs"
import { format } from "date-fns"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import GroupUserDialog from "./group-user-dialog"

type DetailGroupProps = {
    group: Group
    inGroup?: boolean
}

const DetailGroup = ({ group, inGroup }: DetailGroupProps) => {
    const { data } = useGetUserGroupQuery({
        variables: {
            groupid: group?.groupid,
            limit: 100,
            pacing: 1
        }
    })
    return (
        <>
            {group?.groupid
                ? <Card className="w-full">
                    <CardHeader>
                        <Link href={`/forum/${group?.groupid}`} className="flex items-center">
                            <Avatar>
                                <AvatarImage src={group?.image || "/userLogo.png"} alt="CN"></AvatarImage>
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className="ml-2">
                                <p className="font-bold flex items-center space-x-1">
                                    <span>{group?.groupname}</span>
                                </p>
                            </div>
                        </Link>
                    </CardHeader>

                    <CardContent>
                        <Card className="border shadow-none rounded-md">
                            <CardContent className="pt-4 space-y-2">
                                <div className=" flex items-center justify-start space-x-3">
                                    <p className="font-bold">Trưởng nhóm: </p>
                                    <UserDisplay user={group?.user_group as User} />
                                </div>
                                <div className=" flex items-center justify-start space-x-3">
                                    <p className="font-bold">Bio: </p>
                                    <div className="align-bottom">{group?.description}</div>
                                </div>
                                <div className=" flex items-center justify-start space-x-3">
                                    <p className="font-bold">Thành lập ngày: </p>
                                    <div className="align-bottom">{format(group?.createday || new Date(), "dd/MM/yyyy")}</div>
                                </div>
                                <div className=" flex items-center justify-start space-x-3">
                                    <p className="font-bold">Số lượng thành viên: </p>
                                    <div className="align-bottom">{data?.get_user_in_group?.length}</div>
                                    <GroupUserDialog users={data?.get_user_in_group as User_Group[]}>
                                        <Eye className="text-xl" />
                                    </GroupUserDialog>
                                </div>
                            </CardContent>
                        </Card>
                    </CardContent>
                </Card>
                : <Card>
                    <CardHeader>
                        <CardTitle>Thông tin forum</CardTitle>
                    </CardHeader>
                </Card>}
        </>
    )
}

export default DetailGroup