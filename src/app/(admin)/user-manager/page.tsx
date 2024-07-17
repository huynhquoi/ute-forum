"use client"

import { DataTable } from "@/components/table/data-table"
import { useGetAccountByPkQuery, useGetAccountQuery, useGetAnalystUserQuery, User } from "@/generated/types"
import React, { useState } from "react"
import { columns } from "./colums"
import { Input } from "@/components/ui/input"
import { useUserStorage } from "@/lib/store/userStorage"
import DetailUser from "@/components/admin/detail-user"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"
import { months } from "@/lib/utils"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loading } from "@/components/svgs"

const chartConfig = {
    user: {
        label: "Người dùng",
        color: "#2563eb",
    },
} satisfies ChartConfig

const ManagerUserPage = () => {
    const [userId, setUserId] = useState('')

    const { data, loading, error } = useGetAccountQuery({
        variables: {
            limit: 100,
            pacing: 1
        }
    })

    const { data: u, loading: loadAcc } = useGetAccountByPkQuery({
        variables: {
            userId: userId
        }
    })

    const { data: analyst } = useGetAnalystUserQuery({
        variables: {
            year: 2024
        }
    })

    const chartData = analyst?.statistic_user?.map((i, index) => ({
        month: months[index],
        user: i
    }))
    return (<>
        <div className="grid grid-cols-5">
            <div className="col-span-3 flex min flex-col items-center">
                {loading ? <><Loading className="text-2xl text-center animate-spin" /></> : <DataTable columns={columns} data={data?.account as User[]} filterColum="email" placeholderFilterSearch="Tìm theo email..." />}
            </div>
            <div className="col-span-2 pl-4">
                <div className="py-4">
                    <Input
                        placeholder={"User Id"}
                        value={userId}
                        onChange={(event) =>
                            setUserId(event.target.value)
                        }
                        className="max-w-sm"
                    />
                </div>
                <DetailUser user={u?.find_account_by_id as User} loading={loadAcc} />
            </div>
        </div>
        <Card className="mt-3">
            <CardHeader>
                <CardTitle>Biểu đồ tăng trưởng người dùng</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-[200px] w-full">
                    <LineChart data={chartData}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                        <Line type="monotone" dataKey="user" stroke="#8884d8" />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    </>)
}

export default ManagerUserPage