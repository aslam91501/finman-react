import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Dropdown, DropdownTrigger, Button, DropdownMenu, DropdownItem, Chip } from "@heroui/react"
import { MoreVertical } from "lucide-react"
import { Paginator } from "../../common/components/paginator"
import type { PageResult } from "../../common/config/models"
import type { Transaction, TransactionType } from "../config/models"

interface Props {
    data: PageResult<Transaction>
}

export const TransactionsTable = ({ data }: Props) => {
    const page = data.page;
    const totalPages = data.totalPages;
    const items = data.items;

    const bottomContent = (
        <div className="flex flex-row w-full justify-end">
            <Paginator currentPage={page} totalPages={totalPages} />
        </div>
    )

    const getTypeChip = (type: TransactionType) => {
        if (type === 'INCOME') {
            return (
                <Chip color="success" variant="flat">Income</Chip>
            )
        } else {
            return (
                <Chip color="warning" variant="flat">Expense</Chip>
            )
        }
    }

    return (
        <Table shadow="sm"
            radius="sm"
            bottomContent={bottomContent}
            removeWrapper
            classNames={{
                tr: ['border-b', 'hover:bg-gray-50', 'transition-all'],
                th: ['first:rounded-none', 'last:rounded-none', 'p-4'],
            }}
        >
            <TableHeader>
                <TableColumn allowsSorting>Title</TableColumn>
                <TableColumn allowsSorting>Amount</TableColumn>
                <TableColumn allowsSorting>Type</TableColumn>
                <TableColumn allowsSorting>Date</TableColumn>
                <TableColumn>Actions</TableColumn>
            </TableHeader>
            <TableBody>
                {items.map((item) => (
                    <TableRow key={item.id}>
                        <TableCell>{item.title}</TableCell>
                        <TableCell>{item.amount}</TableCell>
                        <TableCell>{getTypeChip(item.type)}</TableCell>
                        <TableCell>{new Date(item.date).toISOString()}</TableCell>
                        <TableCell>
                            <Dropdown>
                                <DropdownTrigger>
                                    <Button variant="light" radius="full" isIconOnly>
                                        <MoreVertical size={18} />
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu>
                                    <DropdownItem key="edit">Edit</DropdownItem>
                                    <DropdownItem key="delete">Delete</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
