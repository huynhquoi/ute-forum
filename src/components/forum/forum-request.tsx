import { useGetUserGroupQuery, User_Group } from "@/generated/types"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import ForumRequestItem from "./forum-request-item"
import { Button } from "../ui/button"

type ForumRequestProps = {
    forumId: number
}

const ForumRequest = ({ forumId }: ForumRequestProps) => {
    const { data, loading, error } = useGetUserGroupQuery({
        variables: {
            groupid: forumId,
            limit: 20,
            pacing: 1
        }
    })
    return <>
        <Dialog>
            <DialogTrigger asChild>
                <Button>Yêu cầu vào nhóm</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Yêu cầu vào nhóm</DialogTitle>
                    <DialogDescription>Xem yêu cầu vào nhóm tại đây</DialogDescription>
                </DialogHeader>
                <div className="flex flex-col space-y-2 border rounded-md p-4">
                    {data?.get_user_in_group?.length
                        ? data?.get_user_in_group?.filter((i) => !i?.checked)?.map((user) => <ForumRequestItem forumId={forumId} key={user?.user_groupid} user={user as User_Group} />)
                        : <p className="text-center font-bold">Không có yêu cầu mới nào!</p>}
                </div>
            </DialogContent>
        </Dialog>
    </>
}

export default ForumRequest