import { ArrowLeftRight, Box, LayoutDashboard, ShieldUser, Wallet } from 'lucide-react'
import logo from '/logo.svg'
import logoIcon from '/logo-icon-only.svg'
import { cn, Spacer, Tooltip } from '@heroui/react'
import { useLocation, useNavigate } from 'react-router-dom'

export const Sidebar = ({ isCollapsed }: {
    isCollapsed: boolean
}) => {
    return (
        <aside className={cn("hidden lg:flex bg-gray-100 border-r flex-col gap-4 py-8 transition-all overflow-hidden", {
            "basis-20": isCollapsed,
            "basis-72": !isCollapsed,
            "px-5": !isCollapsed,
            "px-2": isCollapsed
        })}>
            <div className='pl-4'>
                <img src={isCollapsed ? logoIcon : logo} className='h-8' />
            </div>

            <Spacer />
            <SidebarItem link='/dashboard' icon={<LayoutDashboard size={24} />} label="Dashboard" collapsed={isCollapsed} />
            <SidebarItem link='/transactions' icon={<ArrowLeftRight size={24} />} label="Transactions" collapsed={isCollapsed} />
            <SidebarItem link='/budget' icon={<Wallet size={24} />} label="Budget" collapsed={isCollapsed} />
            <SidebarItem link='/categories' icon={<Box size={24} />} label="Categories" collapsed={isCollapsed} />
            <SidebarItem link='/profile' icon={<ShieldUser size={24} />} label="Profile" collapsed={isCollapsed} />
        </aside>
    )
}


const SidebarItem = ({ icon, label, collapsed, link }: { link: string, icon: React.ReactNode, label: string, collapsed: boolean }) => {
    const navigate = useNavigate();

    const location = useLocation().pathname;

    const isActive = location.startsWith(link);

    if (collapsed)
        return (
            <Tooltip content={label} placement='right' color='primary'>
                <div onClick={() => navigate(link)}
                    className={cn(
                        'flex flex-row gap-5 items-center hover:cursor-pointer hover:bg-blue-100 py-4 hover:text-primary px-5 rounded-md transition-all',
                        { 'bg-blue-100 py-4 text-primary': isActive }
                    )}>
                    <i>{icon}</i>
                    <span className={cn('tracking-wide font-medium overflow-hidden', {
                        "w-0": collapsed,
                    })}>{label}</span>
                </div>
            </Tooltip>
        )
    else return (
        <div onClick={() => navigate(link)} className={cn(
            'flex flex-row gap-5 items-center hover:cursor-pointer hover:bg-blue-100 py-4 hover:text-blue-600 px-5 rounded-md transition-all',
            { 'bg-blue-100 py-4 text-blue-600': isActive }
        )}>
            <i>{icon}</i>
            <span className={cn('tracking-wide font-medium overflow-hidden', {
                "w-0": collapsed,
            })}>{label}</span>
        </div>
    )
}