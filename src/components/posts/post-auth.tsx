import Link from "next/link";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Label } from "../ui/label";
import { User } from "@/generated/types";

type PostAuthProps = {
  user: User
}

const PostAuth = ({ user }: PostAuthProps) => {
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
          <Link href={"#"} className="flex flex-col px-6 py-4 border-y">
            <Label className="text-base font-bold">
              Những điều sinh viên cần lưu ý khi mới vào trường
            </Label>
            <div className="mt-1">
              <Badge className="mr-1">Sinh viên</Badge>
              <Badge>hcmute</Badge>
            </div>
          </Link>
          <Link href={"#"} className="flex flex-col px-6 py-4 border-t">
            <Label className="text-base font-bold">
              Những điều sinh viên cần lưu ý khi mới vào trường
            </Label>
            <div className="mt-1">
              <Badge className="mr-1">Sinh viên</Badge>
              <Badge>hcmute</Badge>
            </div>
          </Link>
          <Link href={"#"} className="flex flex-col px-6 py-4 border-y">
            <Label className="text-base font-bold">
              Những điều sinh viên cần lưu ý khi mới vào trường
            </Label>
            <div className="mt-1">
              <Badge className="mr-1">Sinh viên</Badge>
              <Badge>hcmute</Badge>
            </div>
          </Link>
        </CardContent>
      </Card>
    </>
  );
};

export default PostAuth;
