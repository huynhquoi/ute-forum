import { Message, User, useCheckMessageExistQuery, useCreateMessageMutation } from "@/generated/types";
import { Card, CardHeader } from "../ui/card";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import ProfileEdit from "./profile-edit";
import React, { useState } from "react";
import { useUserStorage } from "@/lib/store/userStorage";
import Link from "next/link";
import ForumForm from "../forum/forum-form";
import UserMessenger from "../layout/user-messeger";
import { useMessageStore } from "@/lib/store/mesageStore";
import QuickMessage from "../message/quick-message";
import ReportDialog from "../shared/report-dialog";
import { Flag } from "../svgs";
import { REPORT_USER } from "@/generated/default-types";
import { toast } from "../ui/use-toast";

type ProfileHeaderProps = {
  user?: User;
};

const ProfileHeader = ({ user }: ProfileHeaderProps) => {
  const userStorage = useUserStorage((state) => state.user)
  const { data } = useCheckMessageExistQuery({
    variables: {
      userid1: userStorage?.userid,
      userid2: user?.userid
    }
  })

  const color = user?.userid ? (user?.color ? user.color : '#60A5FA') : userStorage?.color || '#60A5FA'
  return (
    <>
      <Card className="shadow-none border-x-none border-t-none rounded-none fixed top-[56px] w-full z-50">
        <CardHeader className="flex flex-col p-0">
          <div style={{ background: color }} className="w-full h-20">
            <div className="grid grid-cols-7 h-20">
              <div className="col-span-1"></div>
              <div className="col-span-5 relative h-20">
                <Avatar
                  className={`absolute top-1/2 left-0 bg-white h-24 w-24 border-[6px]`}
                  style={{ borderColor: color }}
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
                </div> : <>
                  <div className="flex items-center space-x-2">
                    <ReportDialog type={REPORT_USER} title={user?.fullname || ''} userId={user?.userid}>
                      <Button
                        variant={"destructive"}
                        className={`px-2 space-x-2`}
                      >
                        <Flag className="text-xl text-white" />
                        <p>Báo cáo</p>
                      </Button>
                    </ReportDialog>
                    {data?.check_detail_message ? <UserMessenger>Nhắn tin</UserMessenger> : <QuickMessage user={user as User}></QuickMessage>}
                  </div>
                </>}
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
