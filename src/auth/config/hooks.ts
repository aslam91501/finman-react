import { useMutation, useQuery } from "@tanstack/react-query"
import type { LoginRequest, UserRegistrationRequest } from "./models"
import { attemptLogin, getUserData, logout, registerUser } from "./services"
import { useNavigate } from "react-router-dom"
import { useCustomToast } from "../../common/config/hooks"

export const useRegisterUser = () => {
    const navigate = useNavigate();
    const { toast } = useCustomToast();

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

export const useLogin = () => {
    const navigate = useNavigate();
    const { toast } = useCustomToast();

    const { mutate, isPending } = useMutation({
        mutationFn: (request: LoginRequest) => attemptLogin(request),
        onError: () => { toast('Login Failed', 'Check your credentials.') },
        onSuccess: () => {
            navigate('/dashboard')
        }
    })

    return {
        login: mutate,
        isLoading: isPending
    }
}

export const useLogout = () => {
    const navigate = useNavigate();

    const { mutate } = useMutation({
        mutationFn: () => logout(),
        onSuccess: () => {
            navigate('/login')
        }
    })

    return {
        logout: mutate
    }
}


export const useIsAuthenticated = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['user-data'],
        queryFn: () => getUserData(),
        retry: false,
    })

    return {
        userData: data,
        isAuthenticated: !!data,
        isLoading,
        isError
    }
}