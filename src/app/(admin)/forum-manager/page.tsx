"use client"

import { DataTable } from "@/components/table/data-table"
import { Group, useGetAccountByPkQuery, useGetAccountQuery, useGetAllGroupQuery, useGetGroupByGroupIdQuery, User } from "@/generated/types"
import React, { useState } from "react"
import { columns } from "./colums"
import { Input } from "@/components/ui/input"
import { useUserStorage } from "@/lib/store/userStorage"
import DetailUser from "@/components/admin/detail-user"
import DetailGroup from "@/components/admin/detail-group"

const ManagerUserPage = () => {
    const [groupId, setGroupId] = useState('')

    const { data, loading, error } = useGetAllGroupQuery({
        variables: {
            limit: 100,
            pacing: 1
        }
    })

    const {data: g} = useGetGroupByGroupIdQuery({
        variables: {
            groupid: parseInt(groupId)
        }
    })
    return (<>
        <div className="grid grid-cols-5 h-[calc(100vh-72px)]">
            <div className="col-span-3 flex min-h-[calc(100vh-72px)] flex-col items-center">
                {loading ? <></> : <DataTable columns={columns} data={data?.get_all_group as Group[]} filterColum="groupname" placeholderFilterSearch="Tìm theo tên nhóm..." />}
            </div>
            <div className="col-span-2 pl-4">
                <div className="py-4">
                    <Input
                        placeholder={"Group Id"}
                        value={groupId}
                        onChange={(event) =>
                            setGroupId(event.target.value)
                        }
                        className="max-w-sm"
                    />
                </div>
                <DetailGroup group={g?.get_group_by_groupid as Group} />
            </div>
        </div>
    </>)
}

export default ManagerUserPage