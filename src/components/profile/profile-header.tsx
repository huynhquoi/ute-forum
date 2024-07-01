import { User, useCreateMessageMutation } from "@/generated/types";
import { Card, CardHeader } from "../ui/card";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import ProfileEdit from "./profile-edit";
import { useState } from "react";
import { useUserStorage } from "@/lib/store/userStorage";
import Link from "next/link";
import ForumForm from "../forum/forum-form";

type ProfileHeaderProps = {
  user?: User;
};

const ProfileHeader = ({ user }: ProfileHeaderProps) => {
  const userStorage = useUserStorage((state) => state.user)
  const [createMessage] = useCreateMessageMutation()

  const handleCreateMessage = () => {
    if(!user?.userid) {
      return
    }
    createMessage({
      variables: {
        userid1: userStorage?.userid,
        userid2: user.userid
      }
    })
  }
  return (
    <>
      <Card className="shadow-none border-x-none border-t-none rounded-none fixed top-[56px] w-full z-50">
        <CardHeader className="flex flex-col p-0">
          <div className=" bg-blue-400 w-full h-20">
            <div className="grid grid-cols-7 h-20">
              <div className="col-span-1"></div>
              <div className="col-span-5 relative h-20">
                <Avatar
                  className={`absolute top-1/2 left-0 bg-white h-24 w-24 border-[6px]`}
                  style={{ borderColor: "#60A5FA" }}
                >
                  <AvatarImage
                    src={user?.image || "/userLogo.png"}
                    alt={user?.fullname as string}
                  />
                </Avatar>
              </div>
              <div className="col-span-1"></div>
            </div>
          </div>
          <div className="w-full h-24 relative">
            <div className="grid grid-cols-7 h-24">
              <div className="col-span-1"></div>
              <div className="col-span-5 relative h-24 flex justify-end">
                <div className="absolute top-0 left-[106px]">
                  <p className="text-2xl font-bold">{user?.fullname}</p>
                  <p className="text-base">
                    <span className="font-bold text-gray-500">Reputation:</span>{" "}
                    {user?.reputation}
                  </p>
                </div>
                {user?.userid === userStorage?.userid ? <div className="flex items-start space-x-2">
                  <ForumForm />
                  <Link href={"/create-post"}><Button>Đăng bài</Button></Link>
                  <ProfileEdit />
                </div> : <><Button onClick={() => {handleCreateMessage()}}>Nhắn tin</Button></>}
              </div>
              <div className="col-span-1"></div>
            </div>
          </div>
        </CardHeader>
      </Card>
      <div className="mb-60"></div>
    </>
  );
};

export default ProfileHeader;
