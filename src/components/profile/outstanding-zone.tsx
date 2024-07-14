"use client"

import { PostDto, Topic, useGetTopHightReputationUserQuery, User } from "@/generated/types"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader } from "../ui/card"
import ImageCover from "../shared/image-cover"
import Image from "next/image"
import Link from "next/link"
import { ArrowDownCircle, ArrowUpCircle, Eye, Flame, Increase } from "../svgs"
import Autoplay from "embla-carousel-autoplay"
import UserDisplay from "../users/user-display"
import { ScrollArea } from "../ui/scroll-area"


type OutstandingZoneProps = {
  post: PostDto[],
  topic: Topic[],
}

const OutstandingZone = ({ post, topic }: OutstandingZoneProps) => {
  const [postItem, setPostItem] = useState<PostDto[]>([])

  useEffect(() => {
    if (postItem?.length) {
      return
    }
    if (!post?.length) {
      return
    }
    const array = [...post]
    setPostItem(array.sort((a, b) => (b?.totallike as number) - (a?.totallike as number)))
  }, [post, postItem?.length])

  const { data } = useGetTopHightReputationUserQuery()

  return <>
    <Card className="ml-4 rounded-md shadow-none border-none">
      <CardHeader className="pb-2 pt-2">
        <span className="font-bold text-xl">Bài viết nổi bật </span>
      </CardHeader>
      <CardContent className=" flex items-center justify-center mr-3">
        <Carousel
          className="w-full"
          plugins={[
            Autoplay({
              delay: 8000,
            })
          ]}
        >
          <CarouselContent>
            {post?.length ? postItem?.sort((a, b) => (b.totallike as number) - (a.totallike as number))?.map((item, index) => {
              if (index < 3) {
                return (
                  <CarouselItem key={item?.postid}>
                    <Link href={`/post/${item?.postid}`} className="hover:cursor-pointer">
                      <Card className="p-0 rounded-lg relative shadow-none flex flex-col items-start">
                        <div className="w-full">
                          <ImageCover image={item?.image || ""} height={200} />
                        </div>
                        <div className="pt-2 mt-2 w-[50%] p-3 space-y-2">
                          <UserDisplay user={item?.user_post as User} />
                          <div className="text-xl font-bold">
                            {item?.title}
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <p>{item?.totalread}</p>
                              <Eye className="text-xl" />
                            </div>
                            <div className="flex items-center space-x-2">
                              <p>{item?.totallike}</p>
                              <ArrowUpCircle className="text-xl" />
                            </div>
                            <div className="flex items-center space-x-2">
                              <p>{item?.totaldislike}</p>
                              <ArrowDownCircle className="text-xl" />
                            </div>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  </CarouselItem>
                )
              }
            }) : <></>}
          </CarouselContent>
          <CarouselPrevious className="left-[84%] -top-10 translate-y-0" />
          <CarouselNext className="ml-10 right-0 -top-10 translate-y-0" />
        </Carousel>
      </CardContent>
    </Card>
    <Card className="ml-4 mt-4 rounded-md shadow-none border-none">
      <CardHeader className="pb-4 pt-0">
        <span className="font-bold text-xl">Top Hight Reputation</span>
      </CardHeader>
      <CardContent className=" flex flex-col space-y-2 pb-0 mr-3">
        <ScrollArea className="w-full h-[100%-544px] pr-2">
          {data?.get_top_reputation_user?.map((u, index) => (
            <div key={index} className=" mb-2">
              <Card>
                <CardContent className="flex items-center justify-between p-6">
                  <div className="flex items-center space-x-4">
                    <p className="text-xl font-bold">{index + 1}</p>
                    <UserDisplay user={u as User} />
                  </div>
                  <div className="font-bold flex items-center">
                    <p>{u?.reputation}</p>
                    <Flame className="text-2xl text-red-500" />
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  </>
}

export default OutstandingZone