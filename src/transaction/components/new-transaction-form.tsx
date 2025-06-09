import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Textarea } from "@heroui/react"
import { NewTransactionSchema, type NewTransactionRequest } from "../config/models"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRef } from "react"

interface Props {
    onOpenChange: () => void,
    isOpen: boolean,
    handleCreate: (req: NewTransactionRequest) => void
}

export const NewTransactionForm = ({ onOpenChange, isOpen, handleCreate }: Props) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<NewTransactionRequest>({
        resolver: zodResolver(NewTransactionSchema),
        defaultValues: {
            date: new Date(),
            type: 'EXPENSE'
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
                <ModalHeader>New Transaction</ModalHeader>
                <ModalBody>
                    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
                        <Input
                            label="Title"
                            isInvalid={!!errors.title}
                            errorMessage={errors.title?.message}
                            {...register("title")}
                        />

                        <Input
                            label="Amount"
                            isInvalid={!!errors.amount}
                            errorMessage={errors.amount?.message}
                            {...register("amount", { valueAsNumber: true })}
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

                        <Textarea
                            label="Notes"
                            isInvalid={!!errors.notes}
                            errorMessage={errors.notes?.message}
                            {...register("notes")}
                        />

                        <button type="submit" className="hidden" ref={submitRef}>Submit</button>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button onPress={onOpenChange}>Cancel</Button>
                    <Button color="primary" onPress={() => submitRef.current?.click()}>Add Transaction</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}