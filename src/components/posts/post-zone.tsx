import { Post, PostDto, useGetPostQuery, useGetPostReactedByUserIdQuery } from "@/generated/types";
import { ScrollArea } from "../ui/scroll-area";
import PostCard from "./post-card";
import { useUserStorage } from "@/lib/store/userStorage";

const PostZone = () => {
  const userStorage = useUserStorage((state) => state.user)
  const userGroup = useUserStorage((state) => state.groups)
  const { data, loading, fetchMore } = useGetPostQuery({
    variables: {
      limit: 20,
      pacing: 1
    }
  })
  return (
    <>
      <ScrollArea className="w-full h-[calc(100vh-116px)] pr-2">
        <div className="w-full flex flex-col items-center space-y-3">
          {loading ? <>Loading...</> : data?.post?.filter(i => !i?.group_post?.groupid || userGroup.find(g => g.groupid === i.group_post?.groupid))?.map((post, index) => (
            <PostCard
              key={post?.postid}
              post={post as PostDto}
              firstChild={index === 0} />
          ))}
        </div>
      </ScrollArea>
    </>
  );
};

export default PostZone;
