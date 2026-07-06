import {MoreHorizontal,} from "@hugeicons/core-free-icons";
import {HugeiconsIcon} from "@hugeicons/react";
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {Button} from "~/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "~/components/ui/dropdown-menu";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "~/components/ui/table";
import {useEffect, useState} from "react";
import {api} from "~/services/api";

export default function DataTable() {
    const [users, setUsers] = useState<User[]>([])
    useEffect(() => {
        api.users().then(data => {
            setUsers(data.users)
        })
    }, [])
    const table = useReactTable<User>({
        data: users,
        columns: [
            {
                accessorKey: "id",
                header: "ID",
            },
            {
                accessorKey: "display_name",
                header: "Display Name",
            },
            {
                accessorKey: "email",
                header: "Email",
            },
            {
                accessorKey: "is_email_verified",
                header: "Verified",
            },
            {
                accessorKey: "blocked",
                header: "Blocked",
            },
            {
                id: "actions",
                cell: () => {
                    return (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <HugeiconsIcon className="h-4 w-4" icon={MoreHorizontal}/>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>Block</DropdownMenuItem>
                                <DropdownMenuItem>Unblock</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )
                },
            },
        ],
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <section className="p-4">
            <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef
                                                        .header,
                                                    header.getContext(),
                                                )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={table.getAllColumns().length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </section>
    );
}
