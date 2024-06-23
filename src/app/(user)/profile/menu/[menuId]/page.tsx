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
      <div className="grid grid-cols-7 h-[calc(100vh-72px)]">
        <div className="col-span-1"></div>
        <div className="col-span-2">
          <ProfileInfo user={userStorage as User} />
          <ProfilePostOutstanding post={data?.find_post_by_userid as PostDto[]} />
        </div>
        <div className="col-span-3">
          <div className="mt-4">
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
                Đang theo dõi
              </TabsContent>
              <TabsContent value="follower">
                Được theo dõi
              </TabsContent>
              <TabsContent value="maganer">
                Quản lý
              </TabsContent>
              <TabsContent value="forum">
                Tham gia
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className="col-span-1"></div>
      </div>
    </>
  );
};

export default MenuPage;
