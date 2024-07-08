"use client"

import { DataTable } from "@/components/table/data-table"
import { useGetAccountByPkQuery, useGetAccountQuery, User } from "@/generated/types"
import React, { useState } from "react"
import { columns } from "./colums"
import { Input } from "@/components/ui/input"
import { useUserStorage } from "@/lib/store/userStorage"
import DetailUser from "@/components/admin/detail-user"

const ManagerUserPage = () => {
    const [userId, setUserId] = useState('')

    const { data, loading, error } = useGetAccountQuery({
        variables: {
            limit: 100,
            pacing: 1
        }
    })

    const { data: u } = useGetAccountByPkQuery({
        variables: {
            userId: userId
        }
    })
    return (<>
        <div className="grid grid-cols-5 h-[calc(100vh-72px)]">
            <div className="col-span-3 flex min-h-[calc(100vh-72px)] flex-col items-center">
                {loading ? <></> : <DataTable columns={columns} data={data?.account as User[]} filterColum="email" placeholderFilterSearch="Tìm theo email..." />}
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
                <DetailUser user={u?.find_account_by_id as User} />
            </div>
        </div>
    </>)
}

export default ManagerUserPage