"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Button } from "../ui/button"
import { continueConversation, MessageAI } from "@/app/actions"
import { readStreamableValue } from "ai/rsc"
import { Card } from "../ui/card"
import { Input } from "../ui/input"
import ChatAIItem from "./chat-ai-item"
import { ScrollArea } from "../ui/scroll-area"
import { useUserStorage } from "@/lib/store/userStorage"
import UserDisplay from "../users/user-display"
import { User } from "@/generated/types"

type ChatAIProps = {
    children: React.ReactNode
}

const ChatAI = ({ children }: ChatAIProps) => {
    const [open, setOpen] = useState(false)
    const {user} = useUserStorage()
    const [conversation, setConversation] = useState<MessageAI[]>([]);
    const [input, setInput] = useState<string>("");
    const [loading, setLoading] = useState(false)
    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    {children}
                </DialogTrigger>
                <DialogContent className="max-h-[70vh] sm:max-w-[900px]">
                    <DialogHeader>
                        <DialogTitle>Trò chuyện cùng AI</DialogTitle>
                    </DialogHeader>
                    <div>
                        {conversation?.length ? <ScrollArea className="border rounded-md pl-3 pb-2">
                            <div className="p-4 max-h-[50vh]">
                                {conversation.map((message, index) => (
                                    <div key={index}>
                                        {message.role == 'user' ? <UserDisplay user={user as User} /> : <UserDisplay ai={true} />} <ChatAIItem content={message.content} />
                                    </div>
                                ))}
                            </div>
                        </ScrollArea> : <></>}

                        <div className="flex items-center space-x-2 mt-4">
                            <Input
                                type="text"
                                value={input}
                                onChange={(event) => {
                                    setInput(event.target.value);
                                }}
                            />
                            <Button
                                onClick={async () => {
                                    const { messagesAI, newMessageAI } = await continueConversation([
                                        ...conversation,
                                        { role: "user", content: input },
                                    ]);

                                    let textContent = "";
                                    setInput('')

                                    for await (const delta of readStreamableValue(newMessageAI)) {
                                        textContent = `${textContent}${delta}`;

                                        setConversation([
                                            ...messagesAI,
                                            { role: "assistant", content: textContent },
                                        ]);
                                    }
                                }}
                                variant={'outline'} 
                                className="border-fuchsia-500 text-fuchsia-500 bg-fuchsia-50 hover:bg-white hover:text-fuchsia-500"
                            >
                                Send
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}
export default ChatAI