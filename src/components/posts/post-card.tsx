import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Separator } from "../ui/separator";
import UserDisplay from "../users/user-display";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { Post, PostDto, useDeletePostMutation } from "@/generated/types";
import PostAction from "./post-action";
import { Bookmark, BookmarkFill, Trash } from "../svgs";
import { useState } from "react";
import Notification from "../shared/notification";
import ImageCover from "../shared/image-cover";
import PostMenu from "./post-menu";

type PostCardProps = {
  post: PostDto
}

const PostCard = ({ post }: PostCardProps) => {
  const [iseDeleted, setIsDeleted] = useState(false)

  const [showBookmark, setShowBookmark] = useState(true);

  const handleClick = () => {
    setShowBookmark(false);
  };

  return (
    <>
      <Separator className="my-1" />
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
            <UserDisplay user={post?.user_post} />
            <PostMenu post={post} onDeleted={() => setIsDeleted(true)} />
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
            <PostAction post={post} />
            <Button
              variant={"secondary"}
              className="rounded-full shadow-none bg-gray-200 hover:bg-gray-200 ml-2"
              onClick={handleClick}
              style={{ position: "relative", padding: "8px 16px" }}
            >
              <div className="w-6 h-6"></div>
              <Bookmark
                className="text-2xl"
                style={{ position: "absolute", zIndex: showBookmark ? 1 : -1 }}
              />
              <BookmarkFill
                className="text-2xl text-purple-500"
                style={{
                  position: "absolute",
                  opacity: showBookmark ? 0 : 1,
                  transition: "opacity 0.5s ease-in-out",
                }}
              />
            </Button>
          </CardFooter>
        </Card>}
    </>
  );
};

export default PostCard;
