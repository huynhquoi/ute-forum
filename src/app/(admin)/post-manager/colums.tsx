import QuickDetailPost from "@/components/admin/quick-detail-post"
import { Eye } from "@/components/svgs"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { PostDto } from "@/generated/types"
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"

export const columns: ColumnDef<PostDto>[] = [
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
        accessorKey: "user_post",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Người tạo
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="ml-4 capitalize">{row.original?.user_post?.fullname}</div>,
    },
    {
        accessorKey: "title",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Tên bài viết
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="ml-4 lowercase">{row.getValue("title")}</div>,
    },
    {
        accessorKey: "requiredreputation",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="p-0"
                >
                    Reputation yêu cầu
                    <CaretSortIcon className="ml-2" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const reputation = parseFloat(row.getValue("requiredreputation"))

            return <div className="text-left font-medium">{reputation}</div>
        },
    },
    {
        accessorKey: "totalread",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="p-0"
                >
                    Luợt đọc
                    <CaretSortIcon className="ml-2" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const read = parseFloat(row.getValue("totalread"))

            return <div className="text-left font-medium">{read}</div>
        },
    },
    {
        accessorKey: "totallike",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="p-0"
                >
                    Luợt thích
                    <CaretSortIcon className="ml-2" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const like = parseFloat(row.getValue("totallike"))

            return <div className="text-left font-medium">{like}</div>
        },
    },
    {
        accessorKey: "totaldislike",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="p-0"
                >
                    Luợt không thích
                    <CaretSortIcon className="ml-2" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const disLike = parseFloat(row.getValue("totaldislike"))

            return <div className="text-left font-medium">{disLike}</div>
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const user = row.original

            return (
                <QuickDetailPost post={row.original}>
                    <Eye className="text-xl text-red-300 cursor-pointer hover:text-red-500" />
                </QuickDetailPost>
            )
        },
    },
]