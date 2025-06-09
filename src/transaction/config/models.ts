import { z } from "zod"

export type TransactionType = 'INCOME' | 'EXPENSE'

export interface Transaction {
    id: string,
    title: string,
    notes: string,
    amount: number,
    date: Date,
    type: TransactionType
}


const TransactionSchema = z.object({
    id: z.string().min(1, "Id is required"),
    title: z.string().min(3, "Title is required"),
    notes: z.string(),
    amount: z.number().min(1, "Amount should be greater than or equal to 1"),
    type: z.enum(['INCOME', 'EXPENSE']),
    date: z.date()
})

export const NewTransactionSchema = TransactionSchema.omit({
    id: true
})

export type NewTransactionRequest = z.infer<typeof NewTransactionSchema>;

export type UpdateTransactionRequest = z.infer<typeof TransactionSchema>;