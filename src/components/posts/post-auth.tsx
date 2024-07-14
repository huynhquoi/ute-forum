import Link from "next/link";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Label } from "../ui/label";
import { User, useGetPostByUserIdQuery } from "@/generated/types";
import { format } from "date-fns";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";
import FollowBtn from "../shared/follow-btn";

type PostAuthProps = {
  user: User
}

const PostAuth = ({ user }: PostAuthProps) => {
  const { data, loading } = useGetPostByUserIdQuery({
    variables: {
      userid: user?.userid
    }
  })
  return (
    <>
      <Card className="ml-4 shadow-none rounded-md">
        <CardHeader className="flex flex-col p-0">
          <div className="relative w-full h-10 rounded-t-md" style={{ background: user?.color || '#60A5FA'}} >
            <Avatar className="absolute top-1/2 left-[10%] bg-white h-12 w-12">
              <AvatarImage src={user?.image || "/userLogo.png"} />
            </Avatar>
          </div>
          <div className="w-full h-8 relative">
            <p className="absolute top-0 left-[calc(10%+56px)] text-lg font-bold">
              {user?.fullname}
            </p>
          </div>
        </CardHeader>
        <CardContent className="mt-4">
          <FollowBtn userId={user?.userid} />
          <div className="mt-4">
            {user?.bio}
          </div>
          <div className="mt-2">
            <Label className="font-bold text-gray-700 text-base">Địa chỉ</Label>
            <p>{user?.address}</p>
          </div>
          <div className="mt-2">
            <Label className="font-bold text-gray-700 text-base">
              Ngày tham gia
            </Label>
            <p>{format(user?.createday || new Date(), "dd/MM/yyyy")}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="ml-4 mt-2 shadow-none rounded-md">
        <CardHeader>
          <div className="text-lg">
            Bài viết khác từ <span className="font-bold">{user?.fullname}</span>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {data?.find_post_by_userid?.map((item, index) => {
            if (index < 3) {
              return (
                <Link href={`/post/${item?.postid}`} key={index} className="flex flex-col px-6 py-4 border-y hover:cursor-pointer">
                  <Label className="text-base font-bold hover:cursor-pointer">
                    {item?.title}
                  </Label>
                  <div className="mt-1">
                    {item?.listtopic?.map((topic, index) => {
                      if (index < 2) {
                        return (
                          <Badge className="mr-2" key={topic?.topic_posttopic?.topicid}>{topic?.topic_posttopic?.topicname}</Badge>
                        )
                      }
                    })}
                    {item?.listtopic?.length as number > 2
                      ? <HoverCard>
                        <HoverCardTrigger asChild>
                          <Button className="w-4 h-[23px] shadow-none rounded-md border-black" variant={"ghost"}><Badge>+</Badge></Button>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-64 flex flex-col items-start space-y-2">
                          {item?.listtopic?.map((topic, index) => {
                            if (index >= 2) {
                              return (
                                <Badge className="mr-2" key={topic?.topic_posttopic?.topicid}>{topic?.topic_posttopic?.topicname}</Badge>
                              )
                            }
                          })}
                        </HoverCardContent>
                      </HoverCard>
                      : <></>}
                  </div>
                </Link>
              )
            }
          })}
        </CardContent>
      </Card>
    </>
  );
};

export default PostAuth;
