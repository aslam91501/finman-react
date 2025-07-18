import { Button, Input, Spacer, Spinner, useDisclosure } from "@heroui/react"
import { FileSpreadsheet, Filter, Plus, Search } from "lucide-react"
import { NewTransactionForm } from "../components/new-transaction-form";
import { useCreateTransaction, useDeleteTransaction, useExportTransactions, useGetTransactions, useTransactionFilers, useUpdateTransaction } from "../config/hooks";
import { TransactionsTable } from "../components/transactions-table";
import { useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { TransactionFilterModal } from "../components/transaction-filter-modal";

export const TransactionsPage = () => {
    const { isOpen, onOpenChange } = useDisclosure();
    const { isOpen: filterIsOpen, onOpenChange: filterOnOpenChange } = useDisclosure();
    const { createTransaction } = useCreateTransaction();

    const { data, isLoading, isError } = useGetTransactions();
    const { deleteTransaction } = useDeleteTransaction();
    const { updateTransaction } = useUpdateTransaction();
    const { exportTransactions } = useExportTransactions();

    const [search, setSearch] = useState('');
    const { setSearch: setSearchFilter, getCurrentFilterCount, clearFilters } = useTransactionFilers();
    const debouncedSearch = useDebounce(search, 500);

    useEffect(() => {
        if (debouncedSearch)
            setSearchFilter(debouncedSearch)

        if (debouncedSearch == '')
            setSearchFilter(undefined)
    }, [debouncedSearch])

    const handleExport = () => {
        exportTransactions(data?.items!);
    }

    if (isError) {
        return <div>Error</div>
    }

    return (
        <div className="flex flex-col gap-5">
            <h1 className="text-2xl font-medium">Transactions</h1>

            <div className="hidden lg:flex justify-between items-center">
                <div className="basis-1/3 flex gap-2">
                    <Input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search" variant="flat" startContent={<Search size={14} />} />
                    <Button variant="flat" isIconOnly color="success" onPress={handleExport}>
                        <FileSpreadsheet />
                    </Button>
                </div>

                <Spacer />

                <div className="flex gap-2">
                    {getCurrentFilterCount() > 0 && <Button variant="light" onPress={clearFilters}>Clear Filters</Button>}
                    <Button variant="light" endContent={<Filter size={14} />} onPress={filterOnOpenChange}>Filters {getCurrentFilterCount() > 0 && `(${getCurrentFilterCount()})`}</Button>
                    <Button onPress={onOpenChange} variant="solid" color="primary" endContent={<Plus size={14} />}>New Transaction</Button>
                </div>
            </div>
            <NewTransactionForm
                onOpenChange={onOpenChange}
                handleCreate={(data) => { createTransaction(data); onOpenChange(); }}
                isOpen={isOpen} />

            <TransactionFilterModal isOpen={filterIsOpen} onOpenChange={filterOnOpenChange} />

            <div className="hidden lg:block">
                {!isLoading &&
                    <TransactionsTable
                        data={data!}
                        handleDelete={(id) => deleteTransaction(id)}
                        handleUpdate={(req) => updateTransaction(req)} />
                }
            </div>

            {isLoading && <Spinner />}
        </div>
    )
}



