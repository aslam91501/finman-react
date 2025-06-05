import { HeroUIProvider, ToastProvider } from "@heroui/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { BrowserRouter } from "react-router-dom"

export const Providers = ({ children }: { children: React.ReactNode }) => {
    const queryClient = new QueryClient()

    return (
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <HeroUIProvider>
                    <ToastProvider />
                    {children}
                </HeroUIProvider>
                <ReactQueryDevtools />
            </QueryClientProvider>
        </BrowserRouter>
    )
}