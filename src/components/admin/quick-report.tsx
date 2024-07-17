import { Report, useGetReportByTypeQuery, User } from "@/generated/types"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Card, CardContent, CardHeader } from "../ui/card";
import UserDisplay from "../users/user-display";
import { format } from "date-fns";
import { Textarea } from "../ui/textarea";
import ImageCover from "../shared/image-cover";
import { Badge } from "../ui/badge";
import Description from "../shared/description";
import CommentItems from "../comment/comment-item";
import QuickReportActions from "./quick-report-action";
import { REPORT_USER } from "@/generated/default-types";
import { useUserStorage } from "@/lib/store/userStorage";
import { useState } from "react";

interface QuickReportProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
    report: Report,
    type: 1 | 2 | 3,
    children: React.ReactNode;
}

const QuickReport: React.FC<QuickReportProps> = ({ report, children, type, ...props }) => {
    const { user } = useUserStorage()
    const [open, setOpen] = useState(false)
    const { refetch } = useGetReportByTypeQuery({
        variables: {
            type: type
        }
    })
    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    {children}
                </DialogTrigger>
                <DialogContent className="sm:max-w-[900px]">
                    <DialogHeader>
                        <DialogTitle>Chi tiết báo cáo</DialogTitle>
                    </DialogHeader>
                    <ScrollArea className="w-full max-h-[80vh] pr-2">
                        <div className="max-h-[80vh] overflow-y-auto">
                            <div className="flex flex-col items-start space-y-2">
                                <p>Người báo cáo</p>
                                <Card className="w-full p-3">
                                    <UserDisplay user={report?.user_reporter as User} />
                                </Card>
                                <p>Lý do</p>
                                <Textarea disabled={true} value={report?.reason || ''} />
                                <p>Chi tiết</p>
                                <Textarea disabled={true} value={report?.content || ''} />

                                <p>Đối tượng báo cáo</p>
                                {report?.user_report?.userid ?
                                    <Card className="w-full p-3">
                                        <UserDisplay user={report?.user_report as User} />
                                    </Card>
                                    : <></>}
                                {report?.post_report?.postid ?
                                    <Card>
                                        <ImageCover image={report?.post_report?.image as string} />
                                        <Card className="rounded-md shadow-none">
                                            <CardHeader>
                                                {report?.post_report?.postid
                                                    ? <UserDisplay
                                                        user={report?.post_report?.user_post as User}
                                                        descripttion={
                                                            format(report?.post_report?.createday || new Date(),
                                                                "dd/MM/yyyy")} />
                                                    : <></>}
                                            </CardHeader>
                                            <CardContent>
                                                <p className="text-3xl font-bold mb-2">
                                                    {report?.post_report?.title}
                                                </p>
                                                <Description value={report?.post_report?.content as string}>
                                                </Description>
                                            </CardContent>
                                        </Card>
                                    </Card>
                                    : <></>}
                                {report?.comment_report?.commentid ?
                                    <Card className="w-full p-3">
                                        <CommentItems
                                            comment={report?.comment_report}
                                            inReport={true}
                                        />
                                    </Card>
                                    : <></>}
                            </div>
                        </div>
                    </ScrollArea>
                    <QuickReportActions
                        report={report}
                        type={type}
                        userId={user?.userid as string}
                        onDoneAction={() => {
                            refetch().then(() => setOpen(false))
                        }} />
                </DialogContent>
            </Dialog>
        </>
    )
}
export default QuickReport