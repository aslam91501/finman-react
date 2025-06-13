import { z } from "zod";

export const BudgetSchema = z.object({
    year: z.number().min(2000).max(2050),
    month: z.number().min(1, "Should be between 1 and 12").max(12, "Should be between 1 and 12"),
    amount: z.number().positive("Should be a positive value").min(0, "Should be greater than 0"),
    userId: z.string().min(1, "User Id is required")
})

export type BudgetRequest = z.infer<typeof BudgetSchema>


export interface Budget {
    id: string;
    year: number;
    month: number;
    amount: number;
    userId: string;
}