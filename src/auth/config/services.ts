import { server } from "../../common/config/server";
import type { LoginRequest, UserData, UserRegistrationRequest } from "./models";

export const registerUser = async (request: UserRegistrationRequest) => {
    await server.collection('users').create({
        ...request,
        passwordConfirm: request.confirmPassword
    })
}

export const attemptLogin = async (request: LoginRequest) => {
    return await server.collection('users')
        .authWithPassword(request.email, request.password)
}

export const logout = async () => {
    return server.authStore.clear()
}

export const getUserData = async (): Promise<UserData> => {

    if (!server.authStore.isValid || !server.authStore.record?.id)
        throw new Error('Unauthorized')


    const user = await server.collection('users').getOne<UserData>(server.authStore.record.id);



    return Promise.resolve(user);
}

