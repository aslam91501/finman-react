import { Button, Input, Spacer } from '@heroui/react'

export const LoginPage = () => {
    return (
        <form className='bg-neutral-50 p-10 lg:drop-shadow-sm rounded-md flex flex-col gap-4 min-w-[400px] max-w-1/3'>
            <h1 className='font-light text-xl'>Login</h1>

            <Spacer />

            <Input label="Email" />
            <Input label="Password" />

            <Spacer />

            <Button color='primary'>Log In</Button>
            <Button variant='light'>Create a new account.</Button>
            <Button variant='light'>I forgot my password.</Button>
        </form>

    )
}