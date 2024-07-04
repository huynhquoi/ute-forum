import { useForm } from "react-hook-form"
import { Messenger } from "../svgs"
import { Button } from "../ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { User, useCreateContentMessageMutation, useCreateMessageMutation } from "@/generated/types"
import { useState } from "react"
import { useUserStorage } from "@/lib/store/userStorage"
import { Form, FormControl, FormField, FormItem } from "../ui/form"
import { Input } from "../ui/input"

type QuickMessageProps = {
    user: User
}

const FormSchema = z.object({
    content: z.string().min(1),
})

const QuickMessage = ({ user }: QuickMessageProps) => {
    const [image, setImage] = useState(null)
    const [open, setOpen] = useState(false);
    const userStorage = useUserStorage((state) => state.user);
    const [createMessage, { loading }] = useCreateContentMessageMutation()
    const [createNewChat, { data: newChat }] = useCreateMessageMutation()

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
            createNewChat({
                variables: {
                    userid1: userStorage?.userid,
                    userid2: user?.userid
                }
            }).then(() => {
                if (newChat?.create_message) {
                    createMessage({
                        variables: {
                            content: data.content,
                            messageid: newChat?.create_message?.messageid,
                            userid: userStorage?.userid,
                            image: image,
                            messageresponseid: 0,
                        }
                    }).then(() => {
                        setOpen(false);
                        form.resetField('content')
                    })
                }
            })
        }
    }
    return <>
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button><Messenger className="text-2xl mr-2" /><p>Nhắn tin</p></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Tin nhắn nhanh</DialogTitle>
                    <DialogDescription>Hãy gửi lời chào đầu tiên nào!</DialogDescription>
                </DialogHeader>
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
                        <DialogClose><Button className="ml-3" type="submit">Send</Button></DialogClose>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    </>
}

export default QuickMessage