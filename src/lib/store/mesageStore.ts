import { Message, User } from "@/generated/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type MessageState = {
  message: Message | undefined;
  anotherUser: User | undefined;
};

export type MessageActions = {
  addMessage: (messageItem: Message) => void;
  removeMessage: () => void;
  addUser: (another: User) => void;
  removeUser: () => void
};

export const useMessageStore = create<MessageState & MessageActions>()(
  persist(
    (set) => ({
      message: undefined,
      anotherUser: undefined,
      addMessage: (messageItem: Message) => {
        set(() => ({
          message: messageItem,
        }));
      },
      removeMessage: () => {
        set(() => ({
          message: undefined,
        }));
      },
      addUser: (another: User) => {
        set(() => ({
            anotherUser: another
        }))
      },
      removeUser: () => {
        set(() => ({
            anotherUser: undefined
        }))
      }
    }),
    { name: "message-store", skipHydration: true }
  )
);
