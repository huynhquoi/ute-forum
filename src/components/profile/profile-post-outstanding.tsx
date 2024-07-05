"use client"

import { PostDto } from "@/generated/types"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader } from "../ui/card"
import ImageCover from "../shared/image-cover"
import Image from "next/image"
import Link from "next/link"


type ProfilePostOutstandingProps = {
  post: PostDto[]
}

const ProfilePostOutstanding = ({ post }: ProfilePostOutstandingProps) => {
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
    <Card className="mt-4 mr-4 rounded-md shadow-none">
      <CardHeader className="pb-4">
        <span className="font-bold text-xl">Bài viết nổi bật </span>
      </CardHeader>
      <CardContent className=" flex items-center justify-center mr-3 mt-4">
        <Carousel className="w-[80%]">
          <CarouselContent>
            {post?.length ? postItem.map((item, index) => {
              if (index < 3) {
                return (
                  <CarouselItem key={item?.postid}>
                    <Link href={`/post/${item?.postid}`} className="hover:cursor-pointer">
                      <Card className="p-0 relative border-none shadow-none">
                        <ImageCover image={item?.image || ""} height={0} />
                        <div className="absolute w-full bottom-0 left-0 h-12 bg-white opacity-40 rounded-md flex items-center justify-center font-bold text-xl">
                          {item?.title}
                        </div>
                      </Card>
                    </Link>
                  </CarouselItem>
                )
              }
            }) : <></>}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </CardContent>
    </Card>
  </>
}

export default ProfilePostOutstanding