import { atom } from "jotai";

export interface TransactionFilters {
    page: number;
    search?: string;
    sortColumn: string;
    sortDirection: 'ascending' | 'descending';
    categoryId?: string;
    type: 'INCOME' | 'EXPENSE' | 'ALL';
    date?: Date;
}

export const TransactionFilterStore = atom<TransactionFilters>({
    page: 1,
    search: undefined,
    sortColumn: 'date',
    sortDirection: 'descending',
    categoryId: undefined,
    type: 'ALL',
    date: undefined
})