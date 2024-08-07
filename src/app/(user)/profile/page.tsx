"use client";

import PostCard from "@/components/posts/post-card";
import ProfileHeader from "@/components/profile/profile-header";
import ProfileInfo from "@/components/profile/profile-info";
import ProfilePostOutstanding from "@/components/profile/profile-post-outstanding";
import { Post, PostDto, User, useGetPostByUserIdQuery } from "@/generated/types";
import useZustandHook from "@/hooks/useZustandHook";
import { UserActions, UserState, useUserStorage } from "@/lib/store/userStorage";
import { hexToRgba } from "@/lib/utils";

const ProfilePage = () => {
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
          <div className="mt-4">
            {data?.find_post_by_userid?.filter(p => !p?.group_post?.groupid)?.map((post, index) => (
              <PostCard post={post as PostDto} key={post?.postid} firstChild={index === 0} />
            ))}
          </div>
        </div>
        <div className="col-span-1"></div>
      </div>
    </>
  );
};

export default ProfilePage;
