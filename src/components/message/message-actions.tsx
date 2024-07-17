import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Button } from "../ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { DetailMessageDto, useHideMessageMutation } from "@/generated/types"

type MessageActionsProps = {
    detailMessage: DetailMessageDto
}

const MessageActions = ({ detailMessage }: MessageActionsProps) => {
    const [hideMessage] = useHideMessageMutation({
        variables: {
            isblock: 1,
            messageid: detailMessage?.messageid,
            userid: detailMessage?.userid?.userid
        }
    })
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
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

export default MessageActions