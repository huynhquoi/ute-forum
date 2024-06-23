"use client"

import PostCard from "@/components/posts/post-card"
import { Bell, Logout, Plus } from "@/components/svgs"
import { Button } from "@/components/ui/button"
import { Card, CardFooter, CardHeader } from "@/components/ui/card"
import { PostDto, useGetGroupByGroupIdQuery, useGetPostbyGroupIdQuery } from "@/generated/types"
import useScroll from "@/hooks/useScroll"
import { useUserStorage } from "@/lib/store/userStorage"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"

const ForumDetailPage = () => {
  const { scrollY, scrollDirection, lastScrollY } = useScroll();
  const showFullHeader = scrollDirection === 'up' && scrollY < 40;

  const param = useParams()
  const authStorage = useUserStorage(state => state.user)
  const { data, loading } = useGetGroupByGroupIdQuery({
    variables: {
      groupid: parseInt(param.forumId as string)
    }
  })

  const { data: groupPost, loading: loadPosts } = useGetPostbyGroupIdQuery({
    variables: {
      groupid: parseInt(param.forumId as string)
    }
  })
  return <>
    <div className="bg-white">
      <div className={`fixed top-[72px] w-[calc(100%*5/7)] z-50`}>
        {!loading && <Card className="h-36">
          <CardHeader className={`h-18 flex justify-center items-center ${showFullHeader ? 'visible' : 'invisible'}`}>
            <div className="text-2xl font-bold">{data?.get_group_by_groupid?.groupname}</div>
          </CardHeader>
          <CardFooter className={`flex justify-center items-end p-0 pb-2 transition-transform duration-300 ${!showFullHeader && 'transform -translate-y-[72px]'}`}>
            <div className={`flex items-end absolute z-10 justify-between w-full transition-transform duration-300 ${!showFullHeader && 'transform px-4'}`}>
              <div className=" flex items-end space-x-2">
                <Link href={`/create-post/${param.forumId}`}><Button><Plus className="text-2xl mr-2" />Đăng bài</Button></Link>
                <Button><Bell className="text-2xl text-white" /></Button>
              </div>
              <div className="">
                {data?.get_group_by_groupid?.user_group?.userid === authStorage?.userid && <Button>Chỉnh sửa nhóm</Button>}
                <Button variant={"outline"} className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white ml-2">
                  Rời nhóm
                  <Logout className="text-2xl ml-2" />
                </Button>
              </div>
            </div>
            <Image src={'/group.png'} alt="Group Image" height={124} width={124} className="rounded-full border-blue-400 border-4" />

          </CardFooter>
        </Card>}
      </div>
      <div className="mb-52"></div>
    </div>
    <div className="grid grid-cols-7 h-[calc(100vh-72px)]">
      <div className="col-span-4">
        <div className="mt-4">
          {!loadPosts && groupPost?.find_post_in_group?.map((post, index) => <PostCard post={post as PostDto} key={index} firstChild={index === 0} />)}
        </div>
      </div>
      <div className="col-span-3"></div>
    </div>
  </>
}

export default ForumDetailPage