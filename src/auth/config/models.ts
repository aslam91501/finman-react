import { z } from "zod";

export const UserRegistrationSchema = z.object({
    name: z.string().min(3, 'Name is required.'),
    email: z.string().email('Email should be valid'),
    password: z.string().min(8, 'Password should be atleast 8 characters'),
    confirmPassword: z.string().min(8)
}).refine(s => {
    return s.password === s.confirmPassword;
}, {
    message: "Passwords don't match",
    path: ['confirmPassword']
})


export type UserRegistrationRequest = z.infer<typeof UserRegistrationSchema>;

export interface UserData {
    id: string;
    name: string;
    email: string;
}