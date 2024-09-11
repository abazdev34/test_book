/** @format */
import React, { useState } from "react"
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home/"
import Dashboard from "./pages/Dashboard"
import Header from "./components/Header"
import Register from "./pages/Auth/Register"
import Login from "./pages/Auth/Login"
import AuthOutlet from "@auth-kit/react-router/AuthOutlet"
import "./App.css"
import VerifyEmail from "./pages/Auth/VerifyEmail"
import ResetPassword from "./pages/Auth/ResetPassword"
import ForgotPassword from "./pages/Auth/ForgotPassword/ForgotPassword"
import ProtectedAuthRoute from "./components/ProtectedRoutes/ProtectedRoute"
import { MdModeNight } from "react-icons/md"
import { FaSun } from "react-icons/fa"
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
						<Route path="/" element={<Home bgColor={bgColor} />} />
						<Route path="/dashboard" element={<Dashboard />} />
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
