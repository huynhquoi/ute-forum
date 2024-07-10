import { PostDto, User } from "@/generated/types"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import ImageCover from "../shared/image-cover";
import { Card, CardContent, CardHeader } from "../ui/card";
import UserDisplay from "../users/user-display";
import { Badge } from "../ui/badge";
import Description from "../shared/description";
import { format } from "date-fns";

interface QuickDetailPostProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
    post: PostDto,
    children: React.ReactNode;
}

const QuickDetailPost: React.FC<QuickDetailPostProps> = ({ post, children, ...props }) => {
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    {children}
                </DialogTrigger>
                <DialogContent className="sm:max-w-[900px]">
                    <DialogHeader>
                        <DialogTitle>Chi tiết bài viết</DialogTitle>
                    </DialogHeader>
                    <ScrollArea className="w-full h-[80vh] pr-2">
                        <div className="h-[80vh] overflow-y-auto">
                            <ImageCover image={post?.image as string} />
                            <Card className="rounded-md shadow-none">
                                <CardHeader>
                                    {post?.postid
                                        ? <UserDisplay
                                            user={post?.user_post as User}
                                            descripttion={
                                                format(post?.createday || new Date(),
                                                    "dd/MM/yyyy")} />
                                        : <></>}
                                </CardHeader>
                                <CardContent>
                                    <p className="text-3xl font-bold mb-2">
                                        {post?.title}
                                    </p>
                                    <div className="flex items-center mb-2">
                                        {post?.listtopic?.map((topic, index) => {
                                            if (index < 2) {
                                                return (
                                                    <Badge className="mr-2" key={topic?.topic_posttopic?.topicid}>{topic?.topic_posttopic?.topicname}</Badge>
                                                )
                                            }
                                        })}
                                    </div>
                                    <Description value={post?.content as string}>
                                    </Description>
                                </CardContent>
                            </Card>
                        </div>
                    </ScrollArea>
                </DialogContent>
            </Dialog>
        </>
    )
}
export default QuickDetailPost