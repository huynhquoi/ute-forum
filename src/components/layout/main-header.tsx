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
      <div className="fixed top-0 left-0 w-screen bg-white z-50">
        <div className="grid grid-cols-7 border-b-2 h-[56px] mb-4">
          <div className="col-span-1"></div>
          <div className="col-span-5 flex items-center justify-between ">
            <div className="m-0 p-0 flex items-center">
              <Image
                src={"/logo.png"}
                alt="logo uteForum"
                width={48}
                height={48}
              />
              <Input
                placeholder="Tìm kiếm..."
                className="ml-4 w-[400px]"
              ></Input>
            </div>
            <NavigationMenu className="relative left-[-10%]">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href="#" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Trang chủ
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="#" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Chủ đề
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="#" legacyBehavior passHref>
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
              <Button className="mr-4">Đăng bài</Button>
              <Button className="mr-4">N</Button>
              <Image
                src={"/userLogo.png"}
                alt="logo user"
                width={32}
                height={32}
              />
            </div>
          </div>
          <div className="col-span-1"></div>
        </div>
      </div>
    </ApolloWrapper>
  );
};

export default MainHeader;
