import type { Category, CategoryUpdateRequest } from "../config/models";
import { Table, TableBody, TableCell, TableHeader, TableColumn, TableRow, Dropdown, DropdownTrigger, Button, DropdownMenu, DropdownItem, Chip } from "@heroui/react";
import { MoreVertical } from "lucide-react"
import type { TransactionType } from "../../transaction/config/models";
import { useMultiModal } from "../../common/config/hooks";
import { DeleteDialog } from "../../common/components/delete-dialog";
import { UpdateCategoryModal } from "./update-category-modal";

interface Props {
    data: Category[];
    handleDelete: (id: string) => void;
    handleUpdate: (req: CategoryUpdateRequest) => void;
}

export const CategoriesTable = ({ data, handleDelete, handleUpdate }: Props) => {
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
    const { toggle: updateToggle, isOpen: updateIsOpen } = useMultiModal();

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
                {data.map((category) => (
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
                                    <DropdownItem onPress={() => updateToggle(category.id)} key="edit">Edit</DropdownItem>
                                    <DropdownItem onPress={() => deleteToggle(category.id)} key="delete">Delete</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>

                            <DeleteDialog
                                isOpen={deleteIsOpen.get(category.id) ?? false}
                                onOpenChange={() => deleteToggle(category.id)}
                                handleDelete={() => handleDelete(category.id)}
                            />

                            <UpdateCategoryModal
                                isOpen={updateIsOpen.get(category.id) ?? false}
                                onOpenChange={() => updateToggle(category.id)}
                                category={category}
                                handleUpdate={(req) => { handleUpdate(req); updateToggle(category.id) }}
                            />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}