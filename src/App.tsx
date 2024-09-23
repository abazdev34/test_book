/** @format */
import AuthOutlet from "@auth-kit/react-router/AuthOutlet"
import React from "react"

import { Route, Routes } from "react-router-dom"
import "./App.css"
import Header from "./components/Header"
import ProtectedAuthRoute from "./components/ProtectedRoutes/ProtectedRoute"
import ForgotPassword from "./pages/Auth/ForgotPassword/ForgotPassword"
import Login from "./pages/Auth/Login"
import Register from "./pages/Auth/Register"
import ResetPassword from "./pages/Auth/ResetPassword"
import VerifyEmail from "./pages/Auth/VerifyEmail"
import Home from "./pages/Home"
import Dashboard from "./pages/Questions"
import Results from "./pages/Results"
import StudentsResults from "./pages/admin/studentsResults"
import AllStudentsResultsShow from "./pages/AllStudentsResultShow/AllStudentsResultShow"
import ResendVerificationEmail from "./pages/Auth/RequestVerificationEmail"
import AdminAddQuestions from "./pages/admin/adminAddQuestions"
import AdminPanel from "./pages/admin/adminAddQuestions"
// import { refresh } from "./components/RefreshToken"
// import createStore from "react-auth-kit/createStore"
const App: React.FC = () => {
	// const store = createStore({
	// 	authName: "_auth",
	// 	authType: "cookie",
	// 	cookieDomain: window.location.hostname,
	// 	cookieSecure: window.location.protocol === "https:",
	// 	refresh: refresh,
	// })
	return (
		<div className="app">
			<Header />

			<div className="container">
				<Routes>
					<Route element={<AuthOutlet fallbackPath="/register" />}>
						<Route path="/" element={<Home />} />
						<Route path="/dashboard" element={<Dashboard />} />
						<Route path="/results" element={<Results />} />
						<Route path="/all_results" element={<AllStudentsResultsShow />} />
						<Route path="/admin" element={<StudentsResults />} />
						<Route path="/adminPanel" element={<AdminPanel />} />

						<Route path="/add_questions" element={<AdminAddQuestions />} />
					</Route>

					<Route element={<ProtectedAuthRoute redirectPath="/" />}>
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route path="/forgot-password" element={<ForgotPassword />} />
						<Route path="/verify-email/:token" element={<VerifyEmail />} />
						<Route
							path="/request/verification"
							element={<ResendVerificationEmail />}
						/>
					</Route>

					<Route
						path="/auth/reset_password/:token"
						element={<ResetPassword />}
					/>

					<Route
						path="/auth/request/reset_password"
						element={<ForgotPassword />}
					/>
				</Routes>
			</div>
		</div>
	)
}

export default App
