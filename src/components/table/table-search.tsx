import { Input } from "../ui/input"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { ChevronDownIcon } from "@radix-ui/react-icons"
import { Button } from "../ui/button"
import { Table } from "@tanstack/react-table"

interface TableSearchProps<TData> {
    table: Table<TData>
    filterColum: string
    placeholder: string
}

export function TableSearch<TData>({
    table,
    filterColum,
    placeholder
}: TableSearchProps<TData>) {
    return (
        <>
            <div className="flex items-center py-4">
                <Input
                    placeholder={placeholder}
                    value={(table.getColumn(filterColum)?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn(filterColum)?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </>
    )
}

export default TableSearch