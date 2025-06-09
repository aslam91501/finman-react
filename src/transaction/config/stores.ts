import { atom } from "jotai";

export interface TransactionFilters {
    page: number;
}

export const TransactionFilterStore = atom<TransactionFilters>({
    page: 1
})