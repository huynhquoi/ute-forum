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

const MainHeader = () => {
  return (
    <ApolloWrapper>
      <div className="h-[56px] flex items-center justify-between px-[64px] border-b-2 mb-4">
        <div className="m-0 p-0 flex items-center">
          <Image src={"/logo.png"} alt="logo uteForum" width={48} height={48} />
          <Input placeholder="Tìm kiếm..." className="ml-4 w-[400px]"></Input>
        </div>
        <NavigationMenu className="relative left-[-10%]">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="#" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Trang chủ
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="#" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Chủ đề
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="#" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Diễn đàn
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="m-0 p-0 flex items-center">
          <Button className="mr-4">Đăng bài</Button>
          <Button className="mr-4">N</Button>
          <Image src={"/userLogo.png"} alt="logo user" width={32} height={32} />
        </div>
      </div>
    </ApolloWrapper>
  );
};

export default MainHeader;
