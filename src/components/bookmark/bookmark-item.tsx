"use client"

import { Bookmark, User } from "@/generated/types"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"
import UserDisplay from "../users/user-display"
import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"
import ImageCover from "../shared/image-cover"
import './styles.scss'
import { Open } from "../svgs"

type BookmarkItemProps = {
    bookmark: Bookmark
}

const BookmarkItem = ({ bookmark }: BookmarkItemProps) => {
    return <>
        <Card className="w-full shadow-none hover:bg-gray-100 cursor-pointer mb-4 bookmark-card relative">
            <Link href={`/post/${bookmark?.post_bookmark?.postid}`}>
                <CardHeader className="py-1 px-2 flex flex-row justify-between items-start w-full transition-[width] bookmark-card-content">
                    <div className="">
                        <UserDisplay user={bookmark?.post_bookmark?.user_post as User} descripttion={format(bookmark?.post_bookmark?.createday || new Date(), "dd/MM/yyyy")} />
                        <p className="text-xl font-bold mt-1">
                            {bookmark?.post_bookmark?.title}
                        </p>
                        <div className="mt-2">
                            Đã lưu vào lúc <b>{format(bookmark?.createday || new Date(), "dd/MM/yyyy")}</b>
                        </div>

                    </div>
                    <div style={{ width: '112px', height: '100%', position: 'relative', marginTop: 0, zIndex: 10 }}>
                        <Image
                            alt='Mountains'
                            src={bookmark?.post_bookmark?.image as string}
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: '112px', height: 'auto' }}
                            className="rounded-lg"
                        />
                    </div>
                </CardHeader>
            </Link>
            <div className=" absolute top-0 right-0 h-full flex flex-col justify-center mr-4">
                <Open className="text-5xl animate-pulse text-gray-600" />
            </div>
        </Card>
    </>
}

export default BookmarkItem