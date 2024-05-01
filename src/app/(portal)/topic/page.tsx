"use client"

import { useGetNoticeSubscription, useGetUserSubscription } from "@/generated/types"
import { useUserStorage } from "@/lib/store/userStorage"

const TopicPage = () => {
    const userStorage = useUserStorage(state => state.user)
    const { data } = useGetUserSubscription({
        variables: {
            userid: userStorage?.userid
        },
    });
    const { data: notice, loading, error } = useGetNoticeSubscription({
        variables: {
            userid: userStorage?.userid
        },
    })
    return <>
        <p>{data?.sub_status_user?.userid}</p>
        <p>{notice?.sub_all_notice_by_userid?.map(item => item?.content)}</p>
    </>
}

export default TopicPage