"use client"

import ForumCard from "@/components/forum/forum-card"
import { Group, useGetGroupByKeywordQuery } from "@/generated/types"
import { useUserStorage } from "@/lib/store/userStorage"

const ForumPage = () => {
  const authStorage = useUserStorage(state => state.user)
  const { data, loading, error } = useGetGroupByKeywordQuery({
    variables: {
      keyword: "",
      userid: authStorage?.userid
    }
  })
  return <>
    <div className="grid grid-cols-7 h-[calc(100vh-72px)]">
      <div className="col-span-4">
        {!loading && data?.find_group_by_keyword?.map((item, index) => <ForumCard key={index} forum={item as Group} />)}
      </div>
      <div className="col-span-3">
        <div className=""></div>
      </div>
    </div>
  </>
}

export default ForumPage