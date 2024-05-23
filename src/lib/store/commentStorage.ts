import { Comment, useGetCommentByPostIdQuery } from "@/generated/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CommentState = {
  comments: Comment[] | [];
};

export type CommentActions = {
  addPostComment: (comments: Comment[]) => void;
  addComment: (comment: Comment) => void;
  removeComment: (comment: Comment) => void;
  removePostComment: () => void;
};


export const useCommentStorage = create<CommentState & CommentActions>()(
  persist(
    (set) => ({
      comments: [],
      addComment: (comment: Comment) => {
        set((state) => ({
          comments: [comment, ...state.comments]
        }))
      },
      addPostComment: (postComments: Comment[]) => {
        set(() => ({
          comments: [...postComments]
        }))
      },
      removeComment: (comment: Comment) => {
        set((state) => ( {
          comments: state?.comments?.filter((item) => {
            item?.commentid !== comment?.commentid
          })
        }))
      },
      removePostComment: () => {
        set(() => ({
          comments: []
        }))
      }, 
    }),
    { name: "comment-store", skipHydration: true }
  )
)