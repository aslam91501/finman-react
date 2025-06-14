import { atom } from "jotai";

export interface TransactionFilters {
    page: number;
    search?: string;
}

export const TransactionFilterStore = atom<TransactionFilters>({
    page: 1,
    search: undefined
})