import {
    subDays,
    format,
    eachDayOfInterval,
    startOfDay,
    parseISO,
    isValid
} from 'date-fns';
import type { Transaction } from '../../transaction/config/models';
import type { DailyFinancialData } from './models';
import { server } from '../../common/config/server';


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