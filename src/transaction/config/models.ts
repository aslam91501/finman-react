import { z } from "zod"
import type { Category } from "../../category/config/models"

export type TransactionType = 'INCOME' | 'EXPENSE'

export interface Transaction {
    id: string,
    title: string,
    notes: string,
    amount: number,
    date: string,
    type: TransactionType,
    category?: Category
}


const TransactionSchema = z.object({
    id: z.string().min(1, "Id is required"),
    title: z.string().min(3, "Title is required"),
    notes: z.string(),
    amount: z.number().min(1, "Amount should be greater than or equal to 1"),
    type: z.enum(['INCOME', 'EXPENSE']),
    userId: z.string().min(1, "User Id is required"),
    categoryId: z.string(),
    date: z.date()
})

export const NewTransactionSchema = TransactionSchema.omit({
    id: true
})

export type NewTransactionRequest = z.infer<typeof NewTransactionSchema>;


export const UpdateTransactionSchema = TransactionSchema;
export type UpdateTransactionRequest = z.infer<typeof UpdateTransactionSchema>;