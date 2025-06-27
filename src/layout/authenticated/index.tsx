import { Outlet, useNavigate } from "react-router-dom"
import { useIsAuthenticated } from "../../auth/config/hooks"
import { Navbar } from "./navbar"
import { Sidebar } from "./sidebar"
import { useEffect, useState } from "react"

export const AuthenticatedLayout = () => {
    const [isSidebarCollapsed, setSidebarCollapsed] = useState(false)
    const { userData, isAuthenticated, isLoading, isError } = useIsAuthenticated();

    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            navigate('/login')
        }

        console.log(userData);
    }, [isLoading])


    if (isLoading)
        return <div>Loading...</div>

    if (isError)
        return <div>Error</div>

    return (
        <div className="flex flex-row min-h-screen w-screen max-w-full">
            <Sidebar isCollapsed={isSidebarCollapsed} />
            <div className="flex-grow bg-gray-50 flex flex-col max-w-full">
                <Navbar isSidebarCollapsed={isSidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed} />
                <main className="py-5 px-10">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}