import { atom } from "jotai";

export interface BudgetFilters {
    year: number;
}

export const BudgetFilterStore = atom<BudgetFilters>({
    year: (new Date()).getFullYear()
})