"use client";

import PostCard from "@/components/posts/post-card";
import ProfileHeader from "@/components/profile/profile-header";
import { Post, PostDto, User, useGetPostByUserIdQuery } from "@/generated/types";
import useZustandHook from "@/hooks/useZustandHook";
import { UserActions, UserState, useUserStorage } from "@/lib/store/userStorage";

const ProfilePage = () => {
  const userStorage = useZustandHook<UserActions & UserState, User | null>(useUserStorage, (state => state.user))
  const { data, loading, fetchMore } = useGetPostByUserIdQuery({
    variables: {
      userid: userStorage?.userid
    }
  })
  return (
    <>
      <ProfileHeader user={userStorage as User} />
      <div className="grid grid-cols-7 h-[calc(100vh-72px)]">
        <div className="col-span-1"></div>
        <div className="col-span-5">
          {data?.find_post_by_userid?.map(post => (
            <PostCard post={post as PostDto} key={post?.postid} />
          ))}
        </div>
        <div className="col-span-1"></div>
      </div>
    </>
  );
};

export default ProfilePage;
