import { create } from "zustand";
import { User } from "@/generated/types";
import { persist } from "zustand/middleware";

export type UserState = {
  user: User | null;
};

export type UserActions = {
  addUser: (user: User) => void;
  removeUser: () => void;
};

export const useUserStorage = create<UserState & UserActions>()(
  persist(
    (set) => ({
      user: null,
      addUser: (userInfo: User) => {
        set(() => ({
          user: userInfo,
        }));
      },
      removeUser: () => {
        set(() => ({
          user: null,
        }));
      },
    }),
    { name: "user-store", skipHydration: true }
  )
);
