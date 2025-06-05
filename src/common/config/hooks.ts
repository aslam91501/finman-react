import { addToast } from "@heroui/react"

export const useToast = () => {
    const toast = (title: string, description?: string) => {
        addToast({
            title,
            description,
        })
    }

    return { toast }
}