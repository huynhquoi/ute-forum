import { Comment, User } from "@/generated/types"
import UserDisplay from "../users/user-display"
import { Card, CardContent } from "../ui/card"
import { Button } from "../ui/button"
import { useState } from "react"
import CommentForm from "./comment-form"
import { format } from "date-fns"
import { Flag, Reply } from "../svgs"
import { useUserStorage } from "@/lib/store/userStorage"
import Link from "next/link"
import ReportDialog from "../shared/report-dialog"
import { REPORT_COMMENT } from "@/generated/default-types"

type CommentItemsProps = {
  comment: Comment
  onReload?: () => void
  onComment?: () => void
  inReport?: boolean
}

const CommentItems = ({ comment, inReport, onReload, onComment }: CommentItemsProps) => {
  const [reply, setReply] = useState(false)
  return <>
    <div className="w-full">
      <UserDisplay user={comment?.user_comment as User} descripttion={format(comment?.createday || new Date(), "dd/MM/yyyy HH:mm")} />
      <Card className="ml-12 shadow-none rounded-md bg-gray-100">
        <CardContent className="px-4 py-3">
          {!!comment?.comment_comment?.commentid ? <div className="text-sm flex items-center">
            <span className="font-bold text-gray-500 mr-1"><span>Đã trả lời</span>
            </span>
            {comment?.user_comment?.userid === comment?.comment_comment?.user_comment?.userid
              ? "chính mình"
              : <div className="flex items-center">
                <Reply className="text-base" />
                <Link href={`/profile/${comment?.comment_comment?.user_comment?.userid}`} className="font-bold">
                  {comment?.comment_comment?.user_comment?.fullname}
                </Link>
              </div>}
          </div> : <></>}
          {comment?.content}
        </CardContent>
      </Card>
      {inReport
        ? <></>
        : <div className="flex flex-col items-start ml-12">
          <div className="flex items-center space-x-2">
            <Button
              variant={"ghost"}
              className="p-0"
              onClick={() => {
                setReply(!reply)
              }}>Phản hồi</Button>
            <ReportDialog type={REPORT_COMMENT} title={'bình luận này'} commentId={comment?.commentid}>
              <Button
                variant={"secondary"}
                className={`rounded-full shadow-none bg-white hover:bg-gray-200 px-2`}
              >
                <Flag className="text-base text-red-500" />
              </Button>
            </ReportDialog>
          </div>
          {reply
            ? <CommentForm
              postId={comment?.post_comment?.postid as number}
              commentId={comment?.commentid as number} />
            : <></>}
        </div>
      }
    </div>
  </>
}

export default CommentItems