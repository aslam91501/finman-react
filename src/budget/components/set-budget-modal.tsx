import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Select, SelectItem } from "@heroui/react";
import { useIsAuthenticated } from "../../auth/config/hooks";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { type BudgetRequest, BudgetSchema } from "../config/models";
import { useBudgetFilters } from "../config/hooks";

interface Props {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    month: number,
    amount?: number,
    handleUpdate: (req: BudgetRequest) => void;
}

export const SetBudgetModal = ({ isOpen, onOpenChange, month, amount, handleUpdate }: Props) => {
    const { userData } = useIsAuthenticated();
    const { year } = useBudgetFilters();

    const { register, handleSubmit, formState: { errors } } = useForm<BudgetRequest>({
        resolver: zodResolver(BudgetSchema),
        defaultValues: {
            year: year,
            month: month,
            amount: amount,
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
                <ModalHeader>Set Budget</ModalHeader>
                <ModalBody>
                    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
                        <Input
                            label="Year"
                            isInvalid={!!errors.year}
                            errorMessage={errors.year?.message}
                            {...register("year", { valueAsNumber: true, setValueAs: (value) => Number(value) })}
                            isDisabled
                        />

                        <Select
                            label="Month"
                            isInvalid={!!errors.month}
                            errorMessage={errors.month?.message}
                            defaultSelectedKeys={[month.toString()]}
                            isDisabled
                        >
                            <SelectItem key={'1'}>January</SelectItem>
                            <SelectItem key={'2'}>February</SelectItem>
                            <SelectItem key={'3'}>March</SelectItem>
                            <SelectItem key={'4'}>April</SelectItem>
                            <SelectItem key={'5'}>May</SelectItem>
                            <SelectItem key={'6'}>June</SelectItem>
                            <SelectItem key={'7'}>July</SelectItem>
                            <SelectItem key={'8'}>August</SelectItem>
                            <SelectItem key={'9'}>September</SelectItem>
                            <SelectItem key={'10'}>October</SelectItem>
                            <SelectItem key={'11'}>November</SelectItem>
                            <SelectItem key={'12'}>December</SelectItem>
                        </Select>

                        <Input
                            label="Amount"
                            isInvalid={!!errors.amount}
                            errorMessage={errors.amount?.message}
                            {...register("amount", { valueAsNumber: true, setValueAs: (value) => Number(value) })}
                        />


                        <button type="submit" className="hidden" ref={submitRef}>Submit</button>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button variant="light" onPress={() => onOpenChange(false)}>Cancel</Button>
                    <Button color="primary" onPress={() => submitRef.current?.click()}>Set</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}