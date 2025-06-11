import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Select, SelectItem } from "@heroui/react";
import type { Category, CategoryUpdateRequest } from "../config/models";
import { useIsAuthenticated } from "../../auth/config/hooks";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import { CategoryUpdateSchema } from "../config/models";
import { zodResolver } from "@hookform/resolvers/zod";

interface Props {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    category: Category;
    handleUpdate: (req: CategoryUpdateRequest) => void;
}

export const UpdateCategoryModal = ({ isOpen, onOpenChange, category, handleUpdate }: Props) => {
    const { userData } = useIsAuthenticated();

    const { register, handleSubmit, formState: { errors } } = useForm<CategoryUpdateRequest>({
        resolver: zodResolver(CategoryUpdateSchema),
        defaultValues: {
            id: category.id,
            name: category.name,
            type: category.type,
            userId: userData?.id!
        }
    })

    const onSubmit = handleSubmit(data => {
        handleUpdate(data);
    })

    const submitRef = useRef<HTMLButtonElement>(null);
    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                <ModalHeader>Update Category</ModalHeader>
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
                    <Button variant="light" onPress={() => onOpenChange(false)}>Cancel</Button>
                    <Button color="primary" onPress={() => submitRef.current?.click()}>Update</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}