import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Button } from "../ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { DetailGroupMessageDto, DetailMessageDto, useGetAccountQuery, useHideMessageMutation, useJoinGroupMessageMutation, User } from "@/generated/types"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog"
import { useMemo, useState } from "react"
import { Input } from "../ui/input"
import { Card } from "../ui/card"
import UserDisplay from "../users/user-display"
import { Check, Loading } from "../svgs"

type MessageGroupActionsProps = {
    detailMessage: DetailGroupMessageDto
}

const MessageGroupActions = ({ detailMessage }: MessageGroupActionsProps) => {
    const [open, setOpen] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [hideMessage] = useHideMessageMutation({
        variables: {
            isblock: 1,
            messageid: detailMessage?.groupmessage?.group_messageid,
            userid: detailMessage?.userid?.userid
        }
    })

    const [joinGroup] = useJoinGroupMessageMutation()

    const { data, loading, error } = useGetAccountQuery({
        variables: {
            limit: 100,
            pacing: 1
        }
    })

    const filteredUsers = useMemo(() => {
        if (!data?.account) return []
        return data.account.filter(user =>
            user?.fullname?.toLowerCase().includes(inputValue.toLowerCase())
        )
    }, [data?.account, inputValue])
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <DotsHorizontalIcon className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                        onClick={() => {
                            hideMessage()
                        }}
                    >
                        Xóa đoạn chat
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => {
                            setOpen(true)
                        }}
                    >
                        Thêm thành viên
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Thêm thành viên</AlertDialogTitle>
                    </AlertDialogHeader>
                    <div className="">
                        <Input
                            value={inputValue}
                            onChange={(e) => setInputValue(e?.target?.value)}
                            placeholder="Tìm kiếm thành viên..."
                        />
                    </div>
                    <Card className="p-3 space-y-3">
                        {loading ? <Loading className="text-2xl animate-spin" /> : <></>}
                        {filteredUsers.map((u, index) => {
                            if (index > 4) {
                                return <></>
                            }
                            return (
                                <div className="flex items-center justify-between" key={u?.userid}>
                                    <UserDisplay user={u as User} />

                                    <Button
                                        variant={"outline"}
                                        className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white p-2"
                                        onClick={() => { 
                                            joinGroup({
                                                variables: {
                                                    groupmessageid: detailMessage?.groupmessage?.group_messageid,
                                                    level: 1,
                                                    userid: u?.userid
                                                }
                                            })
                                        }}
                                    >
                                        <Check className="text-2xl" />
                                    </Button>
                                </div>
                            )
                        })}
                    </Card>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Hoàn tất</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export default MessageGroupActions