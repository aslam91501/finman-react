import logo from '/logo.svg'
import { Outlet } from 'react-router-dom'

export const UnauthenticatedLayout = () => {
    return (
        <div className="flex flex-col h-screen w-screen max-w-full bg-neutral-50 lg:bg-neutral-100 p-10">
            <nav className="basis-20 flex flex-row items-center justify-between">
                <div>
                    <img src={logo} className='h-8' />
                </div>
                <div>
                    {/* <Button className='bg-primary-400 text-white' radius='full'>
                        Login
                    </Button> */}
                </div>
            </nav>
            <main className='flex-grow flex flex-row items-center justify-center'>
                <Outlet />
            </main>
        </div>
    )
}