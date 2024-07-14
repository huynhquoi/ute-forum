
import { z } from "zod"
import { Button } from "../ui/button"
import { Dialog, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogContent, DialogClose } from "../ui/dialog"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Group, useCreateGroupMessageMutation, useCreateGroupMutation, useUpdateGroupMutation } from "@/generated/types"
import { useUserStorage } from "@/lib/store/userStorage"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import AvatarUpload from "../profile/avatar-upload"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { toast } from "../ui/use-toast"

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
    const route = useRouter()
    const [open, setOpen] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState(forum?.image || "");
    const [loading, setLoading] = useState(false);
    const [createForum, { data, loading: loadCreate }] = useCreateGroupMutation()
    const [updateForum] = useUpdateGroupMutation()
    const [createMessage] = useCreateGroupMessageMutation()
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
            setLoading(false)
            updateForum({
                variables: {
                    group: {
                        groupid: forum.groupid,
                        ...forumInfo
                    }
                }
            }).then(() => {
                setOpen(false);
            }).catch((err) => {
                toast({
                    title: 'Lỗi',
                    description: err.message,
                    variant: 'destructive'
                })
            })
        } else {
            setLoading(false)
            createForum({
                variables: {
                    admin: authStorage?.userid,
                    group: forumInfo
                }
            }).then((data) => {
                if (data?.data?.create_group) {
                    createMessage({
                        variables: {
                            group_message: {
                                group_messagename: data?.data?.create_group?.groupname,
                                group_messageimage: data?.data?.create_group?.image,
                                group_messagedescription: data?.data?.create_group?.description
                            },
                            userid: data?.data?.create_group?.admin
                        }
                    }).then(() => {
                        route.push(`/forum/${data?.data?.create_group?.groupid}`)
                    }).catch((err) => {
                        toast({
                            title: 'Lỗi',
                            description: err.message,
                            variant: 'destructive'
                        })
                    })
                }
            })
        }
    }, [authStorage?.userid, createForum, createMessage, data?.create_group?.description, data?.create_group?.groupid, data?.create_group?.groupname, data?.create_group?.image, forum?.groupid, forumInfo, loadCreate, loading, route, updateForum])
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