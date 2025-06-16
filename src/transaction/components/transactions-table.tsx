import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Dropdown, DropdownTrigger, Button, DropdownMenu, DropdownItem, Chip } from "@heroui/react"
import { MoreVertical } from "lucide-react"
import { Paginator } from "../../common/components/paginator"
import type { PageResult } from "../../common/config/models"
import type { Transaction, TransactionType } from "../config/models"
import { useMultiModal } from "../../common/config/hooks"
import { DeleteDialog } from "../../common/components/delete-dialog"
import { UpdateTransactionForm } from "./update-transaction-form"
import type { UpdateTransactionRequest } from "../config/models"
import { TransactionDetailModal } from "./transaction-detail-modal"
import { format } from "date-fns"
import { useEffect, useState } from "react"
import { useTransactionFilers } from "../config/hooks"

interface Props {
    data: PageResult<Transaction>
    handleDelete: (id: string) => void
    handleUpdate: (req: UpdateTransactionRequest) => void
}

export const TransactionsTable = ({ data, handleDelete, handleUpdate }: Props) => {
    const page = data.page;
    const totalPages = data.totalPages;
    const items = data.items;

    const { toggle: deleteToggle, isOpen: deleteIsOpen } = useMultiModal();
    const { toggle: updateToggle, isOpen: updateIsOpen } = useMultiModal();
    const { toggle: detailToggle, isOpen: detailIsOpen } = useMultiModal();

    const { sortColumn, sortDirection, setSort } = useTransactionFilers();

    type Direction = 'ascending' | 'descending'

    const [sortDescriptor, setSortDescriptor] = useState<{ column: string, direction: Direction }>({
        column: sortColumn,
        direction: sortDirection
    })

    useEffect(() => {
        setSort(sortDescriptor.column, sortDescriptor.direction)
    }, [sortDescriptor])

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
        // <Skeleton isLoaded={!isLoading}>
        <Table
            shadow="sm"
            radius="sm"
            bottomContent={bottomContent}
            removeWrapper
            classNames={{
                tr: ['border-b', 'hover:bg-gray-50', 'transition-all'],
                th: ['first:rounded-none', 'last:rounded-none', 'p-4'],
            }}

            onSortChange={(d) => setSortDescriptor(d as { column: string, direction: Direction })}
            sortDescriptor={{ column: sortDescriptor.column, direction: sortDescriptor.direction }}
        >
            <TableHeader>
                <TableColumn key="title" allowsSorting>Title</TableColumn>
                <TableColumn key="amount" allowsSorting>Amount</TableColumn>
                <TableColumn key="type" allowsSorting>Type</TableColumn>
                <TableColumn key="date" allowsSorting>Date</TableColumn>
                <TableColumn key="actions">Actions</TableColumn>
            </TableHeader>
            <TableBody>
                {items.map((item) => (
                    <TableRow key={item.id}>
                        <TableCell>{item.title}</TableCell>
                        <TableCell>{item.amount}</TableCell>
                        <TableCell>{getTypeChip(item.type)}</TableCell>
                        <TableCell>{format(new Date(item.date), 'dd  MMM  yyyy')}</TableCell>
                        <TableCell>
                            <Dropdown>
                                <DropdownTrigger>
                                    <Button variant="light" radius="full" isIconOnly>
                                        <MoreVertical size={18} />
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu>
                                    <DropdownItem onPress={() => updateToggle(item.id)} key="edit">Edit</DropdownItem>
                                    <DropdownItem onPress={() => deleteToggle(item.id)} key="delete">Delete</DropdownItem>
                                    <DropdownItem onPress={() => detailToggle(item.id)} key="detail">View</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>

                            <DeleteDialog
                                isOpen={deleteIsOpen.get(item.id) ?? false}
                                onOpenChange={() => deleteToggle(item.id)}
                                handleDelete={() => handleDelete(item.id)}
                            />

                            <UpdateTransactionForm
                                isOpen={updateIsOpen.get(item.id) ?? false}
                                onOpenChange={() => updateToggle(item.id)}
                                handleUpdate={(req) => { handleUpdate(req); updateToggle(item.id) }}
                                transaction={item}
                            />

                            <TransactionDetailModal
                                isOpen={detailIsOpen.get(item.id) ?? false}
                                onOpenChange={() => detailToggle(item.id)}
                                transaction={item}
                            />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        // </Skeleton>
    )
}
