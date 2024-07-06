'use client'

import { useUserStorage } from "@/lib/store/userStorage";
import { Messenger } from "../svgs";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { DetailMessageDto, User, useGetMessageByUserIdSubscription } from "@/generated/types";
import MessageItem from "../message/message-item";
import MessageZone from "../message/message-zone";
import { useEffect, useState } from "react";
import useStorage from "@/hooks/useStorage";
import { useMessageStore } from "@/lib/store/mesageStore";
import UserDisplay from "../users/user-display";

type UserMessengerProps = {
    children?: React.ReactNode;
    onClick?: () => void
}

const UserMessenger = ({ children, onClick }: UserMessengerProps) => {
    const { setItem, getItem } = useStorage();
    const userStorage = useUserStorage((state) => state.user);
    const { message, anotherUser, removeMessage } = useMessageStore()
    const [selectMessage, setSelectMessage] = useState<DetailMessageDto>(message?.messageid ? undefined : JSON.parse(getItem('selectMessage') || "{}") || undefined);
    const { data, loading, error } = useGetMessageByUserIdSubscription({
        variables: {
            userid: userStorage?.userid
        }
    });

    useEffect(() => {
        if (!message?.messageid) {
            return
        }
    }, [message])

    return (
        <Sheet>
            <SheetTrigger asChild className="cursor-pointer" onClick={() => {
                if (typeof onClick !== 'undefined') {
                    onClick()
                }
            }}>
                <div className="flex items-center">
                    <Messenger className="text-2xl mr-2" />
                    {children}
                </div>
            </SheetTrigger>
            <SheetContent className="w-[90%] sm:max-w-none p-0">
                <SheetHeader className="p-4">
                    <div className="grid grid-cols-5">
                        <div className="col-span-1">
                            <SheetTitle>Tin nhắn</SheetTitle>
                        </div>
                        <div className="col-span-4 pl-2">
                            <UserDisplay user={selectMessage.userid as User} />
                        </div>
                    </div>
                </SheetHeader>
                <div className="grid grid-cols-5 h-[calc(100%-72px)]">
                    <div className="col-span-1 bg-gray-100 pl-4">
                        {message?.messageid ? <MessageItem selected={true} user={anotherUser as User} /> : <></>}
                        {data?.sub_detail_message_by_userid?.map(i => (
                            <MessageItem
                                key={i?.detailmessageid}
                                user={i?.userid as User}
                                onCLick={() => {
                                    setSelectMessage(i as DetailMessageDto);
                                    setItem('selectMessage', JSON.stringify(i));
                                }}
                                selected={selectMessage?.detailmessageid === i?.detailmessageid}
                            />
                        ))}
                    </div>
                    <div className="col-span-4 pl-4">
                        {message?.messageid
                            ? <MessageZone messageId={message.messageid as number} userId={userStorage?.userid || ""} />
                            : <MessageZone messageId={selectMessage?.messageid as number} userId={userStorage?.userid || ""} />}
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}

export default UserMessenger;
