import { useCreateContentMessageMutation, useGetDetailMessageByMessageIdSubscription } from "@/generated/types"
import MessageDetailItem from "./message-detail-item";
import { Input } from "../ui/input";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
} from "@/components/ui/form"
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ScrollArea } from "../ui/scroll-area";

type MessageZoneProps = {
    messageId: number,
    userId: string;
}

const FormSchema = z.object({
    content: z.string().min(1),
})

const MessageZone = ({ messageId, userId }: MessageZoneProps) => {
    const [response, setResponse] = useState(0)
    const [image, setImage] = useState(null)
    const { data } = useGetDetailMessageByMessageIdSubscription({
        variables: {
            messageid: messageId,
            userid: userId
        }
    })

    const [createMessage, { loading }] = useCreateContentMessageMutation()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            content: "",
        },
    })

    const onSubmit = (data: z.infer<typeof FormSchema>) => {
        if (loading) {
            return
        }
        if (data.content) {
            createMessage({
                variables: {
                    content: data.content,
                    messageid: messageId,
                    userid: userId,
                    image: image,
                    messageresponseid: response,
                }
            }).then(() => {
                form.resetField('content')
            })
        }
    }

    const scrollRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if(scrollRef.current) {
            scrollRef.current.scrollIntoView(false)
        }
    }

    useEffect(() => {
        scrollToBottom()
    }, []);

    useEffect(() => {
        scrollToBottom()
    }, [data?.sub_content_message_by_messageid?.length]);

    return (
        <div className="flex flex-col justify-between h-full">
            {messageId ? (
                <>
                    <ScrollArea className="w-full h-[calc(100vh-112px)] pr-4">
                        <div ref={scrollRef} className=" flex flex-1 flex-col h-full">
                            {data?.sub_content_message_by_messageid?.sort((a, b) => (a?.contentid as number) - (b?.contentid as number))?.map(i => (
                                <MessageDetailItem key={i?.contentid} content={i?.content || ""} byMe={i?.userid as string === userId} />
                            ))}
                        </div>
                    </ScrollArea>
                    <div className="mb-8 mt-2">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex items-center justify-between">
                                <FormField
                                    control={form.control}
                                    name="content"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormControl>
                                                <Input placeholder="Message" {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <Button className="ml-3 mr-4" type="submit">Send</Button>
                            </form>
                        </Form>
                    </div>
                </>
            ) : null}
        </div>
    );
}

export default MessageZone;
