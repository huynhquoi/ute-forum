import Link from "next/link";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Label } from "../ui/label";
import { User, useGetPostByUserIdQuery } from "@/generated/types";

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
          <div className="relative bg-blue-400 w-full h-10 rounded-t-md">
            <Avatar className="absolute top-1/2 left-[10%] bg-white h-12 w-12">
              <AvatarImage src="/userLogo.png" />
            </Avatar>
          </div>
          <div className="w-full h-8 relative">
            <p className="absolute top-0 left-[calc(10%+56px)] text-lg font-bold">
              {user?.fullname}
            </p>
          </div>
        </CardHeader>
        <CardContent className="mt-4">
          <Button className="w-full font-bold" variant={"outline"}>
            Theo dõi
          </Button>
          <div className="mt-4">
            Ful-stack Dev, blogger, giáo viên. Theo dõi tôi để biết thêm nhiều
            điều hấp dẫn
          </div>
          <div className="mt-2">
            <Label className="font-bold text-gray-700 text-base">Địa chỉ</Label>
            <p>Hồ Chí Minh, Việt Nam</p>
          </div>
          <div className="mt-2">
            <Label className="font-bold text-gray-700 text-base">
              Ngày tham gia
            </Label>
            <p>20/12/2023</p>
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
                <Link href={`/post/${item?.postid}`} key={index} className="flex flex-col px-6 py-4 border-y">
                  <Label className="text-base font-bold">
                    {item?.title}
                  </Label>
                  <div className="mt-1">
                    {item?.listtopic?.map((topic) => (
                      <Badge key={topic?.topic_posttopic?.topicid}>{topic?.topic_posttopic?.topicname}</Badge>
                    ))}
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
