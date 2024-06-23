"use client";

import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useUserStorage } from "@/lib/store/userStorage";

const UserMenu = () => {
  const router = useRouter();
  const userStorage = useUserStorage((state) => state.user);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="w-8 h-8 rounded-full p-0">
            <Image
              src={"/userLogo.png"}
              alt="logo user"
              width={32}
              height={32}
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 mt-2">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-bold leading-none">
                {userStorage?.fullname}
              </p>
              <p className="text-xs leading-none text-muted-foreground mt-1">
                {userStorage?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              onSelect={() => {
                router.push("/profile");
              }}
            >
              {/* <User className="mr-2 h-4 w-4" /> */}
              <span>Trang cá nhân</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => {
                router.push("/profile/menu/saved");
              }}
            >
              {/* <CreditCard className="mr-2 h-4 w-4" /> */}
              <span>Đã lưu</span>
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                {/* <UserPlus className="mr-2 h-4 w-4" /> */}
                <span>Theo dõi</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem
                    onSelect={() => {
                      router.push("/profile/menu/following");
                    }}
                  >
                    {/* <Mail className="mr-2 h-4 w-4" /> */}
                    <span>Đang theo dõi</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => {
                      router.push("/profile/menu/follower");
                    }}
                  >
                    {/* <MessageSquare className="mr-2 h-4 w-4" /> */}
                    <span>Được theo dõi</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    {/* <MessageSquare className="mr-2 h-4 w-4" /> */}
                    <span>Tìm kiếm...</span>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuItem>
              {/* <Keyboard className="mr-2 h-4 w-4" /> */}
              <span>Cài đặt</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                {/* <UserPlus className="mr-2 h-4 w-4" /> */}
                <span>Diễn đàn</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem
                    onSelect={() => {
                      router.push("/profile/menu/maganer");
                    }}
                  >
                    {/* <Mail className="mr-2 h-4 w-4" /> */}
                    <span>Đang quản lý</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => {
                      router.push("/profile/menu/forum");
                    }}
                  >
                    {/* <MessageSquare className="mr-2 h-4 w-4" /> */}
                    <span>Đang tham gia</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    {/* <MessageSquare className="mr-2 h-4 w-4" /> */}
                    <span>Tìm kiếm...</span>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuItem>
              {/* <Plus className="mr-2 h-4 w-4" /> */}
              <span>Tạo mới diễn đàn</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />
          <DropdownMenuItem>
            {/* <LogOut className="mr-2 h-4 w-4" /> */}
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default UserMenu;
