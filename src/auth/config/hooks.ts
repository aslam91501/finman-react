import { useMutation, useQuery } from "@tanstack/react-query"
import type { UserRegistrationRequest } from "./models"
import { getUserData, registerUser } from "./services"
import { useNavigate } from "react-router-dom"
import { useToast } from "../../common/config/hooks"

export const useRegisterUser = () => {
    const navigate = useNavigate();
    const { toast } = useToast();

    const { mutate, isPending } = useMutation({
        mutationFn: (request: UserRegistrationRequest) => registerUser(request),
        onError: () => { toast('Registration Failed', 'Your user registration was not successful.') },
        onSuccess: () => {
            navigate('/dashboard')
        }
    })

    return {
        registerUser: mutate,
        isLoading: isPending
    }
}


export const useGetUserData = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['user-data'],
        queryFn: () => getUserData()
    })

    return {
        userData: data,
        isLoading,
        isError
    }
}