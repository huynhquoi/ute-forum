"use client";

import PostCard from "@/components/posts/post-card";
import ProfileHeader from "@/components/profile/profile-header";
import ProfileInfo from "@/components/profile/profile-info";
import ProfilePostOutstanding from "@/components/profile/profile-post-outstanding";
import { Post, PostDto, User, useGetAccountByPkQuery, useGetPostByUserIdQuery } from "@/generated/types";
import useZustandHook from "@/hooks/useZustandHook";
import { UserActions, UserState, useUserStorage } from "@/lib/store/userStorage";
import { useParams } from "next/navigation";

const ProfilePage = () => {
  const param = useParams()
  const {data: user} = useGetAccountByPkQuery({
    variables: {
      userId: param?.userId as string
    }
  })
  const { data, loading, fetchMore } = useGetPostByUserIdQuery({
    variables: {
      userid: param?.userId as string
    }
  })
  return (
    <>
      {loading ? <></> :
        <>
          <ProfileHeader user={user?.find_account_by_id as User} />
          <div className="grid grid-cols-7 h-[calc(100vh-72px)]">
            <div className="col-span-1"></div>
            <div className="col-span-2">
              <ProfileInfo user={user?.find_account_by_id as User} />
              <ProfilePostOutstanding post={data?.find_post_by_userid as PostDto[]} />
            </div>
            <div className="col-span-3">
              <div className="mt-4">
                {data?.find_post_by_userid?.map((post, index) => (
                  <PostCard post={post as PostDto} key={post?.postid} firstChild={index === 0} />
                ))}
              </div>
            </div>
            <div className="col-span-1"></div>
          </div>
        </>}
    </>
  );
};

export default ProfilePage;
