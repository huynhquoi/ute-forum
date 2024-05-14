import { Comment, User } from "@/generated/types"
import UserDisplay from "../users/user-display"
import { Card, CardContent } from "../ui/card"
import { Button } from "../ui/button"
import { useState } from "react"
import CommentForm from "./comment-form"

type CommentItemsProps = {
  comment: Comment
  onReload?: () => void
  onComment?: () => void
}

const CommentItems = ({ comment, onReload, onComment }: CommentItemsProps) => {
  const [reply, setReply] = useState(false)
  return <>
    <div className="w-full">
      <UserDisplay user={comment?.user_comment as User} />
      <Card className="ml-12 shadow-none rounded-md bg-gray-100">
        <CardContent className="px-4 py-3">
          {comment?.content}
        </CardContent>
      </Card>
      <div className="flex flex-col items-start ml-12">
        <Button
          variant={"ghost"}
          className="p-0"
          onClick={() => {
            setReply(!reply)
          }}>Phản hồi</Button>
        {reply
          ? <CommentForm
            postId={comment?.post_comment?.postid as number}
            commentId={comment?.commentid as number}
            onReload={() => {
              if (typeof onReload !== "undefined") {
                onReload()
              }
              setReply(false)
            }}
            onComment={() => {
              if (typeof onComment !== "undefined") {
                onComment()
              }
            }} />
          : <></>}
      </div>
    </div>
  </>
}

export default CommentItems