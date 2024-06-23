
import { z } from "zod"
import { Button } from "../ui/button"
import { Dialog, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogContent, DialogClose } from "../ui/dialog"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCreateGroupMutation } from "@/generated/types"
import { useUserStorage } from "@/lib/store/userStorage"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"

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

const ForumForm = () => {
    const authStorage = useUserStorage(state => state.user)
    const [loading, setLoading] = useState(false);
    const [createForum] = useCreateGroupMutation()
    const [forumInfo, setForumInfo] = useState<ForumFormType>({
        groupname: "",
        image: "",
        description: ""
    })
    const form = useForm<z.infer<typeof ForumFormSchema>>({
        resolver: zodResolver(ForumFormSchema),
        defaultValues: {
            groupname: "",
            image: "",
            description: ""
        }
    });

    useEffect(() => {
        if (!loading) {
            return
        }
        createForum({
            variables: {
                admin: authStorage?.userid,
                group: forumInfo
            }
        }).then(() => setLoading(false))
    }, [authStorage?.userid, createForum, forumInfo, loading])

    const onSubmit = (values: z.infer<typeof ForumFormSchema>) => {
        setForumInfo(values);
        setLoading(true)

        console.log(values)
    }

    return <>
        <Dialog>
            <DialogTrigger asChild>
                <Button>Tạo nhóm</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Chỉnh sửa trang cá nhân</DialogTitle>
                    <DialogDescription>
                        Thay đổi thông tin tại đây. Nhấn <span className="font-bold">Lưu</span> để lưu thay đổi.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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