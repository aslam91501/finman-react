import { atom } from "jotai";

export interface TransactionFilters {
    page: number;
    search?: string;
    sortColumn: string;
    sortDirection: 'ascending' | 'descending';
}

export const TransactionFilterStore = atom<TransactionFilters>({
    page: 1,
    search: undefined,
    sortColumn: 'date',
    sortDirection: 'descending'
})