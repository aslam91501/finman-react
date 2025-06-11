import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useCustomToast } from "../../common/config/hooks"
import type { CategoryCreateRequest } from "./models"
import { createCategory, getCategories } from "./services"
import { useIsAuthenticated } from "../../auth/config/hooks"

export const useCreateCategory = () => {
    const queryClient = useQueryClient();

    const { toast } = useCustomToast();

    const { mutate, status } = useMutation({
        mutationFn: (request: CategoryCreateRequest) => createCategory(request),
        onSuccess: () => {
            toast('Category created successfully')
            queryClient.invalidateQueries({
                queryKey: ['categories']
            })
        },
        onError: () => {
            toast('Failed to create category')
        }
    })

    return {
        createCategory: mutate,
        isLoading: status === 'pending'
    }
}

export const useGetCategories = () => {
    const { userData } = useIsAuthenticated();
    const { data, isLoading, isError } = useQuery({
        queryKey: ['categories'],
        queryFn: () => getCategories(userData?.id!),
    })

    return {
        data,
        isLoading,
        isError
    }
}
