import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { BudgetRequest } from "./models"
import { deleteBudget, setBudget } from "./services"
import { useCustomToast } from "../../common/config/hooks"
import { useIsAuthenticated } from "../../auth/config/hooks"
import { useQuery } from "@tanstack/react-query"
import { getBudgetList } from "./services"
import { useAtom } from "jotai"
import { BudgetFilterStore } from "./stores"

export const useSetBudget = () => {
    const { year } = useBudgetFilters();
    const { toast } = useCustomToast();
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: (req: BudgetRequest) => setBudget(req),
        onSuccess: () => {
            toast('Budget updated')
            queryClient.invalidateQueries({
                queryKey: ['budget-list', year]
            })
        },
        onError: () => {
            toast('Failed to update budget')
        }
    })

    return {
        setBudget: mutate,
        isLoading: isPending
    }
}


export const useDeleteBudget = () => {
    const { toast } = useCustomToast();
    const queryClient = useQueryClient();
    const { year } = useBudgetFilters();

    const { mutate, isPending } = useMutation({
        mutationFn: ({ month, year }: { month: number, year: number }) => deleteBudget(month, year),
        onSuccess: () => {
            toast('Budget deleted')
            queryClient.invalidateQueries({
                queryKey: ['budget-list', year]
            })
        },
        onError: () => {
            toast('Failed to delete budget')
        }
    })

    return {
        deleteBudget: mutate,
        isLoading: isPending
    }
}


export const useBudgetFilters = () => {
    const [filter, setFilter] = useAtom(BudgetFilterStore)

    return {
        year: filter.year,
        setYear: (year: number) => setFilter({ ...filter, year })
    }
}


export const useGetBudgetList = () => {
    const { year } = useBudgetFilters();
    const { userData } = useIsAuthenticated();
    const { data, isLoading } = useQuery({
        queryKey: ['budget-list', year],
        queryFn: () => getBudgetList(userData?.id!, year)
    })

    return {
        budgetList: data,
        isLoading
    }
}

