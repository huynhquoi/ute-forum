'use client'

import { useUserStorage } from "@/lib/store/userStorage";
import { Messenger, Plus } from "../svgs";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { DetailGroupMessageDto, DetailGroup_Message, DetailMessageDto, Group_Message, User, useGetGroupMessageByUserIdSubscription, useGetMessageByUserIdSubscription } from "@/generated/types";
import MessageItem from "../message/message-item";
import MessageZone from "../message/message-zone";
import { useEffect, useState } from "react";
import useStorage from "@/hooks/useStorage";
import { useMessageStore } from "@/lib/store/mesageStore";
import UserDisplay from "../users/user-display";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import MessageGroupItem from "../message/message-group-item";
import MessageGroupZone from "../message/message-group-zone";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import CreateMessageDialog from "../message/create-message-dialog";
import { Card } from "../ui/card";

type UserMessengerProps = {
    children?: React.ReactNode;
    onClick?: () => void
}

type TransformedData = {
    [parentId: number]: DetailGroupMessageDto[];
};

const UserMessenger = ({ children, onClick }: UserMessengerProps) => {
    const { setItem, getItem } = useStorage();
    const [tabValue, setTabValue] = useState('user')
    const userStorage = useUserStorage((state) => state.user);
    const [selectMessage, setSelectMessage] = useState<DetailMessageDto>(JSON.parse(getItem('selectMessage') || "{}") || undefined);
    const [selectGroupMessage, setSelectGroupMessage] = useState<DetailGroupMessageDto>(JSON.parse(getItem('selectGroupMessage') || "{}"))
    const [accordionValue, setAccordionValue] = useState(selectGroupMessage?.groupmessage?.parent?.toString() || selectGroupMessage?.groupmessage?.group_messageid?.toString())
    const { data, loading, error } = useGetMessageByUserIdSubscription({
        variables: {
            userid: userStorage?.userid
        }
    });

    const { data: groupMessage, loading: loadGroup } = useGetGroupMessageByUserIdSubscription({
        variables: {
            userid: userStorage?.userid
        }
    })

    const transformData = (data: DetailGroupMessageDto[]): TransformedData => {
        return data?.reduce((acc: TransformedData, item: DetailGroupMessageDto) => {
            const parentId = item?.groupmessage?.parent as null | number;
            if (parentId !== null) {
                if (!acc[parentId]) {
                    acc[parentId] = [];
                }
                acc[parentId].push(item);
            }
            return acc;
        }, {});
    };

    const listGroupChild = transformData(groupMessage?.sub_group_message_by_userid as DetailGroupMessageDto[])

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
                            {tabValue == 'user'
                                ? <UserDisplay user={selectMessage.userid as User} />
                                : <div className="flex items-center">
                                    <Avatar>
                                        <AvatarImage src={selectGroupMessage?.groupmessage?.group_messageimage || "/userLogo.png"} alt="CN"></AvatarImage>
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <div className="ml-2">
                                        <p className="font-bold">{selectGroupMessage?.groupmessage?.group_messagename}</p>
                                    </div>
                                </div>}
                        </div>
                    </div>
                </SheetHeader>
                <div className="grid grid-cols-5 h-[calc(100%-72px)]">
                    <div className="col-span-1 ">
                        <Tabs value={tabValue} className="w-full" onValueChange={setTabValue}>
                            <TabsList className="grid w-full grid-cols-2 border">
                                <TabsTrigger value="user">Cá nhân</TabsTrigger>
                                <TabsTrigger value="group">Nhóm</TabsTrigger>
                            </TabsList>
                            <TabsContent value="user" className="pl-4 bg-gray-100">
                                {data?.sub_detail_message_by_userid?.filter(m => !m?.isblock).map(i => (
                                    <MessageItem
                                        key={i?.detailmessageid}
                                        user={i?.userid as User}
                                        onCLick={() => {
                                            setSelectMessage(i as DetailMessageDto);
                                            setItem('selectMessage', JSON.stringify(i));
                                            setItem('partner', (i?.messageid || '').toString())
                                        }}
                                        selected={selectMessage?.detailmessageid === i?.detailmessageid}
                                        detail={i as DetailMessageDto}
                                    />
                                ))}
                            </TabsContent>
                            <TabsContent value="group">
                                <Accordion type="single" collapsible className="w-full" value={accordionValue} onValueChange={setAccordionValue}>
                                    {groupMessage?.sub_group_message_by_userid?.filter((m, index) => !m?.groupmessage?.parent)?.map((i, index) => (
                                        <AccordionItem value={i?.groupmessage?.group_messageid.toString() as string} key={i?.detailgroupmessageid}>
                                            <AccordionTrigger className="p-2 bg-gray-100">
                                                <div className="flex items-center space-x-2 text-left">
                                                    <Avatar>
                                                        <AvatarImage src={i?.groupmessage?.group_messageimage || ''} alt={i?.groupmessage?.group_messageimage || ''}></AvatarImage>
                                                        <AvatarFallback>N</AvatarFallback>
                                                    </Avatar>
                                                    <div className="ml-2">
                                                        <div className="ml-2">
                                                            <p className="font-bold">{i?.groupmessage?.group_messagename}</p>
                                                            <p className="text-sm">{i?.groupmessage?.group_messagedescription}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent className="p-0">
                                                <MessageGroupItem
                                                    key={i?.detailgroupmessageid}
                                                    detail={i as DetailGroupMessageDto}
                                                    onCLick={() => {
                                                        setSelectGroupMessage(i as DetailGroupMessageDto);
                                                        setItem('selectGroupMessage', JSON.stringify(i));
                                                    }}
                                                    selected={selectGroupMessage?.detailgroupmessageid == i?.detailgroupmessageid}
                                                />
                                                {listGroupChild[i?.groupmessage?.group_messageid as number]?.map((j, index) => (
                                                    <MessageGroupItem
                                                        key={j?.detailgroupmessageid}
                                                        detail={j as DetailGroupMessageDto}
                                                        onCLick={() => {
                                                            setSelectGroupMessage(j as DetailGroupMessageDto);
                                                            setItem('selectGroupMessage', JSON.stringify(j));
                                                        }}
                                                        selected={selectGroupMessage?.detailgroupmessageid == j?.detailgroupmessageid}
                                                    />
                                                ))}
                                                <CreateMessageDialog messageId={parseInt(accordionValue as string)}>
                                                    <div className="flex justify-center items-center p-3 cursor-pointer bg-gray-100 hover:bg-white">
                                                        <Plus className="text-xl" />
                                                    </div>
                                                </CreateMessageDialog>
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </TabsContent>
                        </Tabs>
                    </div>
                    <div className="col-span-4 pl-4">
                        {tabValue == 'user'
                            ? <MessageZone messageId={selectMessage?.messageid as number} userId={userStorage?.userid || ""} />
                            : <MessageGroupZone messageId={selectGroupMessage?.groupmessage?.group_messageid as number} userId={userStorage?.userid || ""} />}
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}

export default UserMessenger;
