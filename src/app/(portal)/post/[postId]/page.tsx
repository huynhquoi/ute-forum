"use client";

import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import UserDisplay from "@/components/users/user-display";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import PostAuth from "@/components/posts/post-auth";
import { useState } from "react";
import { User, useGetPostByIdQuery } from "@/generated/types";
import Description from "@/components/shared/description";
import CommentArea from "@/components/comment/comment-area";
import ImageCover from "@/components/shared/image-cover";

const PostDetail = () => {
  const param = useParams();
  const { data, loading, fetchMore } = useGetPostByIdQuery({
    variables: {
      postid: parseInt(param?.postId as string)
    }
  })
  return (
    <>
      <div className="w-full flex justify-between min-h-[calc(100vh-72px)]">
        <div className="w-16">
          <div className="flex flex-col items-center h-60 justify-between mt-16">
            <Button
              variant={"ghost"}
              className="rounded-full shadow-none flex flex-col items-center h-12"
            >
              <Image
                src={"/arrow-up-circle.png"}
                alt="like"
                width={24}
                height={24}
              />
              <p className="text-sm">1000</p>
            </Button>
            <Button
              variant={"ghost"}
              className="rounded-full shadow-none flex flex-col items-center h-12"
            >
              <Image
                src={"/arrow-down-circle.png"}
                alt="like"
                width={24}
                height={24}
              />
              <p className="text-sm">1000</p>
            </Button>
            <Button
              variant={"ghost"}
              className="rounded-full shadow-none flex flex-col items-center h-12"
            >
              <Image src={"/bookmark.svg"} alt="like" width={24} height={24} />
              <p className="text-sm">126</p>
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-3 w-[calc(100%-80px)]">
          <div className="col-span-2">
            <ScrollArea className="w-full h-[calc(100vh-72px)]">
              <ImageCover image={data?.find_post_by_id?.image as string} />
              <Card className="rounded-md shadow-none">
                <CardHeader>
                  <UserDisplay user={data?.find_post_by_id?.user_post as User} />
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold mb-2">
                    {data?.find_post_by_id?.title}
                  </p>
                  <div className="flex items-center mb-2">
                    <Badge className="mr-2">Học tập</Badge>
                    <Badge>Sinh viên</Badge>
                  </div>
                  <Description value={data?.find_post_by_id?.content as string}>
                    {/* {data?.find_post_by_id?.content} */}
                  </Description>
                </CardContent>
              </Card>
              <p className="my-4 text-xl font-bold">
                Bình luận <span className="text-lg text-gray-400">126</span>
              </p>
              <CommentArea postId={data?.find_post_by_id?.postid as number} />
            </ScrollArea>
          </div>
          <div className="col-span-1">
            <PostAuth user={data?.find_post_by_id?.user_post as User} />
          </div>
        </div>
      </div>
    </>
  );
};

export default PostDetail;
