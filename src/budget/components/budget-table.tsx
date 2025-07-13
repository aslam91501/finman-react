import { Table, TableBody, TableHeader, TableColumn, TableRow, TableCell, Dropdown, DropdownTrigger, Button, DropdownMenu, DropdownItem, Chip } from "@heroui/react"
import { MoreVertical } from "lucide-react"
import { useMultiModal } from "../../common/config/hooks"
import { type Budget } from "../config/models"
import { SetBudgetModal } from "./set-budget-modal"
import { type BudgetRequest } from "../config/models"
import { useBudgetFilters } from "../config/hooks"
import { useEffect, useState } from "react"
import { DeleteDialog } from "../../common/components/delete-dialog"

interface Props {
    data: Budget[],
    handleUpdate: (req: BudgetRequest) => void,
    handleDelete: (month: number, year: number) => void
}

export const BudgetTable = ({ data, handleUpdate, handleDelete }: Props) => {
    const { toggle: deleteToggle, isOpen: deleteIsOpen } = useMultiModal();
    const { toggle: updateToggle, isOpen: updateIsOpen } = useMultiModal();

    const [budgetList, setBudgetList] = useState<Map<number, Budget>>(new Map())

    useEffect(() => {
        const map = new Map<number, Budget>();
        data.forEach((item) => {
            map.set(item.month, item);
        });
        setBudgetList(map);
    }, [data])

    const { year } = useBudgetFilters();
    const getMonth = (month: number) => {
        if (month == 1) return 'January'
        if (month == 2) return 'February'
        if (month == 3) return 'March'
        if (month == 4) return 'April'
        if (month == 5) return 'May'
        if (month == 6) return 'June'
        if (month == 7) return 'July'
        if (month == 8) return 'August'
        if (month == 9) return 'September'
        if (month == 10) return 'October'
        if (month == 11) return 'November'
        if (month == 12) return 'December'
        return ''
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
                <TableColumn>Year</TableColumn>
                <TableColumn>Month</TableColumn>
                <TableColumn>Is Set</TableColumn>
                <TableColumn>Amount</TableColumn>
                <TableColumn>Actions</TableColumn>
            </TableHeader>
            <TableBody>
                {Array.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12).map((item) => (
                    <TableRow key={item}>
                        <TableCell>{year}</TableCell>
                        <TableCell>{getMonth(item)}</TableCell>
                        <TableCell>{budgetList.get(item)?.amount ? <Chip variant="flat" color="success">Yes</Chip> : <Chip variant="flat" color="danger">No</Chip>}</TableCell>
                        <TableCell>{budgetList.get(item)?.amount || 'None Set'}</TableCell>
                        <TableCell>
                            <Dropdown>
                                <DropdownTrigger>
                                    <Button variant="light" radius="full" isIconOnly>
                                        <MoreVertical size={18} />
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu>
                                    <DropdownItem onPress={() => updateToggle(`${year}-${item}`)} key="edit">Set</DropdownItem>
                                    {budgetList.get(item)?.amount ? (
                                        <DropdownItem onPress={() => deleteToggle(`${year}-${item}`)} key="delete">Delete</DropdownItem>
                                    ) : null}
                                </DropdownMenu>
                            </Dropdown>

                            <SetBudgetModal
                                isOpen={updateIsOpen.get(`${year}-${item}`) || false}
                                onOpenChange={() => updateToggle(`${year}-${item}`)}
                                month={item}
                                amount={budgetList.get(item)?.amount}
                                handleUpdate={(req) => {
                                    updateToggle(`${year}-${item}`);
                                    handleUpdate(req);
                                }}
                            />

                            <DeleteDialog
                                isOpen={deleteIsOpen.get(`${year}-${item}`) || false}
                                onOpenChange={() => deleteToggle(`${year}-${item}`)}
                                handleDelete={() => {
                                    deleteToggle(`${year}-${item}`);
                                    handleDelete(item, year);
                                }}
                            />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}