import { Button, Input, Spacer } from '@heroui/react'
import type { LoginRequest } from '../config/models';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginRequestSchema } from '../config/models';
import { useLogin } from '../config/hooks';

export const LoginPage = () => {
    const { login } = useLogin();

    const { register, handleSubmit, reset, formState: { errors } } = useForm<LoginRequest>({
        resolver: zodResolver(LoginRequestSchema)
    })

    const onSubmit = handleSubmit(data => {
        login(data);
        reset();
    })
    return (
        <form
            onSubmit={onSubmit}
            className='bg-neutral-50 p-10 lg:drop-shadow-sm rounded-md flex flex-col gap-4 min-w-[400px] max-w-1/3'>
            <h1 className='font-light text-xl'>Login</h1>

            <Spacer />

            <Input label="Email" {...register('email')} isInvalid={!!errors.email} errorMessage={errors.email?.message} />
            <Input label="Password" type="password" {...register('password')} isInvalid={!!errors.password} errorMessage={errors.password?.message} />

            <Spacer />

            <Button color='primary' type='submit'>Log In</Button>
            <Button variant='light'>Create a new account.</Button>
        </form>

    )
}