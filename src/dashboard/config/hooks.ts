import { useQuery } from "@tanstack/react-query";
import { fetchCategoryData, fetchCurrentMonthBudget, fetchLast30DaysTransactions, fetchRecentIncomeAndExpense } from "./services";
import type { DailyFinancialData } from "./models";
import { useIsAuthenticated } from "../../auth/config/hooks";

export const useLast30DaysTransactions = () => {
    const { userData } = useIsAuthenticated();

    const { data, isLoading, error } = useQuery({
        queryKey: ['transactions', 'last-30-days', userData?.id],
        queryFn: () => fetchLast30DaysTransactions(userData?.id!),
        enabled: !!userData?.id, // Only run query if userId is available
        retry: 2,
    });

    return { data: data as DailyFinancialData[], isLoading, error };
};


export const useRecentIncomeAndExpense = () => {
    const { userData } = useIsAuthenticated();

    const { data, isLoading, error } = useQuery({
        queryKey: ['recent-income-expense', userData?.id],
        queryFn: () => fetchRecentIncomeAndExpense(userData?.id!),
        enabled: !!userData?.id, // Only run query if userId is available
        retry: 2,
    });

    return { data, isLoading, error };
}


export const useCategoryData = () => {
    const { userData } = useIsAuthenticated();

    return useQuery({
        queryKey: ['category-data', userData?.id],
        queryFn: () => fetchCategoryData(userData?.id!),
        enabled: !!userData?.id,
        retry: 2,
    });
};


export const useCurrentMonthBudget = () => {
    const { userData } = useIsAuthenticated();

    return useQuery({
        queryKey: ['budget', 'current-month', userData?.id],
        queryFn: () => fetchCurrentMonthBudget(userData?.id!),
        enabled: !!userData?.id,
        retry: 2,
    });
};