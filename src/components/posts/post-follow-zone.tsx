"use client"

import { PostDto, useGetPostByFollowingQuery } from "@/generated/types";
import { useUserStorage } from "@/lib/store/userStorage";
import { ScrollArea } from "../ui/scroll-area";
import PostCard from "./post-card";


const PostFollowZone = () => {
  const userStorage = useUserStorage((state) => state.user)
  const userGroup = useUserStorage((state) => state.groups)
  const { data, loading, fetchMore } = useGetPostByFollowingQuery({
    variables: {
      userid: userStorage?.userid as string
    }
  })
  return (
    <>
      <ScrollArea className="w-full h-[calc(100vh-116px)] pr-2">
        <div className="w-full flex flex-col items-center space-y-3">
          {loading ? <>Loading...</> : data?.find_post_by_follow?.filter(i => !i?.group_post?.groupid || userGroup.find(g => g.groupid === i.group_post?.groupid)).map((post, index) => (
            <PostCard
              key={post?.postid}
              post={post as PostDto}
              firstChild={index === 1} />
          ))}
        </div>
      </ScrollArea>
    </>
  );
};

export default PostFollowZone;