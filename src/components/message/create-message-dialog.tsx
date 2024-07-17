import { z } from "zod"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import AvatarUpload from "../profile/avatar-upload"
import { useState } from "react"
import Image from "next/image"
import { Button } from "../ui/button"
import useStorage from "@/hooks/useStorage"
import { useCreateGroupMessageMutation } from "@/generated/types"
import { toast } from "../ui/use-toast"

type CreateMessageDialogProps = {
    messageId: number
    children: React.ReactNode
}

const formSchema = z.object({
    group_messagename: z.string(),
    group_messageimage: z.string(),
    group_messagedescription: z.string(),
    parent: z.number()
})

const CreateMessageDialog = ({ messageId, children }: CreateMessageDialogProps) => {
    const {getItem} = useStorage()
    const [avatarUrl, setAvatarUrl] = useState("");
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            group_messagedescription: '',
            group_messageimage: '',
            group_messagename: '',
            parent: messageId
        }
    })

    const [createNewMessage] = useCreateGroupMessageMutation()

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        createNewMessage({
            variables: {
                group_message: values,
                userid: getItem('userId')
            }
        }).then(() => {
            form.reset()
        }).catch((err) => {
            toast({
                title: 'Lỗi',
                description: err,
                variant: 'destructive'
            })
        })
    }

    const handleAvatarUpload = (url: string) => {
        setAvatarUrl(url);
        form.setValue("group_messageimage", url);
    };
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>{children}</DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Tạo thêm kênh mới</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                            <FormField
                                control={form.control}
                                name="group_messageimage"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-bold">Ảnh đại diện</FormLabel>
                                        <FormControl>
                                            <AvatarUpload onUploadComplete={handleAvatarUpload} />
                                        </FormControl>
                                        <div className="flex items-center justify-center mt-4">
                                            {avatarUrl && <Image src={avatarUrl} alt="Avatar" className="w-40 h-40 rounded-full" width={200} height={200} />}
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="group_messagename"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-bold">Tên nhóm</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Nhóm" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="group_messagedescription"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-bold">Chi tiết</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Mô tả " {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button type="submit">Tạo mới</Button>
                                </DialogClose>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default CreateMessageDialog