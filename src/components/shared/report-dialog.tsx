'use client'

import { z } from "zod"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import { ScrollArea } from "../ui/scroll-area"
import { REPORT_COMMENT, REPORT_POST, REPORT_USER } from "@/generated/default-types"
import { useCreateReportCommentMutation, useCreateReportPostMutation, useCreateReportUserMutation } from "@/generated/types"
import useStorage from "@/hooks/useStorage"
import { useState } from "react"
import { toast } from "../ui/use-toast"

type ReportDialogProps = {
    children: React.ReactNode
    title?: string
    type: number,
    userId?: string,
    postId?: number,
    commentId?: number,
}

const ReportSchema = z.object({
    reason: z.string().min(1),
    content: z.string().min(1)
})

const ReportDialog = ({ children, title, type, commentId, postId, userId }: ReportDialogProps) => {
    const { getItem } = useStorage()
    const [open, setOpen] = useState(false)
    const [CreateReportUser, { loading: loadU }] = useCreateReportUserMutation()
    const [CreateReportPost, { loading: loadP }] = useCreateReportPostMutation()
    const [CreateReportComment, { loading: loadC }] = useCreateReportCommentMutation()
    const form = useForm<z.infer<typeof ReportSchema>>({
        resolver: zodResolver(ReportSchema),
        defaultValues: {
            content: '',
            reason: ''
        }
    })

    const onSubmit = (values: z.infer<typeof ReportSchema>) => {
        console.log(values)
        if (type === REPORT_USER) {
            CreateReportUser({
                variables: {
                    report: values,
                    reporterid: getItem('userId'),
                    userid: userId
                }
            }).then(() => {
                setOpen(false)
                return;
            }).catch((err) => {
                toast({
                    title: 'Lỗi',
                    description: err.message,
                    variant: 'destructive'
                })
            })
        }
        if (type === REPORT_POST) {
            CreateReportPost({
                variables: {
                    report: values,
                    reporterid: getItem('userId'),
                    postid: postId
                }
            }).then(() => {
                setOpen(false)
                return;
            }).catch((err) => {
                toast({
                    title: 'Lỗi',
                    description: err.message,
                    variant: 'destructive'
                })
            })
        }
        if (type === REPORT_COMMENT) {
            CreateReportComment({
                variables: {
                    report: values,
                    reporterid: getItem('userId'),
                    commentid: commentId
                }
            }).then(() => {
                setOpen(false)
                return;
            }).catch((err) => {
                toast({
                    title: 'Lỗi',
                    description: err.message,
                    variant: 'destructive'
                })
            })
        }
    }
    return (<>
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="max-h-[70vh] pr-3">
                <DialogHeader>
                    <DialogTitle>Báo cáo {title}</DialogTitle>
                </DialogHeader>
                <ScrollArea className="max-h-[60vh] pr-3">
                    <div className="">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                                <FormField
                                    control={form.control}
                                    name="reason"
                                    render={({ field }) => (
                                        <FormItem className="mx-1">
                                            <FormLabel className="font-bold">
                                                Lý do <span className="text-red-600">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder="Nhập lý do" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="content"
                                    render={({ field }) => (
                                        <FormItem className="mx-1">
                                            <FormLabel className="font-bold">
                                                Chi tiết <span className="text-red-600">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Nhập lý do" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button variant={'outline'} type="submit" className="w-full border-red-500 bg-red-100 text-red-500 hover:bg-red-500 hover:text-white">
                                    Báo cáo
                                </Button>
                            </form>
                        </Form>
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    </>)
}

export default ReportDialog