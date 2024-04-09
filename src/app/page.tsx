"use client";

import PostZone from "@/components/posts/post-zone";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main>
      <div className="grid grid-cols-5 h-screen">
        <div className="col-span-3 flex min-h-screen flex-col items-center">
          <div className="flex justify-start w-full mb-2">
            <Button
              variant={"secondary"}
              className="rounded-full text-sm mr-2 hover:bg-black hover:text-white"
            >
              Dành cho bạn
            </Button>
            <Button
              variant={"secondary"}
              className="rounded-full text-sm  hover:bg-black hover:text-white"
            >
              Đang theo dõi
            </Button>
          </div>
          <PostZone />
        </div>
        <div className="col-span-2"></div>
      </div>
    </main>
  );
}
