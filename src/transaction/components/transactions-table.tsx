import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Dropdown, DropdownTrigger, Button, DropdownMenu, DropdownItem, Chip } from "@heroui/react"
import { MoreVertical } from "lucide-react"
import { Paginator } from "../../common/components/paginator"
import type { PageResult } from "../../common/config/models"
import type { Transaction, TransactionType } from "../config/models"
import { useMultiModal } from "../../common/config/hooks"
import { DeleteDialog } from "../../common/components/delete-dialog"

interface Props {
    data: PageResult<Transaction>
    handleDelete: (id: string) => void
}

export const TransactionsTable = ({ data, handleDelete }: Props) => {
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

    const { toggle: deleteToggle, isOpen: deleteIsOpen } = useMultiModal();

    return (
        <Table
            shadow="sm"
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
                                    <DropdownItem onPress={() => deleteToggle(item.id)} key="delete">Delete</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>

                            <DeleteDialog
                                isOpen={deleteIsOpen.get(item.id) ?? false}
                                onOpenChange={() => deleteToggle(item.id)}
                                handleDelete={() => handleDelete(item.id)}
                            />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
