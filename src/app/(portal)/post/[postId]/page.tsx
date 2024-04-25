"use client";

import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import UserDisplay from "@/components/users/user-display";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import PostAuth from "@/components/posts/post-auth";

const PostDetail = () => {
  const param = useParams();
  return (
    <>
      <div className="w-full flex justify-between min-h-[calc(100vh-72px)]">
        <div className="w-16">
          <div className="flex flex-col items-center h-60 justify-between mt-16">
            <Button
              variant={"ghost"}
              className="rounded-full shadow-none flex flex-col items-center h-12"
            >
              <Image
                src={"/arrow-up-circle.png"}
                alt="like"
                width={24}
                height={24}
              />
              <p className="text-sm">1000</p>
            </Button>
            <Button
              variant={"ghost"}
              className="rounded-full shadow-none flex flex-col items-center h-12"
            >
              <Image
                src={"/arrow-down-circle.png"}
                alt="like"
                width={24}
                height={24}
              />
              <p className="text-sm">1000</p>
            </Button>
            <Button
              variant={"ghost"}
              className="rounded-full shadow-none flex flex-col items-center h-12"
            >
              <Image src={"/bookmark.svg"} alt="like" width={24} height={24} />
              <p className="text-sm">126</p>
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-3 w-[calc(100%-80px)]">
          <div className="col-span-2">
            <ScrollArea className="w-full h-[calc(100vh-72px)]">
              <Image
                src={"/loginpage.jpg"}
                alt="Textpage"
                className="rounded-t-md"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100% !important", height: "auto" }}
              />
              <Card className="rounded-none shadow-none">
                <CardHeader>
                  <UserDisplay />
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold mb-2">
                    Sử dụng thẻ sinh viên một cách đúng đắn, bạn đã thử?
                  </p>
                  <div className="flex items-center mb-2">
                    <Badge className="mr-2">Học tập</Badge>
                    <Badge>Sinh viên</Badge>
                  </div>
                  <div className="">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec vel enim quis odio lacinia efficitur eu vel justo. Sed
                    id scelerisque enim. Interdum et malesuada fames ac ante
                    ipsum primis in faucibus. Praesent convallis urna et mollis
                    elementum. Donec id tincidunt tortor. In consectetur
                    accumsan suscipit. Mauris porttitor, lectus vel consequat
                    varius, arcu magna bibendum neque, non tristique nibh risus
                    sed odio. Nunc at aliquam purus. Praesent tellus magna,
                    pulvinar at libero et, pharetra porttitor justo. Nulla
                    efficitur purus id ligula molestie, gravida ultricies felis
                    eleifend. Aliquam erat volutpat. Duis ac neque quis neque
                    vehicula egestas. Quisque interdum ullamcorper eros, sit
                    amet consequat augue hendrerit dignissim. Fusce dignissim,
                    ligula sit amet pellentesque blandit, nisi velit auctor
                    turpis, et dictum quam sapien in metus. Aliquam et purus
                    quis nisi venenatis sagittis auctor et velit. Sed eleifend
                    sapien in dolor imperdiet, at semper nibh iaculis. Ut
                    iaculis nunc nibh, ut volutpat odio vehicula sed. Sed rutrum
                    arcu sem, porttitor consectetur ex porta eget. Donec rutrum
                    lacus vulputate elementum mattis. Aliquam facilisis orci
                    magna, semper viverra enim convallis sit amet. Duis commodo
                    porttitor iaculis. Vivamus vulputate imperdiet quam quis
                    facilisis. Curabitur sed turpis id nisi pharetra tempus et
                    at urna. Vivamus a est est. Nam sed efficitur nibh. Fusce
                    neque lectus, commodo at urna pulvinar, tempor convallis
                    ante. Sed eu bibendum nulla. Nulla facilisi. Integer tempus
                    eleifend lorem, et pellentesque sapien pretium non.
                    Curabitur tempus est quam, in suscipit elit ullamcorper
                    eget. Etiam condimentum mauris a dolor lacinia, feugiat
                    varius mauris facilisis. In vulputate, nulla eu consectetur
                    vestibulum, purus felis tincidunt quam, euismod congue
                    lectus sem vitae ante. Nunc bibendum urna eu fringilla
                    venenatis. Sed vestibulum velit tellus, sit amet molestie
                    nisi congue sed. Duis a tristique ligula. Ut iaculis, erat
                    et volutpat semper, risus velit pharetra turpis, in
                    tincidunt velit nisl id turpis. Vivamus pulvinar laoreet
                    nulla eget facilisis. Vestibulum tristique, velit et
                    pulvinar ultricies, lacus magna hendrerit ipsum, at tempor
                    lorem eros consequat ipsum. Maecenas nunc orci, bibendum
                    lobortis ipsum at, tempor pellentesque nisl. Integer vitae
                    dui sit amet dolor efficitur porttitor ac sed augue. Cras
                    elementum arcu eget est imperdiet, in pharetra leo feugiat.
                    Pellentesque pellentesque, felis vitae aliquet blandit, arcu
                    erat viverra ex, eleifend placerat arcu eros vitae ante.
                    Vestibulum maximus, orci quis ullamcorper pellentesque, enim
                    dui gravida tellus, a aliquet diam lectus porta elit. In in
                    porttitor odio. Suspendisse consequat, mauris id tristique
                    pharetra, ex enim sodales ex, eget bibendum sapien nunc non
                    ligula. Nulla facilisi. Sed pharetra leo et eros ultrices,
                    eget dictum mauris tincidunt. Vivamus suscipit, lorem sed
                    hendrerit pellentesque, tortor lacus dignissim metus, ac
                    interdum augue est a mauris. Quisque nisl tortor, efficitur
                    eget dui non, maximus imperdiet urna. Donec ultricies odio
                    vitae fringilla varius. Pellentesque habitant morbi
                    tristique senectus et netus et malesuada fames ac turpis
                    egestas. Mauris varius nec felis porttitor fringilla. Aenean
                    finibus fermentum velit, vel imperdiet tellus suscipit vel.
                    Proin dictum tincidunt ligula, sit amet condimentum augue
                    aliquam ac. Proin sodales venenatis ante, non euismod enim
                    pretium vel. Nulla imperdiet, ex id mattis interdum, ante
                    metus suscipit massa, id molestie justo risus eu turpis.
                    Fusce eget tincidunt augue. Vestibulum nec tincidunt quam.
                    Fusce eleifend malesuada convallis.
                  </div>
                </CardContent>
              </Card>
              <p className="my-4 text-xl font-bold">
                Bình luận <span className="text-lg text-gray-400">126</span>
              </p>
            </ScrollArea>
          </div>
          <div className="col-span-1">
            <PostAuth />
          </div>
        </div>
      </div>
    </>
  );
};

export default PostDetail;
