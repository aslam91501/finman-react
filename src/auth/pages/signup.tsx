import { Button, Input, Spacer } from '@heroui/react'
import type { UserRegistrationRequest } from '../config/models';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserRegistrationSchema } from '../config/models';
import { useRegisterUser } from '../config/hooks';
import { useNavigate } from 'react-router-dom';

export const SignupPage = () => {
    const navigate = useNavigate();
    const { registerUser } = useRegisterUser();

    const { register, handleSubmit, reset, formState: { errors } } = useForm<UserRegistrationRequest>({
        resolver: zodResolver(UserRegistrationSchema)
    })

    const onSubmit = handleSubmit(data => {
        registerUser(data);
        reset();
    })

    return (
        <form
            onSubmit={onSubmit}
            className='bg-neutral-50 p-10 lg:drop-shadow-sm rounded-md flex flex-col gap-4 min-w-[400px] max-w-1/3'>
            <h1 className='font-light text-xl'>Sign Up</h1>

            <Spacer />

            <Input label="Name"
                {...register('name')}
                isInvalid={!!errors.name}
                errorMessage={errors.name?.message} />

            <Input label="Email"
                {...register('email')}
                isInvalid={!!errors.email}
                errorMessage={errors.email?.message} />

            <Input label="Password"
                type="password"
                {...register('password')}
                isInvalid={!!errors.password}
                errorMessage={errors.password?.message} />

            <Input label="Confirm Password"
                type="password"
                {...register('confirmPassword')}
                isInvalid={!!errors.confirmPassword}
                errorMessage={errors.confirmPassword?.message} />

            <Spacer />

            <Button color='primary' type='submit'>Sign Up</Button>
            <Button variant='light' onClick={() => navigate('/login')}>I already have an account.</Button>
        </form>

    )
}