
import { z } from "zod"
import { Button } from "../ui/button"
import { Dialog, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogContent, DialogClose } from "../ui/dialog"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Group, useCreateGroupMutation, useUpdateGroupMutation } from "@/generated/types"
import { useUserStorage } from "@/lib/store/userStorage"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import AvatarUpload from "../profile/avatar-upload"
import Image from "next/image"

const ForumFormSchema = z.object({
    groupname: z.string(),
    image: z.string(),
    description: z.string(),
})

type ForumFormType = {
    groupname: string,
    image: string,
    description: string,
}

type ForumFormProps = {
    forum?: Group;
}

const ForumForm = ({ forum }: ForumFormProps) => {
    const authStorage = useUserStorage(state => state.user)
    const [open, setOpen] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState(forum?.image || "");
    const [loading, setLoading] = useState(false);
    const [createForum] = useCreateGroupMutation()
    const [updateForum] = useUpdateGroupMutation()
    const [forumInfo, setForumInfo] = useState<ForumFormType>({
        groupname: forum?.groupname || "",
        image: forum?.image || "",
        description: forum?.description || ""
    })
    const form = useForm<z.infer<typeof ForumFormSchema>>({
        resolver: zodResolver(ForumFormSchema),
        defaultValues: {
            groupname: forum?.groupname || "",
            image: forum?.image || "",
            description: forum?.description || ""
        }
    });

    useEffect(() => {
        if (!loading) {
            return
        }
        if (forum?.groupid) {
            updateForum({
                variables: {
                    group: {
                        groupid: forum.groupid,
                        ...forumInfo
                    }
                }
            }).then(() => {
                setLoading(false)
                setOpen(false);
            })
        } else {
            createForum({
                variables: {
                    admin: authStorage?.userid,
                    group: forumInfo
                }
            }).then(() => setLoading(false))
        }
    }, [authStorage?.userid, createForum, forum?.groupid, forumInfo, loading, updateForum])
    const handleAvatarUpload = (url: string) => {
        setAvatarUrl(url);
        form.setValue("image", url);
    };

    const onSubmit = (values: z.infer<typeof ForumFormSchema>) => {
        setForumInfo(values);
        setLoading(true)
    }

    return <>
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>{forum?.groupid ? 'Chỉnh sửa nhóm' : 'Tạo nhóm'}</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{forum?.groupid ? 'Chỉnh sửa nhóm' : 'Tạo nhóm'}</DialogTitle>
                    <DialogDescription>
                        {forum?.groupid ? <>Thay đổi thông tin tại đây. Nhấn <span className="font-bold">Lưu</span> để lưu thay đổi.</> : <>Nhập thông tin tại đây. Nhấn <span className="font-bold">Lưu</span> để tạo nhóm.</>}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="image"
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
                            name="groupname"
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
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-bold">Mô tả nhóm</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Mô tả" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="submit">Lưu</Button>
                            </DialogClose>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    </>
}

export default ForumForm