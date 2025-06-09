import { useMutation } from "@tanstack/react-query"
import type { NewTransactionRequest } from "./models"
import { createNewTransaction } from "./services"
import { useCustomToast } from "../../common/config/hooks";

export const useCreateTransaction = () => {
    const { toast } = useCustomToast();
    const { mutate, status } = useMutation({
        mutationFn: (req: NewTransactionRequest) => createNewTransaction(req),
        onSuccess: () => {
            toast('Added Transaction')
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