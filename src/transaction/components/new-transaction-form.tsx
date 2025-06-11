import { Button, CalendarDate, DatePicker, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Textarea } from "@heroui/react"
import { NewTransactionSchema, type NewTransactionRequest } from "../config/models"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useEffect, useRef, useState } from "react"
import { useIsAuthenticated } from "../../auth/config/hooks"
import { useGetCategories } from "../../category/config/hooks"
import { getLocalTimeZone } from "@internationalized/date"

interface Props {
    onOpenChange: () => void,
    isOpen: boolean,
    handleCreate: (req: NewTransactionRequest) => void
}

export const NewTransactionForm = ({ onOpenChange, isOpen, handleCreate }: Props) => {
    const { userData } = useIsAuthenticated();
    const { data: categories } = useGetCategories();

    const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm<NewTransactionRequest>({
        resolver: zodResolver(NewTransactionSchema),
        defaultValues: {
            date: new Date(),
            type: 'EXPENSE',
            userId: userData?.id!
        }
    })

    const [date, setDate] = useState<CalendarDate | null>();

    useEffect(() => {
        setValue('date', date?.toDate(getLocalTimeZone()) || new Date())
    }, [date])


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

                        <DatePicker
                            isInvalid={!!errors.date}
                            errorMessage={errors.date?.message}
                            isRequired
                            showMonthAndYearPickers
                            value={date}
                            onChange={setDate}
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

                        <Select
                            label="Category"
                            isInvalid={!!errors.categoryId}
                            errorMessage={errors.categoryId?.message}
                            {...register('categoryId')}
                        >
                            {categories ? categories.filter((category) => category.type === watch('type'))?.map((category) => (
                                <SelectItem key={category.id}>{category.name}</SelectItem>
                            )) : null}
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