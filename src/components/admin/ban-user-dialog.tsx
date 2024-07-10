import React, { useState } from "react"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { useBanUserMutation, useGetAccountQuery } from "@/generated/types"
import { Button } from "../ui/button"

type BanUserDialogProps = {
    userId: string,
    children: React.ReactNode
}

const BanUserDialog = ({ userId, children }: BanUserDialogProps) => {
    const [ban, setBan] = useState('')
    const [open, setOpen] = useState(false)
    const [BanUser] = useBanUserMutation()
    const {refetch} = useGetAccountQuery({
        variables: {
            limit: 100,
            pacing: 1
        }
    })

    const handleBan = (ban: number) => {
        BanUser({
            variables: {
                isbanid: ban,
                userid: userId
            }
        }).then(() => {
            refetch()
            setOpen(false)
        })
    }

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    {children}
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Cấm người dùng</DialogTitle>
                    </DialogHeader>
                    <Select onValueChange={(e) => setBan(e)}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Chi tiết lệnh cấm" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="0">Trạng thái bình thường</SelectItem>
                            <SelectItem value="1">Cấm chat 3 ngày</SelectItem>
                            <SelectItem value="2">Cấm chat 5 ngày</SelectItem>
                            <SelectItem value="3">Cấm tài khoản 3 ngày</SelectItem>
                            <SelectItem value="4">Cấm tài khoản 5 ngày</SelectItem>
                            <SelectItem value="5">Cấm tài khoản 10 ngày</SelectItem>
                            <SelectItem value="6">Cấm vĩnh viễn</SelectItem>
                        </SelectContent>
                    </Select>
                    <DialogFooter>
                        <Button
                            variant={"outline"}
                            className="border-red-500 text-red-500 bg-red-200 hover:bg-red-500 hover:text-white"
                            onClick={() => {
                                if (ban === '') {
                                    return
                                }

                                handleBan(parseInt(ban))
                            }}
                        >
                            Xác nhận
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default BanUserDialog