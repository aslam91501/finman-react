import { z } from "zod";

export const CategoryCreateSchema = z.object({
    name: z.string().min(3, 'Name is required.'),
    type: z.enum(['INCOME', 'EXPENSE']),
    userId: z.string().min(1, "User Id is required")
})

export type CategoryCreateRequest = z.infer<typeof CategoryCreateSchema>



export const CategoryUpdateSchema = CategoryCreateSchema.extend({
    id: z.string().min(3, "Id is required")
})

export type CategoryUpdateRequest = z.infer<typeof CategoryUpdateSchema>;

export interface Category {
    id: string;
    name: string;
    type: 'INCOME' | 'EXPENSE';
    userId: string;
}
