"use client"

import { DetailGroupMessageDto, DetailMessageDto, User } from "@/generated/types"
import { Card } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import MessageActions from "./message-actions";

type MessageGroupItemProps = {
    newMessage?: string;
    read?: boolean;
    selected: boolean;
    onCLick?: () => void;
    detail: DetailGroupMessageDto
}

const MessageGroupItem = ({ newMessage, read, selected, detail, onCLick }: MessageGroupItemProps) => {
    return <>
        {selected ? <div className="h-4 bg-white">
            <div className={`h-4 ${selected ? 'rounded-br-xl' : ''} bg-gray-100`}></div>
        </div> : <></>}
        <Card className={`flex items-center justify-between p-2 pl-12 border-none shadow-none rounded-none rounded-tl-xl rounded-bl-xl cursor-pointer ${selected ? '' : 'hover:bg-white bg-gray-100'}`} onClick={() => {
            if (typeof onCLick !== 'undefined') {
                onCLick()
            }
        }}>
            <div className="flex items-center space-x-2">
                <Avatar>
                    <AvatarImage src={detail?.groupmessage?.group_messageimage || ''} alt={detail?.groupmessage?.group_messageimage || ''}></AvatarImage>
                    <AvatarFallback>N</AvatarFallback>
                </Avatar>
                <div className="ml-2">
                    <div className="ml-2">
                        <p className="font-bold">{detail?.groupmessage?.group_messagename}</p>
                        <p className="text-sm">{detail?.groupmessage?.group_messagedescription}</p>
                    </div>
                </div>
            </div>
        </Card>
        {selected ? <div className="h-4 bg-white">
            <div className="h-4 rounded-tr-xl bg-gray-100"></div>
        </div> : <></>}
    </>
}

export default MessageGroupItem