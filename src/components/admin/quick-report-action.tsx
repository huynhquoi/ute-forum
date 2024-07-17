import { Report, useCreateNotificationMutation, useDeleteCommentMutation, useDeletePostMutation, useDeleteReportCommentMutation, useDeleteReportPostMutation, useDeleteReportUserMutation, useGetReportByTypeQuery, useUpdateReputationMutation } from "@/generated/types"
import { Button } from "../ui/button"
import { useState } from "react"
import { Input } from "../ui/input"
import { REPORT_COMMENT, REPORT_POST, REPORT_USER } from "@/generated/default-types"
import { toast } from "../ui/use-toast"

type QuickReportActionsProps = {
    type: 1 | 2 | 3,
    userId: string,
    report: Report,
    onDoneAction?: () => void
}

const QuickReportActions = ({ report, type, userId, onDoneAction }: QuickReportActionsProps) => {
    const [loading, setLoading] = useState(false)
    const [action, setAction] = useState<'accept' | 'reject' | ''>()
    const [reputation, setReputation] = useState<number>(0)

    const [doneReportUser] = useDeleteReportUserMutation()
    const [doneReportPost] = useDeleteReportPostMutation()
    const [doneReportComment] = useDeleteReportCommentMutation()

    const [deletePost] = useDeletePostMutation()
    const [deleteComment] = useDeleteCommentMutation()
    const [updateReputation] = useUpdateReputationMutation()

    const [sendNotificaton] = useCreateNotificationMutation()

    const showError = (err: any) => {
        toast({
            title: 'Lỗi',
            description: err instanceof Error ? err.message : String(err),
            variant: 'destructive'
        })
    }

    const handleAccept = async () => {
        setLoading(true)
        try {
            if (type == REPORT_USER) {
                await updateReputation({
                    variables: {
                        userid: report?.user_report?.userid,
                        reputation: -reputation
                    }
                })
                await doneReportUser({
                    variables: {
                        userid: report?.user_report?.userid
                    }
                })
                await sendNotificaton({
                    variables: {
                        content: `Bạn đã nhận trừng phạt trừ ${reputation} điểm reputation vì tài khoản sai quy chuẩn cộng đồng`,
                        userid: userId,
                        subject: 0,
                        type: 0
                    }
                })
            }
            if (type == REPORT_POST) {
                await updateReputation({
                    variables: {
                        userid: report?.post_report?.user_post?.userid,
                        reputation: -reputation
                    }
                })
                await deletePost({
                    variables: {
                        postid: report?.post_report?.postid
                    }
                })
                await doneReportPost({
                    variables: {
                        postid: report?.post_report?.postid
                    }
                })
                await sendNotificaton({
                    variables: {
                        content: `Bạn đã nhận trừng phạt trừ ${reputation} điểm reputation vì bài viết sai quy chuẩn cộng đồng, bài viết của bạn sẽ bị xóa`,
                        userid: userId,
                        subject: 0,
                        type: 0
                    }
                })
            }
            if (type == REPORT_COMMENT) {
                await updateReputation({
                    variables: {
                        userid: report?.comment_report?.user_comment?.userid,
                        reputation: -reputation
                    }
                })
                await deleteComment({
                    variables: {
                        commentid: report?.comment_report?.commentid
                    }
                })
                await doneReportComment({
                    variables: {
                        commentid: report?.comment_report?.commentid
                    }
                })
                await sendNotificaton({
                    variables: {
                        content: `Bạn đã nhận trừng phạt trừ ${reputation} điểm reputation vì bình luận sai quy chuẩn cộng đồng, bình luận của bạn đã bị hệ thống xóa bỏ`,
                        userid: userId,
                        subject: 0,
                        type: 0
                    }
                })
            }
            if (onDoneAction) {
                onDoneAction()
            }
        } catch (error) {
            showError(error)
        } finally {
            setLoading(false)
        }
    }


    const handleReject = async () => {
        setLoading(true)
        updateReputation({
            variables: {
                userid: report?.user_reporter?.userid,
                reputation: -reputation
            }
        }).then(() => {
            sendNotificaton({
                variables: {
                    content: `Bạn đã nhận trừng phạt trừ ${reputation} điểm reputation vì báo cáo sai sự thật`,
                    userid: userId,
                    subject: 0,
                    type: 0
                }
            }).catch((err) => showError(err))
        }).catch((err) => showError(err))
    }
    return (
        <>
            {!action ? <></> : <p className="font-bold text-sm">Nhập điểm reputation cần trừ để phạt đối tượng</p>}
            <div className="flex items-center justify-between">
                <div className="">
                    {!action
                        ? <></>
                        : <>
                            <Input
                                placeholder="Nhập điểm reputation cần trừ"
                                type="number"
                                min={0}
                                value={reputation}
                                onChange={(e) => {
                                    setReputation(parseInt(e?.target?.value || '0'))
                                }}
                            />
                        </>}
                </div>
                <div className="">
                    {!action ? <div className="flex items-center space-x-2">
                        <Button
                            variant={'outline'}
                            className="border-red-500 bg-red-100 text-red-500 hover:text-white hover:bg-red-500 "
                            onClick={() => {
                                setAction('accept')
                            }}
                        >
                            Trừng phạt
                        </Button>
                        <Button
                            variant={'outline'}
                            className="border-green-500 bg-green-100 text-green-500 hover:text-white hover:bg-green-500 "
                            onClick={() => {
                                setAction('reject')
                            }}
                        >
                            Bác bỏ
                        </Button>
                    </div> : <>
                        <Button
                            disabled={loading}
                            variant={'outline'}
                            className="border-green-500 bg-green-100 text-green-500 hover:text-white hover:bg-green-500 "
                            onClick={() => {
                                if (action == 'accept') {
                                    handleAccept().then(() => {
                                        if (typeof onDoneAction !== 'undefined') {
                                            onDoneAction()
                                        }
                                    })
                                }
                                if (action == 'reject') {
                                    handleReject().then(() => {
                                        if (typeof onDoneAction !== 'undefined') {
                                            onDoneAction()
                                        }
                                    })
                                }
                                return
                            }}
                        >
                            Xác nhận
                        </Button>
                    </>}
                </div>
            </div>
        </>
    )
}

export default QuickReportActions