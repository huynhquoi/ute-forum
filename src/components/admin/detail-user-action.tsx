import { useGetAccountQuery, useUpdateReputationMutation } from "@/generated/types"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { useState } from "react"
import BanUserDialog from "./ban-user-dialog"
import { toast } from "../ui/use-toast"

type DetailUserActionProps = {
    userId: string
    isBan: number
}

const DetailUserAction = ({ userId, isBan }: DetailUserActionProps) => {
    const [reputation, setReputation] = useState('')
    const [handleUpdateReputation] = useUpdateReputationMutation()

    const {refetch} = useGetAccountQuery({
        variables: {
            limit: 100,
            pacing: 1
        }
    })
    return (
        <>
            <div className="w-full flex items-center justify-between">
                <BanUserDialog userId={userId}>
                    <Button
                        variant={"outline"}
                        className="border-red-500 text-red-500 bg-red-200"
                    >
                        Cấm
                    </Button>
                </BanUserDialog>

                <div className="flex items-center space-x-2">
                    <Input value={reputation} onChange={(e) => setReputation(e.target.value)} />
                    <Button
                        variant={"outline"}
                        className="border-blue-500 text-blue-500 bg-blue-200"
                        onClick={() => {
                            handleUpdateReputation({
                                variables: {
                                    reputation: parseInt(reputation),
                                    userid: userId
                                }
                            }).then(() => {
                                refetch()
                                setReputation('')
                            }).catch((err) => {
                                toast({
                                    title: 'Lỗi',
                                    description: err.message,
                                    variant: 'destructive'
                                })
                            })
                        }}
                    >
                        Cộng / Trừ
                    </Button>
                </div>
            </div>
        </>
    )
}

export default DetailUserAction