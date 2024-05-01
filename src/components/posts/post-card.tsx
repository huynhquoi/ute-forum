import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Separator } from "../ui/separator";
import UserDisplay from "../users/user-display";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { Post, PostDto } from "@/generated/types";

type PostCardProps = {
  post: PostDto
}

const PostCard = ({ post }: PostCardProps) => {
  return (
    <>
      <Separator className="my-1" />
      <Card className="w-full shadow-none border-none hover:bg-gray-100 cursor-pointer">
        <Link href={`/post/${post.postid}`}>
          <CardHeader className="py-1 px-2">
            <UserDisplay user={post?.user_post} />
          </CardHeader>
          <CardContent className="py-1 px-2">
            <p className="text-xl font-bold">
              {post.title}
            </p>
            <div className="flex items-center">
              //topic
            </div>
            <div className="my-1 py-4 flex items-center justify-center bg-black bg-opacity-50 rounded-md">
              <Image
                src={post.image as string || "/loginpage.jpg"}
                alt="Textpage"
                width={600}
                height={400}
                className="rounded-md"
              />
            </div>
          </CardContent>
        </Link>
        <CardFooter className="py-1 px-2 flex items-center justify-between">
          <div className="">
            <Button
              variant={"secondary"}
              className="rounded-full shadow-none bg-gray-200 hover:bg-gray-200"
            >
              <Image
                src={"/arrow-up-circle.png"}
                alt="like"
                width={24}
                height={24}
              />
              <p className="ml-2 text-sm">{post.totallike}</p>
            </Button>
            <Button
              variant={"secondary"}
              className="rounded-full shadow-none bg-gray-200 hover:bg-gray-200 ml-2"
            >
              <Image
                src={"/arrow-down-circle.png"}
                alt="like"
                width={24}
                height={24}
              />
              <p className="ml-2 text-sm">{post.totaldislike}</p>
            </Button>
            <Button
              variant={"secondary"}
              className="rounded-full shadow-none bg-gray-200 hover:bg-gray-200 ml-2"
            >
              <Image
                src={"/message-square.svg"}
                alt="like"
                width={24}
                height={24}
              />
              <p className="ml-2 text-sm">126</p>
            </Button>
          </div>
          <Button
            variant={"secondary"}
            className="rounded-full shadow-none bg-gray-200 hover:bg-gray-200 ml-2"
          >
            <Image src={"/bookmark.svg"} alt="like" width={24} height={24} />
            <p className="ml-2 text-sm">126</p>
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default PostCard;
