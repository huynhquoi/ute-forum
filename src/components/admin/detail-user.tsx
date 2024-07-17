import { User } from "@/generated/types"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import UserDisplay from "../users/user-display"
import { AboutMe, Address, Connect, Email, Gift, Loading, Route } from "../svgs"
import { format } from "date-fns"
import DetailUserAction from "./detail-user-action"

type DetailUserProps = {
    user: User,
    loading: boolean
}

const DetailUser = ({ user, loading }: DetailUserProps) => {
    return (
        <>
            {loading ? <Loading className="text-2xl animate-spin" /> : <></>}
            {user?.userid
                ? <Card className="w-full">
                    <CardHeader>
                        <UserDisplay user={user as User} />
                    </CardHeader>

                    <CardContent>
                        <Card className="border shadow-none rounded-md">
                            <CardContent className="pt-4 space-y-3">
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
                        </Card>
                    </CardContent>

                    <CardFooter>
                        <DetailUserAction userId={user?.userid as string} isBan={user?.isban?.isbanid ? 1 : 0} />
                    </CardFooter>
                </Card>
                : <Card>
                    <CardHeader>
                        <CardTitle>Thông tin người dùng</CardTitle>
                    </CardHeader>
                </Card>}
        </>
    )
}

export default DetailUser