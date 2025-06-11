import { z } from "zod";

export const CategoryCreateSchema = z.object({
    name: z.string().min(3, 'Name is required.'),
    type: z.enum(['INCOME', 'EXPENSE']),
    userId: z.string().min(1, "User Id is required")
})

export type CategoryCreateRequest = z.infer<typeof CategoryCreateSchema>

export interface Category {
    id: string;
    name: string;
    type: 'INCOME' | 'EXPENSE';
    userId: string;
}
