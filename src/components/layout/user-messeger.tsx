import { useUserStorage } from "@/lib/store/userStorage"
import { Messenger } from "../svgs"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet"
import { DetailMessage, User, useGetMessageByUserIdSubscription } from "@/generated/types"
import MessageItem from "../message/message-item"
import MessageZone from "../message/message-zone"
import { useState } from "react"

const UserMessenger = () => {
    const userStorage = useUserStorage((state) => state.user)
    const [selectMessage, setSelectMessage] = useState<DetailMessage>()
    const { data, loading, error } = useGetMessageByUserIdSubscription({
        variables: {
            userid: userStorage?.userid
        }
    })
    return <>
        <Sheet>
            <SheetTrigger asChild><Messenger className="text-2xl" /></SheetTrigger>
            <SheetContent className="w-[90%] sm:max-w-none">
                <SheetHeader>
                    <SheetTitle>Tin nhắn</SheetTitle>
                </SheetHeader>
                <div className="grid grid-cols-5 h-full">
                    <div className="col-span-1">
                        {data?.sub_detail_message_by_userid?.map(i => <MessageItem key={i?.detailmessageid} user={i?.user_detailmessage as User} onCLick={() => {
                            setSelectMessage(i as DetailMessage)
                        }} />)}
                    </div>
                    <div className="col-span-4 pl-4">
                        <MessageZone messageId={selectMessage?.detailmessage_message?.messageid as number} userId={userStorage?.userid || ""}  />
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    </>
}

export default UserMessenger