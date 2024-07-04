import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Bookmark, Group, Post, Post_Like, User } from "@/generated/types";

export type UserState = {
  user: User | null;
  postReacted: Post_Like[] | [];
  bookmarks: Bookmark[] | [];
  groups: Group[] | [];
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
  addGroup: (group: Group[]) => void;
};

export const useUserStorage = create<UserState & UserActions>()(
  persist(
    (set) => ({
      user: null,
      postReacted: [],
      bookmarks: [],
      groups: [],
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
      addGroup: (group: Group[]) => {
        if(!group.length) {
          return
        }
        set((state) => ({
          groups: [...group, ...state.groups]
        }));
      }
    }),
    { name: "user-store", skipHydration: true }
  )
);
