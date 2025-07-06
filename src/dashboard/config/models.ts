import type { Budget } from "../../budget/config/models";

export interface DailyFinancialData {
    date: string;
    income: number;
    expenses: number;
    net: number;
}

export interface CategoryData {
    name: string;
    value: number;
    fill: string;
}

export interface CategorizedData {
    income: CategoryData[];
    expenses: CategoryData[];
}


export interface BudgetData {
    budget: Budget | null;
    totalExpenses: number;
    remaining: number;
    isOverBudget: boolean;
    currentMonth: string;
    currentYear: number;
}
