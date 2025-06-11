import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem } from "@heroui/react"
import { CategoryCreateSchema, type CategoryCreateRequest } from "../config/models"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRef } from "react"
import { useIsAuthenticated } from "../../auth/config/hooks"

interface Props {
    onOpenChange: () => void,
    isOpen: boolean,
    handleCreate: (req: CategoryCreateRequest) => void
}

export const NewCategoryForm = ({ onOpenChange, isOpen, handleCreate }: Props) => {
    const { userData } = useIsAuthenticated();

    console.log(userData)

    const { register, handleSubmit, reset, formState: { errors } } = useForm<CategoryCreateRequest>({
        resolver: zodResolver(CategoryCreateSchema),
        defaultValues: {
            type: 'EXPENSE',
            userId: userData!.id!
        }
    })

    const onSubmit = handleSubmit(data => {
        handleCreate(data);
        reset();
    })

    const submitRef = useRef<HTMLButtonElement>(null);

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
        >
            <ModalContent>
                <ModalHeader>New Category</ModalHeader>
                <ModalBody>
                    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
                        <Input
                            label="Name"
                            isInvalid={!!errors.name}
                            errorMessage={errors.name?.message}
                            {...register("name")}
                        />

                        <Select
                            label="Type"
                            isInvalid={!!errors.type}
                            errorMessage={errors.type?.message}
                            {...register('type')}
                        >
                            <SelectItem key="INCOME">Income</SelectItem>
                            <SelectItem key="EXPENSE">Expense</SelectItem>
                        </Select>


                        <button type="submit" className="hidden" ref={submitRef}>Submit</button>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button onPress={onOpenChange}>Cancel</Button>
                    <Button color="primary" onPress={() => submitRef.current?.click()}>Add Category</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}