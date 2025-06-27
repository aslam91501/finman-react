import { Modal, ModalContent, ModalBody, useDisclosure, Button } from "@heroui/react"
import { ArrowLeftRight, Box, LayoutDashboard, Menu, ShieldUser, Wallet, X } from "lucide-react"
import { useNavigate } from "react-router-dom"

export const MobileNav = () => {
    const { onOpenChange, isOpen } = useDisclosure()
    return <>
        <Button className="lg:hidden" isIconOnly radius="full" variant="light" onPress={onOpenChange}>
            <Menu size={20} />
        </Button>

        <Modal
            isOpen={isOpen}
            placement={"bottom-center"}
            onOpenChange={onOpenChange}
            size="full"
            classNames={{ closeButton: "px-3 py-4" }}
            closeButton={
                <i className="m-20">
                    <X size={30} />
                </i>
            }
        >
            <ModalContent>
                {() => (
                    <>
                        {/* <ModalHeader className="flex flex-col gap-1">Menu</ModalHeader> */}
                        <ModalBody className="flex flex-col justify-center">
                            <div className="flex flex-col pl-5 gap-8">
                                <MobileNavItem link='/dashboard' icon={<LayoutDashboard size={24} />} label="Dashboard" onOpenChange={onOpenChange} />
                                <MobileNavItem link='/transactions' icon={<ArrowLeftRight size={24} />} label="Transactions" onOpenChange={onOpenChange} />
                                <MobileNavItem link='/budget' icon={<Wallet size={24} />} label="Budget" onOpenChange={onOpenChange} />
                                <MobileNavItem link='/categories' icon={<Box size={24} />} label="Categories" onOpenChange={onOpenChange} />
                                <MobileNavItem link='/profile' icon={<ShieldUser size={24} />} label="Profile" onOpenChange={onOpenChange} />
                            </div>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    </>
}


const MobileNavItem = ({ link, icon, label: text, onOpenChange }: {
    icon: React.ReactNode,
    link: string,
    label: string,
    onOpenChange?: () => void
}) => {
    const navigate = useNavigate();
    return (
        <div
            onClick={() => {
                navigate(link);
                onOpenChange?.()
            }}
            className="flex flex-row items-center gap-5"
        >
            <i>{icon}</i>
            <span className="text-lg">{text}</span>
        </div>
    )
}