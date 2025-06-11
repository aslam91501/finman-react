import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/react"

interface Props {
    onOpenChange: () => void,
    isOpen: boolean,
    handleDelete: () => void
}

export const DeleteDialog = ({ onOpenChange, isOpen, handleDelete }: Props) => {
    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                <ModalHeader>Delete</ModalHeader>
                <ModalBody>
                    <p>Are you sure you want to delete this?</p>
                </ModalBody>
                <ModalFooter>
                    <Button onPress={onOpenChange}>Cancel</Button>
                    <Button color="primary" onPress={handleDelete}>Delete</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}