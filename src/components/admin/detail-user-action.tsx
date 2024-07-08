import { useBanUserMutation, useUpdateReputationMutation } from "@/generated/types"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { useState } from "react"

type DetailUserActionProps = {
    userId: string
    isBan: number
}

const DetailUserAction = ({ userId, isBan }: DetailUserActionProps) => {
    const [reputation, setReputation] = useState('')
    const [handleBan] = useBanUserMutation()
    const [handleUpdateReputation] = useUpdateReputationMutation()
    return (
        <>
            <div className="w-full flex items-center justify-between">
                <Button
                    variant={"outline"}
                    className="border-red-500 text-red-500 bg-red-200"
                    onClick={() => {
                        handleBan({
                            variables: {
                                userid: userId,
                                isbanid: isBan ? 0 : 1
                            }
                        })
                    }}
                >
                    Cấm
                </Button>

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
                            }).then(() => setReputation(''))
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