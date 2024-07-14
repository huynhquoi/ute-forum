import React from "react"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { User, User_Group } from "@/generated/types"
import UserDisplay from "../users/user-display"

type GroupUserDialogProps = {
    users: User_Group[]
    children: React.ReactNode
}

const GroupUserDialog = ({ users, children }: GroupUserDialogProps) => {
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    {children}
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Danh sách thành viên</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-2 p-3 border rounded-md">
                        {users?.map(u => (
                            <div key={u?.user_groupid} className="flex items-center justify-between">
                                <UserDisplay user={u?.user_usergroup as User} />
                                <div className={`border rounded-full text-sm px-3 ${u?.checked ? 'border-green-500 bg-green-200 text-green-500' : 'border-red-500 bg-red-200 text-red-500'}`}>
                                    {u?.checked ? 'Đã được duyệt' : 'Chưa được duyệt'}
                                </div>
                            </div>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default GroupUserDialog