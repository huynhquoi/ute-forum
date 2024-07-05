import { useAcceptUserToGroupMutation, useLeaveGroupMutation, User, User_Group } from "@/generated/types"
import UserDisplay from "../users/user-display"
import { Button } from "../ui/button"
import { Check, XIcon } from "../svgs"
import { useState } from "react"

type ForumRequestItemProps = {
    user: User_Group,
    forumId: number
}

const ForumRequestItem = ({ forumId, user }: ForumRequestItemProps) => {
    const [action, setAction] = useState(false)
    const [Accept] = useAcceptUserToGroupMutation()
    const [Reject] = useLeaveGroupMutation()

    const handleAccept = () => {
        Accept({
            variables: {
                check: 1,
                groupid: forumId,
                userid: user?.user_usergroup?.userid
            }
        }).then(() => setAction(true))
    }

    const handleReject = () => {
        Reject({
            variables: {
                groupid: forumId,
                userid: user?.user_usergroup?.userid
            }
        }).then(() => setAction(true))
    }

    return <>
        <div className={`flex items-center justify-between ${action ? 'hidden' : ''}`}>
            <UserDisplay user={user?.user_usergroup as User} />
            <div className="space-x-2">
                <Button
                    variant={"outline"}
                    className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white p-2"
                    onClick={handleAccept}
                >
                    <Check className="text-2xl" />
                </Button>
                <Button
                    variant={"outline"}
                    className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white p-2"
                    onClick={handleReject}
                >
                    <XIcon className="text-2xl" />
                </Button>
            </div>
        </div>
    </>
}

export default ForumRequestItem