"use client"

import PostCard from "@/components/posts/post-card"
import PostOutstanding from "@/components/posts/post-outstanding"
import { Loading } from "@/components/svgs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PostDto, useGetGroupByKeywordQuery, useGetPostByKeywordQuery, useGetUserByKeywordQuery } from "@/generated/types"
import useStorage from "@/hooks/useStorage"
import { useUserStorage } from "@/lib/store/userStorage"
import Link from "next/link"
import { useParams } from "next/navigation"

const SearchPage = () => {

    const param = useParams()
    const { user } = useUserStorage()
    const { getItem } = useStorage()

    const { data: userData, loading: userLoading } = useGetUserByKeywordQuery({
        variables: {
            keyword: param?.keyword.toString() || "",
            userid: getItem('userId')
        },
    })

    const { data: groupData, loading: groupLoading } = useGetGroupByKeywordQuery({
        variables: {
            keyword: param?.keyword.toString() || "",
            userid: getItem('userId')
        },
    })

    const { data: postData, loading: postLoading } = useGetPostByKeywordQuery({
        variables: {
            keyword: param?.keyword.toString() || "",
            userid: getItem('userId')
        },
    })

    const loading = userLoading || groupLoading || postLoading;
    return <>
        <div className="grid grid-cols-5 h-[calc(100vh-72px)]">
            <div className="col-span-3 flex min-h-[calc(100vh-72px)] flex-col items items-center">
                <div className="w-[680px] text-xl"><span className="font-bold">Tìm kiếm: </span>{`"${param?.keyword.toString()}"`}</div>
                <div className="w-[680px] text-xl mt-3"><span className="font-bold">Kết quả:</span></div>
                <Card className="w-[680px] mt-4">
                    <CardHeader>
                        <CardTitle>Mọi người</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {!!userData?.get_user_by_keyword?.length ? userData?.get_user_by_keyword?.map((u, index) => (
                            <div key={index} className="">
                                <Link href={`/profile/${u?.userid}`} className="hover:bg-gray-100 cursor-pointer p-2 rounded-md flex items-center">
                                    <Avatar>
                                        <AvatarImage src={u?.image || "/userLogo.png"} alt="CN"></AvatarImage>
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <div className="ml-2">
                                        <p className="font-bold">{u?.fullname}</p>
                                        <p className="text-sm">{u?.bio}</p>
                                    </div>
                                </Link>
                            </div>
                        )) : <div className="text-center font-bold">Không có người dùng nào theo tìm kiếm</div>}
                    </CardContent>
                </Card>

                <Card className="w-[680px] mt-4 mb-4">
                    <CardHeader>
                        <CardTitle>
                            Nhóm
                        </CardTitle>
                        <CardContent>
                            {!!groupData?.find_group_by_keyword?.length ? groupData?.find_group_by_keyword?.map((g, index) => (
                                <Link href={`/forum/${g?.groupid}`} key={index} className="hover:bg-gray-100 cursor-pointer p-2 rounded-md flex items-center">
                                    <Avatar>
                                        <AvatarImage src={g?.image || "/userLogo.png"} alt="CN"></AvatarImage>
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <div className="ml-2">
                                        <p className="font-bold">{g?.groupname}</p>
                                        <p className="text-sm">Trưởng nhóm: <span className="font-bold">{g?.user_group?.fullname}</span></p>
                                    </div>
                                </Link>
                            )) : <div className="text-center font-bold">Không có nhóm nào theo tìm kiếm</div>}

                        </CardContent>
                    </CardHeader>
                </Card>

                {postData?.find_post_by_keyword?.map((post, index) => (
                    <PostCard key={index} firstChild={index === 0} post={post as PostDto} inGroup={!!post?.group_post?.groupid} />
                ))}
                {loading && <div className="flex items-center justify-center mb-4"><Loading className="text-2xl animate-spin" /></div>}
            </div>
            <div className="col-span-2 pl-4">
                <PostOutstanding />
            </div>
        </div>
    </>
}

export default SearchPage