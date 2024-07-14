import { useCreateContentMessageMutation, useGetDetailMessageByMessageIdSubscription } from "@/generated/types"
import MessageDetailItem from "./message-detail-item";
import { Input } from "../ui/input";
import { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ScrollArea } from "../ui/scroll-area";
import { useMessageStore } from "@/lib/store/mesageStore";
import useStorage from "@/hooks/useStorage";
import { toast } from "../ui/use-toast";

type MessageZoneProps = {
    messageId: number,
    userId: string;
}

const FormSchema = z.object({
    content: z.string().min(1),
})

const MessageZone = ({ messageId, userId }: MessageZoneProps) => {
    console.log(messageId)
    const { message, removeMessage } = useMessageStore()
    const {getItem} = useStorage()
    const { data, loading: loadMess, error } = useGetDetailMessageByMessageIdSubscription({
        variables: {
            messageid: parseInt(getItem('partner')),
            userid: userId
        },
        shouldResubscribe: true
    })

    const [createMessage, { loading }] = useCreateContentMessageMutation()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            content: "",
        },
    })

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        if (loading || !data.content) return;

        try {
            await createMessage({
                variables: {
                    content: data.content,
                    messageid: messageId,
                    userid: userId,
                    messageresponseid: 0,
                    image: ''
                }
            }).catch((err) => {
                toast({
                    title: 'Lỗi',
                    description: err.message,
                    variant: 'destructive'
                })
            });
            form.resetField('content');
            if (message?.messageid) {
                removeMessage();
            }
        } catch (error) {
            console.error("Error creating message:", error);
        }
    }

    const scrollRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }

    useEffect(() => {
        scrollToBottom();
    }, [data?.sub_content_message_by_messageid?.length]);

    // Log error from subscription
    useEffect(() => {
        if (error) {
            console.error("Subscription error:", error);
        }
    }, [error]);

    if (!messageId) return null;

    return (
        <div className="flex flex-col justify-between h-[calc(100vh-72px)]">
            <ScrollArea className="w-full h-[calc(100vh-112px)] pr-4">
                <div ref={scrollRef} className="flex flex-1 flex-col h-full">
                    {data?.sub_content_message_by_messageid
                        ?.sort((a, b) => (a?.contentid as number) - (b?.contentid as number))
                        ?.map(i => (
                            <MessageDetailItem 
                                key={i?.contentid} 
                                content={i?.content || ""} 
                                byMe={i?.userid as string === userId} 
                            />
                        ))
                    }
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
                        <Button className="ml-3 mr-4" type="submit" disabled={loading}>Send</Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}

export default MessageZone;