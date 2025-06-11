import { addToast } from "@heroui/react"
import { useState } from "react";

export const useCustomToast = () => {
    const toast = (title: string, description?: string) => {
        addToast({
            title,
            description,
        })
    }

    return { toast }
}



export const useMultiModal = () => {
    const [isOpen, setIsOpen] = useState<Map<string, boolean>>(new Map<string, boolean>());

    const toggle = (id: string) => {
        setIsOpen((prev) => {
            const newState = new Map(prev);

            newState.set(id, !prev.get(id));

            return newState;
        });
    }

    return {
        isOpen,
        toggle
    }
}

