import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { NewTransactionRequest } from "./models"
import { createNewTransaction, getTransactions } from "./services"
import { useCustomToast } from "../../common/config/hooks";
import { useAtom } from "jotai";
import { TransactionFilterStore } from "./stores";
import { useIsAuthenticated } from "../../auth/config/hooks";

export const useTransactionFilers = () => {
    const [filters, setFilters] = useAtom(TransactionFilterStore);

    return {
        page: filters.page,
        filters,
        setFilters
    }
}


export const useCreateTransaction = (closeFn?: () => void) => {
    const queryClient = useQueryClient();
    const { page } = useTransactionFilers();

    const { toast } = useCustomToast();
    const { mutate, status } = useMutation({
        mutationFn: (req: NewTransactionRequest) => createNewTransaction(req),
        onSuccess: () => {
            toast('Added Transaction')
            queryClient.invalidateQueries({
                queryKey: ['transactions', page]
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
    const { page } = useTransactionFilers();
    const { userData } = useIsAuthenticated();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['transactions', page],
        queryFn: () => getTransactions(userData?.id!, page),
    })

    return {
        data,
        isLoading,
        isError
    }
}