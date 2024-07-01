"use client"

import { User } from "@/generated/types"
import { Card } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type MessageItemProps = {
    user: User
    newMessage?: string;
    read?: boolean;
    onCLick?: () => void;
}

const MessageItem = ({ user, newMessage, read, onCLick }: MessageItemProps) => {
    return <>
        <Card className="flex items-center p-2 border-none shadow-none hover:bg-gray-100" onClick={() => {
            if (typeof onCLick !== 'undefined') {
                onCLick()
            }
        }}>
            <Avatar>
                <AvatarImage src={"/userLogo.png"} alt="CN"></AvatarImage>
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="ml-2">
                <p className="font-bold">{user?.fullname}</p>
                <p className="text-sm">{newMessage || ""}</p>
            </div>
        </Card>
    </>
}

export default MessageItem