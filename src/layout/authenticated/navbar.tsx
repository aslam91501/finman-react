import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@heroui/react"
import { SidebarOpen, SidebarClose, LogOut, Menu } from "lucide-react"
import { useState } from "react"

export const Navbar = ({ isSidebarCollapsed, setSidebarCollapsed }: {
    isSidebarCollapsed: boolean,
    setSidebarCollapsed: (val: boolean) => any
}) => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    return (

        <nav className="basis-20 flex flex-row justify-between items-center px-10">
            <Button className="hidden lg:flex" isIconOnly radius="full" variant="light" onPress={() => setSidebarCollapsed(!isSidebarCollapsed)} >
                {isSidebarCollapsed ? <SidebarOpen size={20} /> : <SidebarClose size={20} />}
            </Button>
            <Button className="lg:hidden" isIconOnly radius="full" variant="light" onPress={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                <Menu size={20} />
            </Button>


            <Button isIconOnly radius="full" variant="light" onPress={onOpen}>
                <LogOut size={20} />
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalContent>
                    <ModalHeader>Logout</ModalHeader>
                    <ModalBody>Are you sure you want to logout?</ModalBody>
                    <ModalFooter>
                        <Button variant="light" onPress={onClose}>Close</Button>
                        <Button variant="solid" color="primary" onPress={onClose}>Logout</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </nav>
    )
}