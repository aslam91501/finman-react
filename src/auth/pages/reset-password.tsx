import { Button, Input, Spacer } from '@heroui/react'

export const ResetPasswordPage = () => {
    return (
        <form className='bg-neutral-50 p-10 lg:drop-shadow-sm rounded-md flex flex-col gap-4 min-w-[400px] max-w-1/3'>
            <h1 className='font-light text-xl'>Reset Password</h1>

            <Spacer />

            <Input label="Email" />

            <Spacer />

            <Button color='primary'>Send Reset Email</Button>
            <Button variant='light'>Return to Login Page</Button>
        </form>

    )
}