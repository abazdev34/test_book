/** @format */
import AuthOutlet from "@auth-kit/react-router/AuthOutlet"
import React, { useState } from "react"
import { FaSun } from "react-icons/fa"
import { MdModeNight } from "react-icons/md"
import { Route, Routes } from "react-router-dom"
import "./App.css"
import Header from "./components/Header"
import ProtectedAuthRoute from "./components/ProtectedRoutes/ProtectedRoute"
import ForgotPassword from "./pages/Auth/ForgotPassword/ForgotPassword"
import Login from "./pages/Auth/Login"
import Register from "./pages/Auth/Register"
import ResetPassword from "./pages/Auth/ResetPassword"
import VerifyEmail from "./pages/Auth/VerifyEmail"
import Home from "./pages/Home/"
import Dashboard from "./pages/Questions"
import Results from "./pages/Results"
// import { refresh } from "./components/RefreshToken"
// import createStore from "react-auth-kit/createStore"
const App: React.FC = () => {
	const [bgColor, setBgColor] = useState("white")
	document.body.setAttribute("style", `background: ${bgColor}`)
	// const store = createStore({
	// 	authName: "_auth",
	// 	authType: "cookie",
	// 	cookieDomain: window.location.hostname,
	// 	cookieSecure: window.location.protocol === "https:",
	// 	refresh: refresh,
	// })
	return (
		<div className="App">
			<div className="flex  justify-center gap-4 items-center flex-wrap">
				<Header />
				<button
					className="py-2  px-4 border-2 border-sky-500 rounded-md  text-center text-blue-500"
					onClick={() => setBgColor(bgColor === "white" ? "#34495e" : "white")}
				>
					{bgColor === "white" ? (
						<>
							<MdModeNight />
						</>
					) : (
						<>
							<FaSun />
						</>
					)}
				</button>
			</div>
			<div className="container">
				<Routes>
					<Route element={<AuthOutlet fallbackPath="/login" />}>
						<Route path="/" element={<Home />} />
						<Route path="/dashboard" element={<Dashboard />} />
						<Route path="/results" element={<Results />} />
					</Route>

					<Route element={<ProtectedAuthRoute redirectPath="/dashboard" />}>
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route path="/forgot-password" element={<ForgotPassword />} />
						<Route path="/verify-email" element={<VerifyEmail />} />
					</Route>

					<Route path="/reset-password" element={<ResetPassword />} />
				</Routes>
			</div>
		</div>
	)
}

export default App
