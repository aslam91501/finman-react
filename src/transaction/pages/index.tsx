import { Button, useDisclosure } from "@heroui/react"
import { Plus } from "lucide-react"
import { NewTransactionForm } from "../components/new-transaction-form";
import { useCreateTransaction } from "../config/hooks";

export const TransactionsPage = () => {
    const { isOpen, onOpenChange } = useDisclosure();
    const { createTransaction } = useCreateTransaction();

    return (
        <div className="flex flex-col gap-5">
            <h1 className="text-2xl font-medium">Transactions</h1>

            <Button onPress={onOpenChange} isIconOnly radius="full" color="primary" size="sm">
                <Plus />
            </Button>

            <NewTransactionForm
                onOpenChange={onOpenChange}
                handleCreate={(data) => { createTransaction(data); onOpenChange(); }}
                isOpen={isOpen} />
        </div>
    )
}


