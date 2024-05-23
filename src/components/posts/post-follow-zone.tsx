"use client"

import { PostDto, useGetPostByFollowingQuery } from "@/generated/types";
import { useUserStorage } from "@/lib/store/userStorage";
import { ScrollArea } from "../ui/scroll-area";
import PostCard from "./post-card";


const PostFollowZone = () => {
  const userStorage = useUserStorage((state) => state.user)
  const { data, loading, fetchMore } = useGetPostByFollowingQuery({
    variables: {
      userid: userStorage?.userid as string
    }
  })
  return (
    <>
      <ScrollArea className="w-full h-[calc(100vh-116px)]">
        {loading ? <>Loading...</> : data?.find_post_by_follow?.map((post, index) => (
          <PostCard
            key={post?.postid}
            post={post as PostDto}
            firstChild={index === 1} />
        ))}
      </ScrollArea>
    </>
  );
};

export default PostFollowZone;