import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Separator } from "../ui/separator";
import UserDisplay from "../users/user-display";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { Post, PostDto, useDeletePostMutation, User } from "@/generated/types";
import PostAction from "./post-action";
import { useState } from "react";
import ImageCover from "../shared/image-cover";
import PostMenu from "./post-menu";
import { useUserStorage } from "@/lib/store/userStorage";
import { format } from "date-fns";
import PostBookmark from "./post-bookmark";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ArrowTo } from "../svgs";

type PostCardProps = {
  post: PostDto
  firstChild?: boolean
}

const PostCard = ({ post, firstChild }: PostCardProps) => {
  const [iseDeleted, setIsDeleted] = useState(false)
  const userStorage = useUserStorage(state => state.user)
  return (
    <>
      {!firstChild ? <Separator className="my-1" /> : <></>}
      {iseDeleted ?
        <Card className="text-base">
          <CardHeader className="text-xl font-bold py-3">
            Xóa bài viết
          </CardHeader>
          <CardContent>
            Bài viết này đã bị xóa. <Link href={"/create-post"} className="font-bold">Tạo bài viết mới ngay</Link>
          </CardContent>
        </Card>
        : <Card className="w-full shadow-none border-none hover:bg-gray-100 cursor-pointer">
          <CardHeader className="py-1 px-2 flex flex-row justify-between items-start">
            {post?.group_post?.groupid
              ? <Link href={`/forum/${post?.group_post?.groupid}`} className="flex items-center">
                <Avatar>
                  <AvatarImage src={post?.group_post?.image || "/userLogo.png"} alt="CN"></AvatarImage>
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="ml-2">
                  <p className="font-bold flex items-center space-x-1">
                    <span>{post?.user_post?.fullname}</span>
                    <ArrowTo className="text-sm font-bold text-green-500" />
                    <span>{post?.group_post?.groupname}</span></p>
                  <p className="text-sm">{format(post?.createday, "dd/MM/yyyy")}</p>
                </div>
              </Link>
              : <UserDisplay user={post?.user_post as User} descripttion={format(post?.createday, "dd/MM/yyyy")} />}
            {userStorage?.userid === post?.user_post?.userid ? <PostMenu post={post} onDeleted={() => setIsDeleted(true)} /> : <></>}
          </CardHeader>
          <Link href={`/post/${post.postid}`}>
            <CardContent className="py-1 px-2">
              <p className="text-xl font-bold">
                {post.title}
              </p>
              <div className="flex items-center">
                {post?.listtopic?.map(item => (<Badge key={item?.topic_posttopic?.topicid} className="mr-1">{item?.topic_posttopic?.topicname}</Badge>))}
              </div>
              <ImageCover image={post?.image as string} />
            </CardContent>
          </Link>
          <CardFooter className="py-1 px-2 flex items-center justify-between">
            <PostAction post={post} useBg={true} showCommnent={true} />
            <PostBookmark postId={post?.postid} />
          </CardFooter>
        </Card>}
    </>
  );
};

export default PostCard;
