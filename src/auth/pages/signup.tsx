import { Button, Input, Spacer } from '@heroui/react'

export const SignupPage = () => {
    return (
        <form className='bg-neutral-50 p-10 lg:drop-shadow-sm rounded-md flex flex-col gap-4 min-w-[400px] max-w-1/3'>
            <h1 className='font-light text-xl'>Sign Up</h1>

            <Spacer />

            <Input label="Name" />
            <Input label="Email" />
            <Input label="Password" />
            <Input label="Confirm Password" />

            <Spacer />

            <Button color='primary'>Sign Up</Button>
            <Button variant='light'>I already have an account.</Button>
        </form>

    )
}