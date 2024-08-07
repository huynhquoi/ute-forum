import QuickReport from "@/components/admin/quick-report"
import { Eye } from "@/components/svgs"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import UserDisplay from "@/components/users/user-display"
import { REPORT_COMMENT, REPORT_POST, REPORT_USER } from "@/generated/default-types"
import { Report, User } from "@/generated/types"
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import Link from "next/link"

export const columns: ColumnDef<Report>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "createday",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Ngày tạo
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="ml-4 capitalize">{format(row.getValue("createday"), 'dd/MM/yyyy')}</div>,
    },
    {
        accessorKey: "user_reporter",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Người báo cáo
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="ml-4 lowercase">
            <UserDisplay user={row.original.user_reporter as User} />
        </div>,
    },
    {
        accessorKey: "reason",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Lý do
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="ml-4 lowercase">
            {row.original.reason}
        </div>,
    },
    {
        accessorKey: "content",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Lý do
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="ml-4 lowercase">
            {row.original.content}
        </div>,
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const user = row.original

            return (
                <QuickReport
                    report={row.original}
                    type={
                        row?.original?.user_report?.userid
                            ? REPORT_USER
                            : row?.original?.post_report?.postid
                                ? REPORT_POST
                                : REPORT_COMMENT
                    }
                >
                    <Eye className="text-xl text-red-300 cursor-pointer hover:text-red-500" />
                </QuickReport>
            )
        },
    },
]