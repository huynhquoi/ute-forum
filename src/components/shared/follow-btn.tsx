"use client"

import { useUserStorage } from "@/lib/store/userStorage"
import * as React from "react"
import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { useCreateFollowMutation, useDeleteFollowMutation, useGetFollowingUserQuery } from "@/generated/types"

interface FollowBtnProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
    userId: string
}

const FollowBtn: React.FC<FollowBtnProps> = ({ userId, ...props }) => {
    const { user } = useUserStorage()
    const [follow, setFollow] = useState(false);
    const [CreateFollow] = useCreateFollowMutation()
    const [DeleteFollow] = useDeleteFollowMutation()

    const { data: followingU, refetch } = useGetFollowingUserQuery({
        variables: {
          followerid: user?.userid
        }
      })
    
      useEffect(() => {
        if (!followingU?.get_all_user_by_follower?.length) {
          setFollow(false)
          return
        }
    
        if (followingU?.get_all_user_by_follower?.find(i => i?.userid === userId)) {
          setFollow(true)
        } else {
          setFollow(false)
        }
      }, [followingU?.get_all_user_by_follower, userId])
    
      const handleActionFollow = (type: 'follow' | 'unfollow') => {
        if (type === 'follow') {
          CreateFollow({
            variables: {
              followerid: user?.userid,
              userid: userId,
            }
          }).then(() => refetch())
        } else if (type === 'unfollow') {
          DeleteFollow({
            variables: {
              followerid: user?.userid,
              userid: userId,
            }
          }).then(() => refetch())
        }
      }
    return (
        <>
            {user?.userid === userId
                ? <></>
                : follow
                    ? <Button
                        variant={"outline"}
                        className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white w-full"
                        onClick={() => handleActionFollow('unfollow')}
                    >
                        Bỏ theo dõi
                    </Button>
                    : <Button
                        variant={"outline"}
                        className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white w-full"
                        onClick={() => handleActionFollow('follow')}
                    >
                        Theo dõi
                    </Button>}
        </>
    )
}

export default FollowBtn