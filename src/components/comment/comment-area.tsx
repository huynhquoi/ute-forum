"use client"

import { Comment, useGetCommentByPostIdQuery } from "@/generated/types";
import { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import CommentItems from "./comment-item";
import CommentForm from "./comment-form";
import { useCommentStorage } from "@/lib/store/commentStorage";

type CommentAreaProps = {
  postId: number,
}

interface CommentNode extends Comment {
  children: CommentNode[];
}

const CommentArea = ({ postId }: CommentAreaProps) => {
  const [sorted, setSorted] = useState<CommentNode[]>([]);
  const comments = useCommentStorage((state) => state.comments)
  const { addPostComment, removePostComment } = useCommentStorage()
  const [onAdd, setOnAdd] = useState(true);
  const [total, setTotal] = useState(0)

  const { data, loading, error } = useGetCommentByPostIdQuery({
    variables: {
      postid: postId
    }
  })

  useEffect(() => {
    if (!onAdd || loading) {
      return;
    }

    if (data?.find_all_comment_by_postid) {
      addPostComment(data?.find_all_comment_by_postid as Comment[] || []);
      setOnAdd(false);
    }
  }, [loading, data, addPostComment, onAdd]);

  useEffect(() => {
    if (comments.length === total) return;
    const sortedC = sortComment(comments);
    setSorted(sortedC);
    setTotal(comments.length)
  }, [comments, total]);

  const sortComment = (comments: Comment[]): CommentNode[] => {
    const commentMap = new Map<number, CommentNode>();
    comments.forEach(comment => {
      commentMap.set(comment?.commentid, { ...comment, children: [] });
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

    return rootComments;
  };

  const renderComment = (comments: CommentNode[]) => {
    return comments.map((comment, index) => (
      <div className="mb-4" key={index}>
        <CommentItems
          comment={comment as Comment}
        />
        <div className={`p-0 m-0 ${!!comment?.comment_comment?.commentid ? "" : "ml-12"}`}>
          {comment.children.length > 0 && (
            <div>{renderComment(comment.children)}</div>
          )}
        </div>
      </div>
    ));
  };

  return (
    <>
      <CommentForm
        postId={postId}
      />
      <Card className="my-8 rounded-none border-none shadow-none">
        <CardContent className="p-0">
          {sorted.length
            ? renderComment(sorted) : (
              <p>Chưa có bình luận nào</p>
            )}
        </CardContent>
      </Card>
    </>
  );
};

export default CommentArea;
