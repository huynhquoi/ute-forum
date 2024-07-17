"use client"

import { DetailMessageDto, User } from "@/generated/types"
import { Card } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import MessageActions from "./message-actions";

type MessageItemProps = {
    user: User
    newMessage?: string;
    read?: boolean;
    selected: boolean;
    onCLick?: () => void;
    detail: DetailMessageDto
}

const MessageItem = ({ user, newMessage, read, selected, detail, onCLick }: MessageItemProps) => {
    return <>
        {selected ? <div className="h-4 bg-white">
            <div className={`h-4 ${selected ? 'rounded-br-xl' : ''} bg-gray-100`}></div>
        </div> : <></>}
        <Card className={`flex items-center justify-between p-2 border-none shadow-none rounded-none rounded-tl-xl rounded-bl-xl cursor-pointer ${selected ? '' : 'hover:bg-white bg-gray-100'}`} onClick={() => {
            if (typeof onCLick !== 'undefined') {
                onCLick()
            }
        }}>
            <div className="flex items-center space-x-2">
                <Avatar>
                    <AvatarImage src={user?.image || "/userLogo.png"} alt="CN"></AvatarImage>
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="ml-2">
                    <p className="font-bold">{user?.fullname}</p>
                    <p className="text-sm">{newMessage || ""}</p>
                </div>
            </div>
            <MessageActions detailMessage={detail} />
        </Card>
        {selected ? <div className="h-4 bg-white">
            <div className="h-4 rounded-tr-xl bg-gray-100"></div>
        </div> : <></>}
    </>
}

export default MessageItem