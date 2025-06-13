import { Navigate, Route, Routes } from "react-router-dom"
import { AuthenticatedLayout } from "./layout/authenticated"
import { SignupPage } from "./auth/pages/signup"
import { UnauthenticatedLayout } from "./layout/unauthenticated"
import { LoginPage } from "./auth/pages/login"
import { ResetPasswordPage } from "./auth/pages/reset-password"
import { DashboardPage } from "./dashboard"
import { TransactionsPage } from "./transaction/pages"
import { CategoriesPage } from "./category/pages"
import { BudgetPage } from "./budget/pages"

export const App = () => {
	return (
		<Routes>
			<Route path="/" element={<Navigate to='/login' />} />
			<Route element={<AuthenticatedLayout />}>
				<Route path="/dashboard" element={<DashboardPage />} />
				<Route path="/transactions" element={<TransactionsPage />} />
				<Route path="/categories" element={<CategoriesPage />} />
				<Route path="/budget" element={<BudgetPage />} />
			</Route>
			<Route element={<UnauthenticatedLayout />}>
				<Route path="/signup" element={<SignupPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/reset-password" element={<ResetPasswordPage />} />
			</Route>
		</Routes>
	)
}