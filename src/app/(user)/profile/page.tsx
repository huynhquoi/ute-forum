"use client";

import ProfileHeader from "@/components/profile/profile-header";
import { User } from "@/generated/types";
import { useUserStorage } from "@/lib/store/userStorage";

const ProfilePage = () => {
  const userStorage = useUserStorage((state) => state.user);

  return (
    <>
      <ProfileHeader user={userStorage as User} />
    </>
  );
};

export default ProfilePage;
