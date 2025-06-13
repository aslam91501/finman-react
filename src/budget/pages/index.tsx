import { Button, Card } from "@heroui/react"
import { ChevronDown } from "lucide-react"
import { BudgetTable } from "../components/budget-table"
import { useGetBudgetList, useSetBudget, useDeleteBudget } from "../config/hooks"

export const BudgetPage = () => {
    const { budgetList, isLoading } = useGetBudgetList();
    const { setBudget } = useSetBudget();
    const { deleteBudget } = useDeleteBudget();

    if (isLoading) {
        return <div>Loading...</div>
    }
    return (
        <div className="flex flex-col gap-5">
            <h1 className="text-2xl font-medium">Budget</h1>

            <div className="flex justify-end items-center gap-2">
                <Button variant="light" endContent={<ChevronDown size={14} />}>2025</Button>
            </div>


            <BudgetTable
                data={budgetList || []}
                handleUpdate={(req) => setBudget(req)}
                handleDelete={(month, year) => deleteBudget({ month, year })}
            />
        </div>
    )
}


export const BudgetCard = () => {
    return (
        <Card shadow="sm" className="flex flex-row justify-between items-center p-5">
            <div>
                <p className="text-lg ">1 Jun 2025 - 30 Jun 2025</p>
                <p className="mt-2 font-medium">32000</p>
            </div>

            <div>
                <Button color="primary" size="sm">Edit</Button>
            </div>
        </Card>
    )
}