"use client"

import { PostDto, Topic, useGetTopHightReputationUserQuery, User } from "@/generated/types"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader } from "../ui/card"
import ImageCover from "../shared/image-cover"
import Image from "next/image"
import Link from "next/link"
import { Flame, Increase } from "../svgs"
import Autoplay from "embla-carousel-autoplay"
import UserDisplay from "../users/user-display"


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
              delay: 4000,
            })
          ]}
        >
          <CarouselContent>
            {post?.length ? postItem?.sort((a, b) => (a.totallike as number) - (b.totallike as number))?.map((item, index) => {
              if (index < 3) {
                return (
                  <CarouselItem key={item?.postid}>
                    <Link href={`/post/${item?.postid}`} className="hover:cursor-pointer">
                      <Card className="p-0 relative border-none shadow-none">
                        <ImageCover image={item?.image || ""} height={0} />
                        <div className="absolute w-full bottom-0 left-0 h-12 rounded-md bg-black opacity-40"></div>
                        <div className="absolute w-full bottom-0 left-0 h-12 rounded-md flex items-center justify-center font-bold text-xl text-white">
                          {item?.title}
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
        <Carousel
          opts={{
            align: "start",
          }}
          orientation="vertical"
          className="w-full"
          plugins={[
            Autoplay({
              delay: 4000,
            })
          ]}
        >
          <CarouselContent className="-mt-1 h-[200px]">
            {data?.get_top_reputation_user?.map((u, index) => (
              <CarouselItem key={index} className="pt-1 md:basis-1/2">
                <div className="">
                  <Card>
                    <CardContent className="flex items-center justify-between p-6">
                      <UserDisplay user={u as User} />
                      <div className="font-bold flex items-center">
                        <p>{u?.reputation}</p>
                        <Flame className="text-2xl text-red-500" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="right-0 left-[80%] -top-11 translate-x-1/2" />
          <CarouselNext className="ml-10 right-0 left-[80%] -top-11 translate-x-1/2" />
        </Carousel>
      </CardContent>
    </Card>
  </>
}

export default OutstandingZone