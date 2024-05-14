"use client"

import { Comment, useCreateCommentMutation, useGetCommentByPostIdQuery } from "@/generated/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form"
import Editor from "../shared/editor"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Picture, Send } from "../svgs"
import { useEffect, useState } from "react"
import { useUserStorage } from "@/lib/store/userStorage"
import { Card, CardContent } from "../ui/card"
import CommentItems from "./comment-item"
import CommentForm from "./comment-form"

type CommentAreaProps = {
  postId: number,
}

interface CommentNode extends Comment {
  children: CommentNode[];
}

const CommentArea = ({ postId }: CommentAreaProps) => {

  const [sorted, setSorted] = useState<Comment[]>()
  const { data, loading, fetchMore } = useGetCommentByPostIdQuery({
    variables: {
      postid: postId
    }
  })

  //
  const [load, setLoad] = useState(false)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    if (load) {
      return
    }

    if (total === data?.find_all_comment_by_postid?.length) {
      return
    }

    if (data?.find_all_comment_by_postid?.length) {
      const sortedC = sortComment(data?.find_all_comment_by_postid as Comment[]);
      setSorted(sortedC);
      setLoad(true)
      setTotal(sortedC.length)
    }

  }, [data?.find_all_comment_by_postid, load, total]);

  const sortComment = (comments: Comment[]) => {
    const commentMap = new Map<number, CommentNode>();
    comments?.forEach(comment => {
      commentMap.set(comment.commentid, { ...comment, children: [] });
    });

    let rootComments: CommentNode[] = [];
    commentMap.forEach(comment => {
      if (comment.comment_comment && comment.comment_comment.commentid !== undefined) {
        const parentComment = commentMap.get(comment.comment_comment.commentid);
        if (parentComment) {
          parentComment.children.push(comment);
        }
      } else {
        rootComments.push(comment);
      }
    });

    function traverse(comment: CommentNode, sortedList: Comment[]): void {
      sortedList.push(comment);
      comment.children.forEach(child => traverse(child, sortedList));
    }

    let sortedComments: Comment[] = [];
    rootComments.forEach(comment => traverse(comment, sortedComments));

    return sortedComments;
  }
  //

  const renderComment = (comments: CommentNode[]) => {
    return comments.map(comment => (
      <div className="mb-4" key={comment?.commentid}>
        <CommentItems
          comment={comment as Comment}
          onReload={() => {
            fetchMore({
              variables: {
                postid: postId
              }
            })
          }}
          onComment={() => {
            setLoad(false)
          }} />
        {comment.children.length > 0 && (
          <div>{renderComment(comment.children)}</div>
        )}
      </div>
    ));
  }
  return <>
    <CommentForm
      postId={postId}
      onReload={() => {
        fetchMore({
          variables: {
            postid: postId
          }
        })
      }}
      onComment={() => {
        setLoad(false)
      }} />
    <Card className="my-8 rounded-none border-none shadow-none">
      <CardContent className="p-0">
        {sorted?.length
          ? renderComment(sorted as CommentNode[]) : <>
            <p>Chưa có bình luận nào </p>
          </>}
      </CardContent>
    </Card>

  </>


}

export default CommentArea