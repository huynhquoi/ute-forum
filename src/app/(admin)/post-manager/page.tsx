"use client"

import { DataTable } from "@/components/table/data-table"
import { PostDto, useGetPostQuery, User } from "@/generated/types"
import React, { useState } from "react"
import { columns } from "./colums"
import { Input } from "@/components/ui/input"
import { useUserStorage } from "@/lib/store/userStorage"
import DetailUser from "@/components/admin/detail-user"

const ManagerPostPage = () => {
    const [postName, setPostName] = useState('')
    const { user } = useUserStorage()

    const { data, loading, error } = useGetPostQuery({
        variables: {
            limit: 100,
            pacing: 1
        }
    })
    return (<>
        <div className="h-[calc(100vh-72px)]">
            {loading ? <></> : <DataTable columns={columns} data={data?.post as (PostDto)[]} filterColum="title" placeholderFilterSearch="Tìm theo tên bài viết..." />}
        </div>
    </>)
}

export default ManagerPostPage