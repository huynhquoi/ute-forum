"use client"

import { ApolloWrapper } from "@/lib/ApolloWrapper"
import Image from "next/image"
import Link from "next/link"
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "../ui/navigation-menu"
import { Button } from "../ui/button"
import UserMenu from "../users/user-menu"
import UserNotification from "./user-notification"
import UserMessenger from "./user-messeger"
import { useGetAccountByPkQuery, User } from "@/generated/types"
import useStorage from "@/hooks/useStorage"
import { useUserStorage } from "@/lib/store/userStorage"
import { useEffect } from "react"

const AdminHeader = () => {
    const { getItem, setItem } = useStorage();
    const { addUser } = useUserStorage()
    const { data, loading, fetchMore } = useGetAccountByPkQuery({
        variables: {
            userId: getItem("userId"),
        },
    });

    useEffect(() => {
        if (loading || !data?.find_account_by_id?.userid) {
            return;
        }
        addUser(data?.find_account_by_id as User);
    }, [addUser, data?.find_account_by_id, loading])
    return (
        <ApolloWrapper>
            <div className={"mb-[72px]"}></div>
            <div className="fixed top-0 left-0 w-screen bg-white z-50">
                <div
                    className={`grid grid-cols-7 border-b-2 h-[56px] "mb-4"
                        `}
                >
                    <div className="col-span-1"></div>
                    <div className="col-span-5 flex items-center justify-between ">
                        <Link href={"/home"}>
                            <Image
                                src={"/logo.png"}
                                alt="logo uteForum"
                                width={48}
                                height={48}
                            />
                        </Link>
                        <NavigationMenu className="relative left-[-10%] max-w-none">
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <Link href="/user-manager" legacyBehavior passHref>
                                        <NavigationMenuLink
                                            className={navigationMenuTriggerStyle()}
                                        >
                                            Người dùng
                                        </NavigationMenuLink>
                                    </Link>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <Link href="/post-manager" legacyBehavior passHref>
                                        <NavigationMenuLink
                                            className={navigationMenuTriggerStyle()}
                                        >
                                            Bài viết
                                        </NavigationMenuLink>
                                    </Link>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <Link href="/forum-manager" legacyBehavior passHref>
                                        <NavigationMenuLink
                                            className={navigationMenuTriggerStyle()}
                                        >
                                            Diễn đàn
                                        </NavigationMenuLink>
                                    </Link>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <Link href="/report-manager" legacyBehavior passHref>
                                        <NavigationMenuLink
                                            className={navigationMenuTriggerStyle()}
                                        >
                                            Report
                                        </NavigationMenuLink>
                                    </Link>
                                </NavigationMenuItem>
                                {/* <NavigationMenuItem>
                                    <Link href="/analyst-manager" legacyBehavior passHref>
                                        <NavigationMenuLink
                                            className={navigationMenuTriggerStyle()}
                                        >
                                            Thống kê
                                        </NavigationMenuLink>
                                    </Link>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <Link href="/settings" legacyBehavior passHref>
                                        <NavigationMenuLink
                                            className={navigationMenuTriggerStyle()}
                                        >
                                            Cài đặt
                                        </NavigationMenuLink>
                                    </Link>
                                </NavigationMenuItem> */}
                            </NavigationMenuList>
                        </NavigationMenu>
                        <div className="m-0 p-0 flex items-center">
                            <Link href={"/create-post"}><Button className="mr-4">Đăng bài</Button></Link>
                            <UserMessenger />
                            <UserNotification />
                            <UserMenu />
                        </div>
                    </div>
                    <div className="col-span-1"></div>
                </div>
            </div>
        </ApolloWrapper>
    )
}

export default AdminHeader