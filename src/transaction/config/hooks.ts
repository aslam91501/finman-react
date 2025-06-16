import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { NewTransactionRequest, Transaction, UpdateTransactionRequest } from "./models"
import { createNewTransaction, deleteTransaction, exportToExcel, getTransactions, updateTransaction } from "./services"
import { useCustomToast } from "../../common/config/hooks";
import { useAtom } from "jotai";
import { TransactionFilterStore } from "./stores";
import { useIsAuthenticated } from "../../auth/config/hooks";

export const useTransactionFilers = () => {
    const [filters, setFilters] = useAtom(TransactionFilterStore);

    const setPage = (page: number) => {
        setFilters({
            ...filters,
            page
        })
    }

    const setSearch = (search: string | undefined) => {
        setFilters({
            ...filters,
            page: 1,
            search
        })
    }

    const setSort = (column: string, direction: 'ascending' | 'descending') => {
        setFilters({
            ...filters,
            sortColumn: column,
            sortDirection: direction
        })
    }

    const setType = (type: 'INCOME' | 'EXPENSE' | 'ALL') => {
        setFilters({
            ...filters,
            page: 1,
            type
        })
    }

    const setCategoryId = (categoryId: string | undefined) => {
        setFilters({
            ...filters,
            page: 1,
            categoryId
        })
    }

    const getCurrentFilterCount = () => {
        let count = 0;
        if (filters.search)
            count++;
        if (filters.type !== 'ALL')
            count++;
        if (filters.categoryId)
            count++;
        if (filters.date)
            count++;
        return count;
    }

    const clearFilters = () => {
        setFilters({
            page: 1,
            search: undefined,
            sortColumn: 'date',
            sortDirection: 'descending',
            type: 'ALL',
            categoryId: undefined
        })
    }

    const setDate = (date: Date) => {
        setFilters({
            ...filters,
            page: 1,
            date
        })
    }

    const queryKey = ['transactions', filters.page, filters.search || '', filters.sortColumn, filters.sortDirection, filters.type, filters.categoryId, filters.date?.toISOString()];

    return {
        filters,
        page: filters.page,
        search: filters.search,
        sortColumn: filters.sortColumn,
        sortDirection: filters.sortDirection,
        type: filters.type,
        categoryId: filters.categoryId,
        date: filters.date,
        queryKey,
        setPage,
        setSearch,
        setSort,
        setType,
        setCategoryId,
        setDate,
        getCurrentFilterCount,
        clearFilters
    }
}


export const useCreateTransaction = (closeFn?: () => void) => {
    const queryClient = useQueryClient();
    const { queryKey } = useTransactionFilers();

    const { toast } = useCustomToast();
    const { mutate, status } = useMutation({
        mutationFn: (req: NewTransactionRequest) => createNewTransaction(req),
        onSuccess: () => {
            toast('Added Transaction')
            queryClient.invalidateQueries({
                queryKey
            })
            closeFn?.()
        },
        onError: () => {
            toast('Failed to add Transaction')
        }
    })

    return {
        createTransaction: mutate,
        isLoading: status === 'pending'
    }
}




export const useGetTransactions = () => {
    const { filters, queryKey } = useTransactionFilers();
    const { userData } = useIsAuthenticated();

    const { data, isLoading, isError } = useQuery({
        queryKey,
        queryFn: () => getTransactions(userData?.id!, filters),
    })

    return {
        data,
        isLoading,
        isError
    }
}


export const useDeleteTransaction = () => {
    const queryClient = useQueryClient();
    const { queryKey } = useTransactionFilers();

    const { toast } = useCustomToast();
    const { mutate, status } = useMutation({
        mutationFn: (id: string) => deleteTransaction(id),
        onSuccess: () => {
            toast('Deleted Transaction')
            queryClient.invalidateQueries({
                queryKey
            })
        },
        onError: () => {
            toast('Failed to delete Transaction')
        }
    })

    return {
        deleteTransaction: mutate,
        isLoading: status === 'pending'
    }
}

export const useUpdateTransaction = () => {
    const queryClient = useQueryClient();
    const { queryKey } = useTransactionFilers();

    const { toast } = useCustomToast();
    const { mutate, status } = useMutation({
        mutationFn: (req: UpdateTransactionRequest) => updateTransaction(req),
        onSuccess: () => {
            toast('Updated Transaction')
            queryClient.invalidateQueries({
                queryKey
            })
        },
        onError: () => {
            toast('Failed to update Transaction')
        }
    })

    return {
        updateTransaction: mutate,
        isLoading: status === 'pending'
    }
}


export const useExportTransactions = () => {
    const { toast } = useCustomToast();

    const { mutate, status } = useMutation({
        mutationFn: (data: Transaction[]) => exportToExcel(data, 'transactions-' + new Date().toISOString()),
        onError: () => {
            toast('Failed to export Transactions')
        }
    })

    return {
        exportTransactions: mutate,
        isLoading: status === 'pending'
    }
}

