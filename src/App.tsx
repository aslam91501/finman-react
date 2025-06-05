import { Route, Routes } from "react-router-dom"
import { AuthenticatedLayout } from "./layout/authenticated"
import { SignupPage } from "./auth/pages/signup"
import { UnauthenticatedLayout } from "./layout/unauthenticated"
import { LoginPage } from "./auth/pages/login"
import { ResetPasswordPage } from "./auth/pages/reset-password"

export const App = () => {
	return (
		<Routes>
			<Route path="/dashboard" element={<AuthenticatedLayout />} />
			<Route element={<UnauthenticatedLayout />}>
				<Route path="/signup" element={<SignupPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/reset-password" element={<ResetPasswordPage />} />
			</Route>
		</Routes>
	)
}