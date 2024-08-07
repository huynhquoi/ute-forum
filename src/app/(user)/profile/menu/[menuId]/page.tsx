"use client";

import PostCard from "@/components/posts/post-card";
import ProfileHeader from "@/components/profile/profile-header";
import ProfileInfo from "@/components/profile/profile-info";
import ProfilePostOutstanding from "@/components/profile/profile-post-outstanding";
import { Post, PostDto, User, useGetPostByUserIdQuery } from "@/generated/types";
import useZustandHook from "@/hooks/useZustandHook";
import { UserActions, UserState, useUserStorage } from "@/lib/store/userStorage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams, useRouter } from "next/navigation";
import SavedZone from "@/components/menu/saved-zone";
import FollowingZone from "@/components/menu/following-zone";
import FollowerZone from "@/components/menu/follower-zone";
import MaganerZone from "@/components/menu/manager-zone";
import ForumZone from "@/components/menu/forum-zone";
import { hexToRgba } from "@/lib/utils";
import { Card } from "@/components/ui/card";

const MenuPage = () => {
  const param = useParams()
  const router = useRouter();
  const userStorage = useZustandHook<UserActions & UserState, User | null>(useUserStorage, (state => state.user))
  const { data, loading, fetchMore } = useGetPostByUserIdQuery({
    variables: {
      userid: userStorage?.userid
    }
  })
  return (
    <>
      {userStorage ? <ProfileHeader user={userStorage as User} /> : <></>}
      <div className="grid grid-cols-7" style={{backgroundColor: hexToRgba(userStorage?.color || '', 0.05) || ""}}>
        <div className="col-span-1"></div>
        <div className="col-span-2">
          <ProfileInfo user={userStorage as User} />
          <ProfilePostOutstanding post={data?.find_post_by_userid as PostDto[]} />
        </div>
        <div className="col-span-3">
          <Card className="mt-4 p-3">
            <Tabs defaultValue={param.menuId as string} className="w-full" onValueChange={(e) => {router.push(e)}}>
              <TabsList>
                <TabsTrigger value="saved">Đã lưu</TabsTrigger>
                <TabsTrigger value="following">Đang theo dõi</TabsTrigger>
                <TabsTrigger value="follower">Được theo dõi</TabsTrigger>
                <TabsTrigger value="maganer">Quản lý</TabsTrigger>
                <TabsTrigger value="forum">Diễn đàn</TabsTrigger>
              </TabsList>
              <TabsContent value="saved">
                <SavedZone />
              </TabsContent>
              <TabsContent value="following">
                <FollowingZone />
              </TabsContent>
              <TabsContent value="follower">
                <FollowerZone />
              </TabsContent>
              <TabsContent value="maganer">
                <MaganerZone />
              </TabsContent>
              <TabsContent value="forum">
                <ForumZone />
              </TabsContent>
            </Tabs>
          </Card>
        </div>
        <div className="col-span-1"></div>
      </div>
    </>
  );
};

export default MenuPage;
