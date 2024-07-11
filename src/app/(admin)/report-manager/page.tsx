"use client"

import { DataTable } from "@/components/table/data-table"
import { Report, useGetAccountByPkQuery, useGetAccountQuery, useGetReportByTypeQuery, User } from "@/generated/types"
import React, { useState } from "react"
import { columns } from "./colums"
import { Input } from "@/components/ui/input"
import { useUserStorage } from "@/lib/store/userStorage"
import DetailUser from "@/components/admin/detail-user"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const ManagerReportPage = () => {
    const [type, setType] = useState(1)

    const { data, loading, error } = useGetReportByTypeQuery({
        variables: {
            type: type
        }
    })

    return (<>
        <div className="grid grid-cols-5 h-[calc(100vh-72px)]">
            <div className="col-span-3 flex min-h-[calc(100vh-72px)] flex-col items-center">
                <Select onValueChange={(e) => setType(parseInt(e))} defaultValue={type.toString()}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Chọn loại báo cáo" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="1">Báo cáo người dùng</SelectItem>
                        <SelectItem value="2">Báo cáo bài viết</SelectItem>
                        <SelectItem value="3">Báo cáo bình luận</SelectItem>
                    </SelectContent>
                </Select>

                {loading ? <></> : <DataTable columns={columns} data={data?.get_report_by_type as Report[]} filterColum="createday" placeholderFilterSearch="Tìm theo email..." />}
            </div>
            <div className="col-span-2 pl-4">

            </div>
        </div>
    </>)
}

export default ManagerReportPage