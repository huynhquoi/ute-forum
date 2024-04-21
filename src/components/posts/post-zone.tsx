import { ScrollArea } from "../ui/scroll-area";
import PostCard from "./post-card";

const PostZone = () => {
  return (
    <>
      <ScrollArea className="w-full h-[calc(100vh-116px)]">
        <PostCard />
        <PostCard />
        <PostCard />
      </ScrollArea>
    </>
  );
};

export default PostZone;
