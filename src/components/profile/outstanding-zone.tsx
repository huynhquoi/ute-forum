"use client"

import { PostDto, Topic } from "@/generated/types"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader } from "../ui/card"
import ImageCover from "../shared/image-cover"
import Image from "next/image"
import Link from "next/link"
import { Increase } from "../svgs"
import Autoplay from "embla-carousel-autoplay"


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

  return <>
    <Card className="ml-4 rounded-md shadow-none border-none">
      <CardHeader className="pb-2 pt-2">
        <span className="font-bold text-xl">Bài viết nổi bật </span>
      </CardHeader>
      <CardContent className=" flex items-center justify-center mr-3 mt-4">
        <Carousel 
        className="w-full"
        plugins={[
          Autoplay({
            delay: 2000,
          })
        ]}
        >
          <CarouselContent>
            {post?.length ? postItem.map((item, index) => {
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
          <CarouselPrevious className="left-auto top-auto translate-y-0" />
          <CarouselNext className="ml-10 right-auto top-auto translate-y-0" />
        </Carousel>
      </CardContent>
    </Card>
    <Card className="ml-4 mt-4 rounded-md shadow-none border-none">
      <CardHeader className="pb-4 pt-0">
        <span className="font-bold text-xl">Chủ đề hot</span>
      </CardHeader>
      <CardContent className=" flex flex-col space-y-2 pb-0">
        {topic?.map((item, index) => {
          if (index < 3) {
            return <>
              <Card key={index} className="w-full">
                <CardHeader className="pb-0"></CardHeader>
                <CardContent className="flex items-center justify-between">
                  <div className="font-bold">
                    {item?.topicname}
                  </div>
                  <div className=" flex items-center">
                    1056
                    <Increase className="text-2xl text-green-500 ml-3" />
                  </div>
                </CardContent>
              </Card>
            </>
          }
        })}
      </CardContent>
    </Card>
  </>
}

export default OutstandingZone