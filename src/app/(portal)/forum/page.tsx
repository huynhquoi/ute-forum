"use client"

import ForumCard from "@/components/forum/forum-card"
import { Group, useGetAllGroupQuery, useGetGroupByKeywordQuery } from "@/generated/types"
import { useUserStorage } from "@/lib/store/userStorage"

const ForumPage = () => {
  const { data, loading } = useGetAllGroupQuery({
    variables: {
      limit: 100,
      pacing: 1
    }
  })
  return <>
    <div className="grid grid-cols-7 h-[calc(100vh-72px)]">
      <div className="col-span-4">
        {!loading && data?.get_all_group?.map((item, index) => <ForumCard key={index} forum={item as Group} />)}
      </div>
      <div className="col-span-3">
        <div className=""></div>
      </div>
    </div>
  </>
}

export default ForumPage