import { Modal, ModalContent, ModalFooter, ModalHeader, ModalBody, Button, Select, SelectItem, DatePicker } from "@heroui/react"
import { useTransactionFilers } from "../config/hooks"
import { useState } from "react";
import { useGetCategories } from "../../category/config/hooks";
import { getLocalTimeZone, type DateValue } from "@internationalized/date";

interface Props {
    isOpen: boolean;
    onOpenChange: () => void;
}

export const TransactionFilterModal = ({ isOpen, onOpenChange }: Props) => {
    const { filters, setType, type, date, setDate, clearFilters, setCategoryId } = useTransactionFilers();

    const { data: categories } = useGetCategories();

    const [typeValue, setTypeValue] = useState<'INCOME' | 'EXPENSE' | 'ALL'>(filters.type || 'ALL');
    const [categoryValue, setCategoryValue] = useState<string>(filters.categoryId || '');

    const [dateValue, setDateValue] = useState<DateValue | null>(null)

    const handleApply = () => {
        if (typeValue !== type)
            setType(typeValue);
        if (categoryValue !== filters.categoryId)
            setCategoryId(categoryValue);
        if (dateValue && date !== dateValue.toDate(getLocalTimeZone()))
            setDate(dateValue.toDate(getLocalTimeZone()));
        onOpenChange();
    }

    const handleClear = () => {
        clearFilters();
        setTypeValue('ALL');
        setCategoryValue('');
        onOpenChange();
    }

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                <ModalHeader>Filters</ModalHeader>
                <ModalBody>
                    <form className="flex flex-col gap-5">
                        <DatePicker label="Date"
                            // @ts-ignore
                            value={dateValue}
                            onChange={setDateValue} />
                        <Select label="Type" selectedKeys={[typeValue]} onChange={(e) => setTypeValue(e.target.value as 'INCOME' | 'EXPENSE' | 'ALL')}>
                            <SelectItem key="ALL">All</SelectItem>
                            <SelectItem key="INCOME">Income</SelectItem>
                            <SelectItem key="EXPENSE">Expense</SelectItem>
                        </Select>
                        <Select isDisabled={typeValue === 'ALL'} label="Category" selectedKeys={[categoryValue]} onChange={(e) => setCategoryValue(e.target.value)}>
                            {categories ? categories.filter((category) => category.type === typeValue)?.map((category) => (
                                <SelectItem key={category.id}>{category.name}</SelectItem>
                            )) : null}
                        </Select>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button onPress={handleClear}>Clear Filters</Button>
                    <Button onPress={onOpenChange}>Close</Button>
                    <Button color="primary" onPress={handleApply}>Apply</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}