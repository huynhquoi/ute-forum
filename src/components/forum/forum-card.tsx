"use client"

import Image from "next/image"
import { Card, CardHeader } from "../ui/card"
import UserDisplay from "../users/user-display"
import './styles.scss'
import { GroupIcon, Open } from "../svgs"
import { Group } from "@/generated/types"
import { format } from "date-fns"
import Link from "next/link"
import { useUserStorage } from "@/lib/store/userStorage"

type ForumCardType = {
    forum: Group;
}

const ForumCard = ({ forum }: ForumCardType) => {
    return <>
        <Link href={`/forum/${forum?.groupid}`}>
            <Card className="w-full shadow-none cursor-pointer mb-4 relative forum-card bg-transparent">
                <CardHeader className="flex flex-row justify-between items-start w-full transition-[width] forum-card-content rounded-xl bg-white">
                    <div className="flex items-center">
                        <Image src={"/group.png"} alt="Group Image" width={100} height={100} className="rounded-lg" />
                        <div className="ml-4 flex flex-col items-start justify-between h-[100px]">
                            <div className="">
                                <p className="font-bold text-xl">{forum?.groupname}</p>
                                <p className="text-sm mt-2">{forum?.description}</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="text-sm mt-2 mr-3">Thành lập vào ngày: <span className="font-bold">{format(forum?.createday || new Date(), "dd/MM/yyyy")}</span></p>
                                {/* <p className="text-sm mt-2 flex items-end"><GroupIcon className="text-xl mr-2" /> <span className="font-bold mr-1">50</span> thành viên</p> */}
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <div className="absolute top-0 right-0 h-full flex flex-col justify-center items-center -z-10 w-[10%]">
                    <Open className="text-2xl animate-pulse text-gray-600" />
                    <p className="text-sm">Truy cập</p>
                </div>
            </Card>
        </Link>
    </>
}

export default ForumCard