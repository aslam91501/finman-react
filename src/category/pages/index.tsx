import { Button, Input, Spacer, useDisclosure } from "@heroui/react"
import { Filter, Plus, Search } from "lucide-react"
import { useCreateCategory, useGetCategories } from "../config/hooks";
import { CategoriesTable } from "../components/categories-table";
import { NewCategoryForm } from "../components/new-category-form";

export const CategoriesPage = () => {
    const { isOpen, onOpenChange } = useDisclosure();
    const { createCategory } = useCreateCategory();

    const { data, isLoading, isError } = useGetCategories();

    if (isLoading) {
        return <div>Loading...</div>
    }
    if (isError) {
        return <div>Error</div>
    }

    return (
        <div className="flex flex-col gap-5">
            <h1 className="text-2xl font-medium">Categories</h1>

            <div className="flex justify-between items-center">
                <div className="basis-1/3">
                    <Input placeholder="Search" variant="flat" startContent={<Search size={14} />} />
                </div>

                <Spacer />

                <div className="flex gap-2">
                    <Button variant="light" endContent={<Filter size={14} />}>Filters</Button>
                    <Button onPress={onOpenChange} variant="solid" color="primary" endContent={<Plus size={14} />}>New Category</Button>
                </div>
            </div>
            <NewCategoryForm
                onOpenChange={onOpenChange}
                handleCreate={(data) => { createCategory(data); onOpenChange(); }}
                isOpen={isOpen} />

            <CategoriesTable data={data!} />
        </div>
    )
}



