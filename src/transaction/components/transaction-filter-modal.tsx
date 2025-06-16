import { Modal, ModalContent, ModalFooter, ModalHeader, ModalBody, Button, Select, SelectItem, DatePicker } from "@heroui/react"
import { useTransactionFilers } from "../config/hooks"
import { useState } from "react";

interface Props {
    isOpen: boolean;
    onOpenChange: () => void;
}

export const TransactionFilterModal = ({ isOpen, onOpenChange }: Props) => {
    const { filters, setType, type, clearFilters } = useTransactionFilers();

    const [typeValue, setTypeValue] = useState<'INCOME' | 'EXPENSE' | 'ALL'>(filters.type || 'ALL');

    const handleApply = () => {
        console.log(typeValue)
        console.log(type)
        if (typeValue !== type)
            setType(typeValue);
        onOpenChange();
    }

    const handleClear = () => {
        clearFilters();

        setTypeValue('ALL');

        onOpenChange();
    }

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                <ModalHeader>Filters</ModalHeader>
                <ModalBody>
                    <form className="flex flex-col gap-5">
                        <DatePicker label="Date" />
                        <Select label="Type" selectedKeys={[typeValue]} onChange={(e) => setTypeValue(e.target.value as 'INCOME' | 'EXPENSE' | 'ALL')}>
                            <SelectItem key="ALL">All</SelectItem>
                            <SelectItem key="INCOME">Income</SelectItem>
                            <SelectItem key="EXPENSE">Expense</SelectItem>
                        </Select>
                        <Select label="Category">
                            <SelectItem key="all">All</SelectItem>
                            <SelectItem key="income">Income</SelectItem>
                            <SelectItem key="expense">Expense</SelectItem>
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