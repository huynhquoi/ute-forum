"use client";

import { ApolloWrapper } from "@/lib/ApolloWrapper";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import Link from "next/link";
import Image from "next/image";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import UserMenu from "../users/user-menu";
import { Bookmark, Group, Post, Post_Like, useGetAccountByPkQuery, useGetGroupByAdminQuery, useGetGroupByUserIdQuery, useGetPostBookmarkByUserIdQuery, useGetPostReactedByUserIdQuery, User } from "@/generated/types";
import useStorage from "@/hooks/useStorage";
import { useEffect } from "react";
import { useUserStorage } from "@/lib/store/userStorage";
import UserNotification from "./user-notification";
import UserMessenger from "./user-messeger";

type MainHeaderProps = {
  inUser?: boolean;
};

const MainHeader = ({ inUser }: MainHeaderProps) => {
  const { getItem, setItem } = useStorage();
  const addUser = useUserStorage((state) => state.addUser);
  const addAllPost = useUserStorage((state) => state.addAllPost)
  const addAllBookmark = useUserStorage((state) => state.addAllBookmark)
  const addGroup = useUserStorage((state) => state.addGroup)

  const { data, loading, fetchMore } = useGetAccountByPkQuery({
    variables: {
      userId: getItem("userId"),
    },
  });

  const { data: postReacted } = useGetPostReactedByUserIdQuery({
    variables: {
      userid: getItem("userId"),
    }
  })

  const { data: bookmarks } = useGetPostBookmarkByUserIdQuery({
    variables: {
      userid: getItem("userId"),
    }
  })

  const { data: groups } = useGetGroupByUserIdQuery({
    variables: {
      userid: getItem("userId"),
    }
  })

  const {data: adminGroup} = useGetGroupByAdminQuery({
    variables: {
      admin: getItem("userId"),
    }
  })
  useEffect(() => {
    if (loading || !data?.find_account_by_id?.userid) {
      return;
    }
    addUser(data?.find_account_by_id as User);
    addAllPost(postReacted?.find_postlike_byuserid as Post_Like[] || [])
    addAllBookmark(bookmarks?.find_all_bookmark_by_userid as Bookmark[] || [])
    addGroup(groups?.get_group_by_userid as Group[])
    addGroup(adminGroup?.get_group_by_admin as Group[])
  }, [loading, data?.find_account_by_id?.userid, addUser, data?.find_account_by_id, addAllPost, postReacted?.find_postlike_byuserid, addAllBookmark, bookmarks?.find_all_bookmark_by_userid, addGroup, groups?.get_group_by_userid, adminGroup?.get_group_by_admin])
  return (
    <ApolloWrapper>
      <div className={inUser ? "mb-[56px]" : "mb-[72px]"}></div>
      <div className="fixed top-0 left-0 w-screen bg-white z-50">
        <div
          className={`grid grid-cols-7 border-b-2 h-[56px] ${inUser ? "" : "mb-4"
            }`}
        >
          <div className="col-span-1"></div>
          <div className="col-span-5 flex items-center justify-between ">
            <div className="m-0 p-0 flex items-center">
              <Link href={"/home"}>
                <Image
                  src={"/logo.png"}
                  alt="logo uteForum"
                  width={48}
                  height={48}
                />
              </Link>
              <Input
                placeholder="Tìm kiếm..."
                className="ml-4 w-[400px]"
              ></Input>
            </div>
            <NavigationMenu className="relative left-[-10%]">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href="/home" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Trang chủ
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/topic" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Chủ đề
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/forum" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Diễn đàn
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <div className="m-0 p-0 flex items-center">
              {inUser ? <></> : <Link href={"/create-post"}><Button className="mr-4">Đăng bài</Button></Link>}
              <UserMessenger />
              <UserNotification />
              <UserMenu />
            </div>
          </div>
          <div className="col-span-1"></div>
        </div>
      </div>
    </ApolloWrapper>
  );
};

export default MainHeader;
