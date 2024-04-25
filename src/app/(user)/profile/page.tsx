"use client";

import ProfileHeader from "@/components/profile/profile-header";
import { User } from "@/generated/types";
import useZustandHook from "@/hooks/useZustandHook";
import { UserActions, UserState, useUserStorage } from "@/lib/store/userStorage";

const ProfilePage = () => {
  const userStorage = useZustandHook<UserActions & UserState, User | null>(useUserStorage, (state => state.user))

  return (
    <>
      <ProfileHeader user={userStorage as User} />
    </>
  );
};

export default ProfilePage;
