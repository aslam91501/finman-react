import { Modal, ModalBody, ModalContent, ModalHeader, Chip } from "@heroui/react"
import { type Transaction, type TransactionType } from "../config/models"
import { format } from "date-fns";

interface Props {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    transaction: Transaction;
}

export const TransactionDetailModal = ({ isOpen, onOpenChange, transaction }: Props) => {
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
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                <ModalHeader>Transaction Detail</ModalHeader>
                <ModalBody>
                    <div className="pb-5 flex flex-col gap-5">
                        <div>
                            <p className="font-medium text-gray-600 text-sm">Title</p>
                            <p className="mt-2">{transaction.title}</p>
                        </div>

                        <div>
                            <p className="font-medium text-gray-600 text-sm">Amount</p>
                            <p className="mt-2">{transaction.amount}</p>
                        </div>

                        <div>
                            <p className="font-medium text-gray-600 text-sm">Date</p>
                            <p className="mt-2">{format(new Date(transaction.date), 'dd  MMM  yyyy')}</p>
                        </div>

                        <div>
                            <p className="font-medium text-gray-600 text-sm">Type</p>
                            <p className="mt-2">{getTypeChip(transaction.type)}</p>
                        </div>

                        <div>
                            <p className="font-medium text-gray-600 text-sm">Category</p>
                            <p className="mt-2">{transaction.category?.name}</p>
                        </div>

                        <div>
                            <p className="font-medium text-gray-600 text-sm">Notes</p>
                            <p className="mt-2">{transaction.notes}</p>
                        </div>
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}