import { server } from "../../common/config/server";
import type { UserData, UserRegistrationRequest } from "./models";

export const registerUser = async (request: UserRegistrationRequest) => {
    await server.collection('users').create({
        ...request,
        passwordConfirm: request.confirmPassword
    })
}


export const getUserData = async (): Promise<UserData> => {
    if (!server.authStore.isValid || !server.authStore.record?.id)
        throw new Error('Unauthorized')

    const user = await server.collection('users').getOne<UserData>(server.authStore.record.id);

    return user;
}

