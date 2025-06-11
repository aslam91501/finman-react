import { Button, Input, Spacer, useDisclosure } from "@heroui/react"
import { Filter, Plus, Search } from "lucide-react"
import { NewTransactionForm } from "../components/new-transaction-form";
import { useCreateTransaction, useDeleteTransaction, useGetTransactions, useUpdateTransaction } from "../config/hooks";
import { TransactionsTable } from "../components/transactions-table";

export const TransactionsPage = () => {
    const { isOpen, onOpenChange } = useDisclosure();
    const { createTransaction } = useCreateTransaction();

    const { data, isLoading, isError } = useGetTransactions();
    const { deleteTransaction } = useDeleteTransaction();
    const { updateTransaction } = useUpdateTransaction();

    if (isLoading) {
        return <div>Loading...</div>
    }
    if (isError) {
        return <div>Error</div>
    }

    return (
        <div className="flex flex-col gap-5">
            <h1 className="text-2xl font-medium">Transactions</h1>

            <div className="flex justify-between items-center">
                <div className="basis-1/3">
                    <Input placeholder="Search" variant="flat" startContent={<Search size={14} />} />
                </div>

                <Spacer />

                <div className="flex gap-2">
                    <Button variant="light" endContent={<Filter size={14} />}>Filters</Button>
                    <Button onPress={onOpenChange} variant="solid" color="primary" endContent={<Plus size={14} />}>New Transaction</Button>
                </div>
            </div>
            <NewTransactionForm
                onOpenChange={onOpenChange}
                handleCreate={(data) => { createTransaction(data); onOpenChange(); }}
                isOpen={isOpen} />

            <TransactionsTable
                data={data!}
                handleDelete={(id) => deleteTransaction(id)}
                handleUpdate={(req) => updateTransaction(req)} />
        </div>
    )
}



