import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Post, Post_Like, User } from "@/generated/types";

export type UserState = {
  user: User | null;
  postReacted: Post_Like[] | [];
};

export type UserActions = {
  addUser: (user?: User) => void;
  removeUser: () => void;
  addAllPost: (allPost: Post_Like[]) => void;
  addPost: (post: Post_Like) => void;
  removePost: (post: Post_Like) => void;
};

export const useUserStorage = create<UserState & UserActions>()(
  persist(
    (set) => ({
      user: null,
      postReacted: [],
      addUser: (userInfo?: User) => {
        set(() => ({
          user: userInfo || null,
        }));
      },
      removeUser: () => {
        set(() => ({
          user: null,
        }));
      },
      addAllPost: (allPost: Post_Like[]) => {
        set(() => ({
          postReacted: [...allPost],
        }));
      },
      addPost: (post: Post_Like) => {
        set((state) => ({
          postReacted: [...state?.postReacted, post],
        }));
      },
      removePost: (post: Post_Like) => {
        set((state) => ({
          postReacted: state?.postReacted?.filter(
            (item) =>
              item?.post_postlike?.postid !== post?.post_postlike?.postid
          ),
        }));
      },
    }),
    { name: "user-store", skipHydration: true }
  )
);
