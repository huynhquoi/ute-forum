import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Bookmark, Post, Post_Like, User } from "@/generated/types";

export type UserState = {
  user: User | null;
  postReacted: Post_Like[] | [];
  bookmarks: Bookmark[] | [];
};

export type UserActions = {
  addUser: (user?: User) => void;
  removeUser: () => void;
  addAllPost: (allPost: Post_Like[]) => void;
  addPost: (post: Post_Like) => void;
  removePost: (post: Post_Like) => void;
  addAllBookmark: (allBookmark: Bookmark[]) => void;
  addBookmark: (bookmark: Bookmark) => void;
  removeBookmark: (bookmark: Bookmark) => void;
};

export const useUserStorage = create<UserState & UserActions>()(
  persist(
    (set) => ({
      user: null,
      postReacted: [],
      bookmarks: [],
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
      addAllBookmark: (allBookmark: Bookmark[]) => {
        set(() => ({
          bookmarks: [...allBookmark]
        }));
      },
      addBookmark: (bookmark: Bookmark) => {
        set((state) => ({
          bookmarks: [bookmark, ...state.bookmarks]
        }));
      },
      removeBookmark: (bookmark: Bookmark) => {
        set((state) => ({
          bookmarks: state.bookmarks?.filter(
            (item) => item?.bookmarkid !== bookmark?.bookmarkid
          ),
        }));
      },
    }),
    { name: "user-store", skipHydration: true }
  )
);
