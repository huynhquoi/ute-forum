"use client"

import { PostDto, Topic, useGetPostQuery, useGetTopicQuery } from "@/generated/types"
import OutstandingZone from "../profile/outstanding-zone"

const PostOutstanding = () => {
  const { data, loading, fetchMore } = useGetPostQuery({
    variables: {
      limit: 20,
      pacing: 1
    }
  })

  const { data: topic } = useGetTopicQuery()
  return <OutstandingZone post={data?.post?.filter(i => !i?.group_post?.groupid) as PostDto[]}  topic={topic?.topic as Topic[]} />
}

export default PostOutstanding