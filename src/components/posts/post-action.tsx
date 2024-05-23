"use client"

import Image from "next/image";
import { Button } from "../ui/button"
import { PostDto, useCreatePostMutation, useCreatePostReactionMutation, useDeletePostReactionMutation } from "@/generated/types";
import { useUserStorage } from "@/lib/store/userStorage";
import { useEffect, useState } from "react";
import { ArrowDownCircle, ArrowUpCircle, CommentIcon } from "../svgs";

type PostActionProps = {
  post: PostDto
  reacted?: number
  isVertical?: boolean
  useBg?: boolean
  showCommnent?: boolean
}

const PostAction = ({ post, isVertical, useBg, showCommnent }: PostActionProps) => {
  const [click, setClick] = useState(false)
  const [reacted, setReacted] = useState(0)
  const [loading, setLoading] = useState(false);
  const [like, setLike] = useState(post?.totallike)
  const [dislike, setDislike] = useState(post?.totaldislike)
  const userStorage = useUserStorage((state) => state.user)
  const postReacted = useUserStorage((state) => state.postReacted)
  const [CreateReaction, { loading: loadCreate }] = useCreatePostReactionMutation()
  const [DeleteReaction, { loading: loadDelete }] = useDeletePostReactionMutation()

  useEffect(() => {
    if (click) {
      return
    }
    if (!postReacted.length) {
      return
    }
    if (!postReacted.length && reacted === 0) {
      return
    }
    if (postReacted?.filter((item) => item?.post_postlike?.postid === post?.postid)) {
      setReacted(postReacted?.filter((item) => item?.post_postlike?.postid === post?.postid)[0]?.icon_postlike?.iconid as number || 0)
    }
    else {
      return
    }
  }, [click, post?.postid, postReacted, reacted])

  const onReacted = (value: number) => {
    setClick(true)
    if (value === reacted) {
      setReacted(0)
      setLoading(true)
      if (value == 1) {
        setLike(like as number - 1)
      } else {
        setDislike(dislike as number - 1)
      }
      DeleteReaction({
        variables: {
          userid: userStorage?.userid,
          postid: post?.postid,
          iconid: reacted
        }
      }).then(() => {
        setLoading(false)
      })
    } else {
      if (reacted === 0) {
        setReacted(value)
        setLoading(true)
        if (value == 1) {
          setLike(like as number + 1)
        } else {
          setDislike(dislike as number + 1)
        }
        CreateReaction({
          variables: {
            userid: userStorage?.userid,
            postid: post?.postid,
            iconid: value
          }
        }).then(() => {
          setLoading(false)
        })
      } else {
        setReacted(value)
        setLoading(true)
        if (value == 1) {
          setLike(like as number + 1)
          setDislike(dislike as number - 1)
        } else {
          setLike(like as number - 1)
          setDislike(dislike as number + 1)
        }
        DeleteReaction({
          variables: {
            userid: userStorage?.userid,
            postid: post?.postid,
            iconid: 3 - value
          }
        }).then(() => {
          CreateReaction({
            variables: {
              userid: userStorage?.userid,
              postid: post?.postid,
              iconid: value
            }
          }).then(() => {
            setLoading(false)
          })
        })
      }
    }
  }
  return <div className={isVertical ? "flex flex-col items-center space-y-4" : "space-x-4"}>
    <Button
      variant={reacted === 1 ? "destructive" : "secondary"}
      className={`rounded-full shadow-none ${useBg ? "bg-gray-200" : "bg-white"} hover:bg-gray-200`}
      disabled={loading}
      onClick={() => onReacted(1)}
    >
      <ArrowUpCircle className={`text-2xl ${reacted === 1 ? "text-green-500" : "text-black"}`} />
      <p className="ml-2 text-sm text-black">{like}</p>
    </Button>
    <Button
      // variant={reacted === 1 ? "destructive" : "secondary"}
      className={`rounded-full shadow-none ${useBg ? "bg-gray-200" : "bg-white"} hover:bg-gray-200`}
      disabled={loading}
      onClick={() => onReacted(2)}
    >
      <ArrowDownCircle className={`text-2xl ${reacted === 2 ? "text-red-500" : "text-black"}`} />
      <p className="ml-2 text-sm text-black">{dislike}</p>
    </Button>
    {showCommnent ? <>
      <Button
        variant={"secondary"}
        className={`rounded-full shadow-none ${useBg ? "bg-gray-200" : "bg-white"} hover:bg-gray-200`}
      >
        <CommentIcon className="text-2xl" />
        <p className="ml-2 text-sm text-black">{post?.totalcomment}</p>
      </Button>
    </> : <></>}
  </div>
}

export default PostAction