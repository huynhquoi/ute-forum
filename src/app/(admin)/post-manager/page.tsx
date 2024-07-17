"use client"

import { DataTable } from "@/components/table/data-table"
import { PostDto, useGetAnalystPostQuery, useGetPostQuery, User } from "@/generated/types"
import React, { useState } from "react"
import { columns } from "./colums"
import { Input } from "@/components/ui/input"
import { useUserStorage } from "@/lib/store/userStorage"
import DetailUser from "@/components/admin/detail-user"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { months } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

const chartConfig = {
    user: {
        label: "Bài viết",
        color: "#2563eb",
    },
} satisfies ChartConfig

const ManagerPostPage = () => {
    const [postName, setPostName] = useState('')
    const { user } = useUserStorage()

    const { data, loading, error } = useGetPostQuery({
        variables: {
            limit: 100,
            pacing: 1
        }
    })

    const {data: analyst} = useGetAnalystPostQuery({
        variables: {
            year: 2024
        }
    })

    const chartData = analyst?.statistic_post?.map((i, index) => ({
        month: months[index],
        user: i
    }))
    return (<>
        <div className="">
            {loading ? <></> : <DataTable columns={columns} data={data?.post as (PostDto)[]} filterColum="title" placeholderFilterSearch="Tìm theo tên bài viết..." />}
        </div>
        <Card className="">
            <CardHeader>
                <CardTitle>Biểu đồ tăng trưởng bài viết</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-[200px] w-full">
                    <LineChart data={chartData}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                        <Line type="monotone" dataKey="user" stroke="#8884d8" />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    </>)
}

export default ManagerPostPage