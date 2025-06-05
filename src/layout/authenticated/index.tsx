import { Navbar } from "./navbar"
import { Sidebar } from "./sidebar"
import { useState } from "react"

export const AuthenticatedLayout = () => {
    const [isSidebarCollapsed, setSidebarCollapsed] = useState(false)

    return (
        <div className="flex flex-row min-h-screen w-screen max-w-full">
            <Sidebar isCollapsed={isSidebarCollapsed} />
            <main className="flex-grow bg-neutral-50 flex flex-col">
                <Navbar isSidebarCollapsed={isSidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed} />
            </main>
        </div>
    )
}