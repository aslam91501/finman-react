import {
    subDays,
    format,
    startOfDay,
    parseISO,
    isValid
} from 'date-fns';
import type { Transaction } from '../../transaction/config/models';
import type { BudgetData, CategorizedData, CategoryData, DailyFinancialData } from './models';
import { server } from '../../common/config/server';
import type { Budget } from '../../budget/config/models';


export const fetchLast30DaysTransactions = async (userId: string): Promise<DailyFinancialData[]> => {
    try {
        // Calculate date range using date-fns
        const today = startOfDay(new Date());
        const thirtyDaysAgo = startOfDay(subDays(today, 29)); // 30 days total including today

        const startDate = format(thirtyDaysAgo, 'yyyy-MM-dd');
        const endDate = format(today, 'yyyy-MM-dd');

        // Fetch transactions from the last 30 days for the authenticated user
        const records = await server.collection('transactions').getFullList<Transaction>({
            filter: `user.id = "${userId}" && date >= "${startDate}" && date <= "${endDate}"`,
            sort: 'date',
        });

        console.log('Fetched', records);

        // Initialize all dates with zero values
        const dailyData = new Map<string, { income: number; expenses: number }>();

        // Process transactions and update daily totals
        records.forEach((transaction) => {
            // Validate date format
            const transactionDate = parseISO(transaction.date);
            if (!isValid(transactionDate)) {
                console.warn(`Invalid date format for transaction ${transaction.id}: ${transaction.date}`);
                return;
            }

            const existing = dailyData.get(transaction.date) || { income: 0, expenses: 0 };

            if (transaction.type === 'INCOME') {
                existing.income += transaction.amount;
            } else if (transaction.type === 'EXPENSE') {
                existing.expenses += transaction.amount;
            }

            dailyData.set(transaction.date, existing);
        });

        // Convert to array format suitable for recharts
        const result: DailyFinancialData[] = Array.from(dailyData.entries()).map(([date, data]) => ({
            date: format(parseISO(date), 'MMM dd'),
            income: data.income,
            expenses: data.expenses,
            net: data.income - data.expenses,
        }));

        // Sort by date (already in correct order due to eachDayOfInterval, but ensuring consistency)
        return result.sort((a, b) => a.date.localeCompare(b.date));

    } catch (error) {
        console.error('Error fetching financial data:', error);
        throw new Error('Failed to fetch financial data');
    }
};


export const fetchRecentIncomeAndExpense = async (userId: string) => {
    const incomeRecords = await server.collection('transactions').getList<Transaction>(1, 10, {
        filter: `user.id = "${userId}" && type = "INCOME"`,
        sort: '-created',
    });

    const expenseRecords = await server.collection('transactions').getList<Transaction>(1, 10, {
        filter: `user.id = "${userId}" && type = "EXPENSE"`,
        sort: '-created',
    });

    return {
        incomeItems: incomeRecords.items,
        expenseItems: expenseRecords.items
    }
}


export const fetchCategoryData = async (userId: string): Promise<CategorizedData> => {
    try {
        // Calculate date range for last 30 days
        const today = startOfDay(new Date());
        const thirtyDaysAgo = startOfDay(subDays(today, 29));

        const startDate = format(thirtyDaysAgo, 'yyyy-MM-dd');
        const endDate = format(today, 'yyyy-MM-dd');

        // Fetch transactions with category expand
        const records = await server.collection('transactions').getFullList({
            filter: `user = "${userId}" && date >= "${startDate}" && date <= "${endDate}"`,
            expand: 'category',
        });

        // Separate transactions by type
        const incomeTransactions = records.filter(transaction => transaction.type === 'INCOME');
        const expenseTransactions = records.filter(transaction => transaction.type === 'EXPENSE');

        // Color palettes
        const incomeColors = [
            '#10b981', '#059669', '#047857', '#065f46', '#064e3b',
            '#16a34a', '#15803d', '#166534', '#14532d', '#365314'
        ];

        const expenseColors = [
            '#ef4444', '#dc2626', '#b91c1c', '#991b1b', '#7f1d1d',
            '#f97316', '#ea580c', '#c2410c', '#9a3412', '#7c2d12'
        ];

        // Process income transactions
        const incomeCategories = new Map<string, number>();
        incomeTransactions.forEach(transaction => {
            const categoryName = transaction.expand?.category?.name || 'Uncategorized';
            const currentAmount = incomeCategories.get(categoryName) || 0;
            incomeCategories.set(categoryName, currentAmount + transaction.amount);
        });

        // Process expense transactions
        const expenseCategories = new Map<string, number>();
        expenseTransactions.forEach(transaction => {
            const categoryName = transaction.expand?.category?.name || 'Uncategorized';
            const currentAmount = expenseCategories.get(categoryName) || 0;
            expenseCategories.set(categoryName, currentAmount + transaction.amount);
        });

        // Convert to CategoryData format for income
        const incomeData: CategoryData[] = [];
        let incomeColorIndex = 0;
        incomeCategories.forEach((amount, categoryName) => {
            incomeData.push({
                name: categoryName,
                value: amount,
                fill: incomeColors[incomeColorIndex % incomeColors.length],
            });
            incomeColorIndex++;
        });

        // Convert to CategoryData format for expenses
        const expenseData: CategoryData[] = [];
        let expenseColorIndex = 0;
        expenseCategories.forEach((amount, categoryName) => {
            expenseData.push({
                name: categoryName,
                value: amount,
                fill: expenseColors[expenseColorIndex % expenseColors.length],
            });
            expenseColorIndex++;
        });

        // Sort both arrays by value descending
        incomeData.sort((a, b) => b.value - a.value);
        expenseData.sort((a, b) => b.value - a.value);

        return {
            income: incomeData,
            expenses: expenseData,
        };

    } catch (error) {
        console.error('Error fetching category data:', error);
        throw new Error('Failed to fetch category data');
    }
};


/**
 * Fetches budget details for current month and total expenses
 * @param userId - The authenticated user's ID
 * @returns Promise<BudgetData> - Budget info and current month expenses
 */
export const fetchCurrentMonthBudget = async (userId: string): Promise<BudgetData> => {
    try {
        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth() + 1; // getMonth() returns 0-11
        const currentMonthName = format(now, 'MMMM yyyy');

        // Generate budget ID pattern (YYYY-MM format)
        const budgetId = `${currentYear}-${currentMonth.toString().padStart(2, '0')}`;

        // Fetch budget for current month
        let budget = null;
        try {
            budget = await server.collection('budget').getOne(budgetId, {
                filter: `user = "${userId}"`
            });
        } catch (error) {
            // Budget doesn't exist for current month, that's okay
            console.log('No budget found for current month');
        }

        // Calculate start and end dates for current month
        const startDate = format(new Date(currentYear, currentMonth - 1, 1), 'yyyy-MM-dd');
        const endDate = format(new Date(currentYear, currentMonth, 0), 'yyyy-MM-dd'); // Last day of month

        // Fetch expenses for current month
        const expenseTransactions = await server.collection('transactions').getFullList({
            filter: `user = "${userId}" && type = "EXPENSE" && date >= "${startDate}" && date <= "${endDate}"`,
        });

        // Calculate total expenses
        const totalExpenses = expenseTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);

        // Calculate remaining budget and overspend status
        const budgetAmount = budget?.amount || 0;
        const remaining = budgetAmount - totalExpenses;
        const isOverBudget = totalExpenses > budgetAmount && budgetAmount > 0;

        return {
            budget: budget as unknown as Budget,
            totalExpenses,
            remaining,
            isOverBudget,
            currentMonth: currentMonthName,
            currentYear,
        };

    } catch (error) {
        console.error('Error fetching current month budget:', error);
        throw new Error('Failed to fetch budget data');
    }
};

