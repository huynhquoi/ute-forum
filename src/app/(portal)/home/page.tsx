"use client";

import PostFollowZone from "@/components/posts/post-follow-zone";
import PostOutstanding from "@/components/posts/post-outstanding";
import PostZone from "@/components/posts/post-zone";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const HomePage = () => {
  return (
    <>
      <div className="grid grid-cols-5 h-[calc(100vh-72px)]">
        <div className="col-span-3 flex min-h-[calc(100vh-72px)] flex-col items-center">
          <Tabs defaultValue="post" className="w-full">
            <div className="flex items-center justify-center">
              <TabsList>
                <TabsTrigger value="post">Dành cho bạn</TabsTrigger>
                <TabsTrigger value="follow">Đang theo dõi</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="post">
              <PostZone />
            </TabsContent>
            <TabsContent value="follow">
              <PostFollowZone />
            </TabsContent>
          </Tabs>
        </div>
        <div className="col-span-2 pl-4">
          <PostOutstanding />
        </div>
      </div>
    </>
  );
};

export default HomePage;
