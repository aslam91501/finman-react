import { addToast } from "@heroui/react"

export const useCustomToast = () => {
    const toast = (title: string, description?: string) => {
        addToast({
            title,
            description,
        })
    }

    return { toast }
}