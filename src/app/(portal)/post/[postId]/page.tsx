"use client";

import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import UserDisplay from "@/components/users/user-display";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import PostAuth from "@/components/posts/post-auth";
import { useEffect, useState } from "react";
import { PostDto, User, useCreateReadPostMutation, useGetPostByIdQuery } from "@/generated/types";
import Description from "@/components/shared/description";
import CommentArea from "@/components/comment/comment-area";
import ImageCover from "@/components/shared/image-cover";
import { useCommentStorage } from "@/lib/store/commentStorage";
import { ArrowDownCircle, ArrowUpCircle, Eye, Flag } from "@/components/svgs";
import { useUserStorage } from "@/lib/store/userStorage";
import PostAction from "@/components/posts/post-action";
import { format } from "date-fns";
import ReportDialog from "@/components/shared/report-dialog";
import { REPORT_POST } from "@/generated/default-types";

const PostDetail = () => {
  const param = useParams();
  const [read, setRead] = useState(false)
  const user = useUserStorage((state) => state.user)

  const [createRead] = useCreateReadPostMutation()

  const { data, loading, fetchMore, refetch } = useGetPostByIdQuery({
    variables: {
      postid: parseInt(param?.postId as string)
    }
  })

  useEffect(() => {
    if (!read) {
      return
    }

    createRead({
      variables: {
        postid: parseInt(param?.postId as string),
        userid: user?.userid,
      }
    }).then(() => refetch())
  }, [createRead, param?.postId, read, refetch, user?.userid])

  setTimeout(() => {
    if (read) {
      return
    }
    setRead(true)
  }, 10000)

  const comment = useCommentStorage((state) => state.comments)
  return (
    <>
      <div className="w-full flex justify-between min-h-[calc(100vh-72px)]">
        <div className="w-16">
          <div className="flex flex-col items-start space-y-4 mt-16">
            {loading ? <></> : <>
              <PostAction post={data?.find_post_by_id as PostDto} isVertical={true} />
              <Button
                variant={"secondary"}
                className={`rounded-full shadow-none bg-white hover:bg-gray-200`}
              >
                <Eye className="text-2xl" />
                <p className="ml-2 text-sm text-black">{data?.find_post_by_id?.totalread}</p>
              </Button>
              <ReportDialog type={REPORT_POST} title={data?.find_post_by_id?.title || ''} postId={parseInt(param?.postId as string)}>
                <Button
                  variant={"secondary"}
                  className={`rounded-full shadow-none bg-white hover:bg-gray-200`}
                >
                  <Flag className="text-2xl text-red-500" />
                </Button>
              </ReportDialog>
            </>}
          </div>
        </div>
        <div className="grid grid-cols-3 w-[calc(100%-80px)]">
          <div className="col-span-2">
            <ScrollArea className="w-full h-[calc(100vh-72px)] pr-3">
              {data?.find_post_by_id?.image ? <ImageCover image={data?.find_post_by_id?.image as string} /> : <></>}
              <Card className="rounded-md shadow-none">
                <CardHeader>
                  {data?.find_post_by_id?.postid
                    ? <UserDisplay
                      user={data?.find_post_by_id?.user_post as User}
                      descripttion={
                        format(data?.find_post_by_id?.createday || new Date(),
                          "dd/MM/yyyy")} />
                    : <></>}
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold mb-2">
                    {data?.find_post_by_id?.title}
                  </p>
                  <div className="flex items-center mb-2">
                    {data?.find_post_by_id?.listtopic?.map((topic, index) => {
                      if (index < 2) {
                        return (
                          <Badge className="mr-2" key={topic?.topic_posttopic?.topicid}>{topic?.topic_posttopic?.topicname}</Badge>
                        )
                      }
                    })}
                  </div>
                  <Description value={data?.find_post_by_id?.content as string}>
                    {/* {data?.find_post_by_id?.content} */}
                  </Description>
                </CardContent>
              </Card>
              <p className="my-4 text-xl font-bold">
                Bình luận <span className="text-lg text-gray-400">{comment.length}</span>
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
