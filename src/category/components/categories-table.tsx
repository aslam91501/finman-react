import type { Category } from "../config/models";
import { Table, TableBody, TableCell, TableHeader, TableColumn, TableRow, Dropdown, DropdownTrigger, Button, DropdownMenu, DropdownItem, Chip } from "@heroui/react";
import { MoreVertical } from "lucide-react"
import type { TransactionType } from "../../transaction/config/models";

interface Props {
    data: Category[];
}

export const CategoriesTable = (props: Props) => {
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
        <Table
            shadow="sm"
            radius="sm"
            removeWrapper
            classNames={{
                tr: ['border-b', 'hover:bg-gray-50', 'transition-all'],
                th: ['first:rounded-none', 'last:rounded-none', 'p-4'],
            }}
        >
            <TableHeader>
                <TableColumn>Name</TableColumn>
                <TableColumn>Category Type</TableColumn>
                <TableColumn>Actions</TableColumn>
            </TableHeader>
            <TableBody>
                {props.data.map((category) => (
                    <TableRow key={category.id}>
                        <TableCell>{category.name}</TableCell>
                        <TableCell>{getTypeChip(category.type)}</TableCell>
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