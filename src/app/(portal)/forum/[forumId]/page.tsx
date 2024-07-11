"use client"

import DetailGroup from "@/components/admin/detail-group"
import ForumForm from "@/components/forum/forum-form"
import ForumRequest from "@/components/forum/forum-request"
import PostCard from "@/components/posts/post-card"
import { Bell, Login, Logout, Plus } from "@/components/svgs"
import { Button } from "@/components/ui/button"
import { Card, CardFooter, CardHeader } from "@/components/ui/card"
import { Group, PostDto, useGetGroupByGroupIdQuery, useGetPostbyGroupIdQuery, useJoinGroupMutation, useLeaveGroupMutation } from "@/generated/types"
import useScroll from "@/hooks/useScroll"
import useStorage from "@/hooks/useStorage"
import { useUserStorage } from "@/lib/store/userStorage"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useState } from "react"

const ForumDetailPage = () => {
  const { scrollY, scrollDirection, lastScrollY } = useScroll();
  const showFullHeader = scrollDirection === 'up' && scrollY < 40;
  const [requested, setRequested] = useState(false)
  const [out, setOut] = useState(false)
  const param = useParams()
  const authStorage = useUserStorage(state => state.user)
  const {getItem} = useStorage()
  const groups = useUserStorage(state => state.groups)
  const [joinGroup] = useJoinGroupMutation()
  const [leaveGroup] = useLeaveGroupMutation()
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

  const handleJoinGroup = () => {
    if (requested) {
      return
    }
    joinGroup({
      variables: {
        groupid: parseInt(param.forumId as string),
        userid: getItem('userId')
      }
    }).then(() => setRequested(true))
  }

  const handleLeaveGroup = () => {
    if (out) {
      return
    }
    leaveGroup({
      variables: {
        groupid: parseInt(param.forumId as string),
        userid: getItem('userId')
      }
    }).then(() => setOut(true))
  }
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
                {data?.get_group_by_groupid?.user_group?.userid === getItem('userId') ? <div className="space-x-2">
                  <ForumForm forum={data?.get_group_by_groupid as Group} />
                  <ForumRequest forumId={data?.get_group_by_groupid?.groupid as number} />
                </div>
                  : <>
                    {groups?.find(g => g.groupid === parseInt(param.forumId as string))
                      ? <Button variant={"outline"} className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white ml-2">
                        Rời nhóm
                        <Logout className="text-2xl ml-2" />
                      </Button>
                      : <Button
                        variant={"outline"}
                        className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white ml-2"
                        onClick={() => {
                          handleJoinGroup()
                        }}>
                        {requested ? 'Đã yêu cầu' : 'Vào nhóm'}
                        <Login className="text-2xl ml-2" />
                      </Button>}
                  </>}
              </div>
            </div>
            <Image src={data?.get_group_by_groupid?.image || '/group.png'} alt="Group Image" height={124} width={124} className="rounded-full border-blue-400 border-4" />

          </CardFooter>
        </Card>}
      </div>
      <div className="mb-52"></div>
    </div>
    <div className="grid grid-cols-7 h-[calc(100vh-72px)]">
      <div className="col-span-4">
        <div className="mt-4">
          {!loadPosts && groupPost?.find_post_in_group?.map((post, index) => <PostCard post={post as PostDto} key={index} firstChild={index === 0} inGroup={true} />)}
        </div>
      </div>
      <div className="col-span-3 pt-4">
        <DetailGroup group={data?.get_group_by_groupid as Group} />
      </div>
    </div>
  </>
}

export default ForumDetailPage