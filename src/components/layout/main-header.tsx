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
import { useEffect, useState } from "react";
import { useUserStorage } from "@/lib/store/userStorage";
import UserNotification from "./user-notification";
import UserMessenger from "./user-messeger";
import SearchInput from "./SearchInput";
import ChatAI from "../posts/chat-ai";
import { parseCookies, setCookie } from 'nookies';
import { jwtDecode } from 'jwt-decode';
import { refreshToken } from "@/api/auth";
import { toast } from "../ui/use-toast";
import LogoutAction from "../shared/logout-action";
import { ToastAction } from "@radix-ui/react-toast";

type MainHeaderProps = {
  inUser?: boolean;
};

const MainHeader = ({ inUser }: MainHeaderProps) => {
  const { getItem, setItem } = useStorage();
  const addUser = useUserStorage((state) => state.addUser);
  const addAllPost = useUserStorage((state) => state.addAllPost)
  const addAllBookmark = useUserStorage((state) => state.addAllBookmark)
  const addGroup = useUserStorage((state) => state.addGroup)

  const [isTokenRefreshing, setIsTokenRefreshing] = useState(false);

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

  const { data: adminGroup } = useGetGroupByAdminQuery({
    variables: {
      admin: getItem("userId"),
    }
  })

  const checkAndRefreshToken = async () => {
    const cookies = parseCookies();
    const accessToken = cookies.auth_token;
    const refreshTokenValue = cookies.refresh_token;

    if (!accessToken || !refreshTokenValue) {
      toast({
        title: 'Lỗi',
        description: 'Token không tồn tại',
        variant: 'destructive'
      })
      return;
    }

    try {
      const decodedToken = jwtDecode(accessToken);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp && decodedToken.exp < currentTime) {
        setIsTokenRefreshing(true);
        const response = await refreshToken(refreshTokenValue);

        if (response.accessToken) {
          setItem('access_token', response.accessToken)
          setCookie(null, 'auth_token', response.accessToken, {
            maxAge: 30 * 24 * 60 * 60,
            path: '/',
          });
        }
        setIsTokenRefreshing(false);
      }
    } catch (error: any) {
      toast({
        title: 'Lỗi',
        description: error.message as string,
        variant: 'destructive',
        action: <LogoutAction><ToastAction altText="Đăng xuất">Đăng xuất</ToastAction></LogoutAction>
      })
      setIsTokenRefreshing(false);
      // Handle refresh token failure (e.g., logout user)
    }
  };

  useEffect(() => {
    checkAndRefreshToken();
    // Set up an interval to check the token periodically
    const intervalId = setInterval(checkAndRefreshToken, 5 * 60 * 1000); // Check every 5 minutes

    return () => clearInterval(intervalId);
  }, []);

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
              <SearchInput
                className="ml-4 w-[400px]"
              ></SearchInput>
            </div>
            <NavigationMenu className="relative">
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
