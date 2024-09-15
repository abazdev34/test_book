/** @format */

import React, { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { MdOutlinePassword } from "react-icons/md"
import { useDispatch } from "react-redux"
import { resetPassword } from "../../../redux/features/auth/authSlice"

const PasswordResetComponent = () => {
	const { token } = useParams()
	const [password, setPassword] = useState("")
	const [passwordConfirm, setpasswordConfirm] = useState("")
	const [error, setError] = useState("")
	const [success, setSuccess] = useState(false)
	const [showPassword, setShowPassword] = useState(false)
	const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setError("")

		if (password !== passwordConfirm) {
			setError("Сырсөздөр дал келбейт")
			return
		}

		if (!token) {
			setError("Жараксыз токен")
			return
		}

		try {
			const resultAction = await dispatch(
				resetPassword({ token, password, passwordConfirm })
			)
			if (resetPassword.fulfilled.match(resultAction)) {
				setSuccess(true)
				setTimeout(() => navigate("/login"), 3000)
			} else {
				setError("Сырсөздү кайра коюу мүмкүн болбоду. Кайра аракет кылыңыз.")
			}
		} catch (err) {
			setError("Сырсөздү кайра коюу мүмкүн болбоду. Кайра аракет кылыңыз.")
		}
	}

	const togglePasswordVisibility = (field: "password" | "confirm") => {
		if (field === "password") {
			setShowPassword(!showPassword)
		} else {
			setShowPasswordConfirm(!showPasswordConfirm)
		}
	}

	if (success) {
		return (
			<div className="max-w-md mx-auto mt-8 p-6 bg-blue-100 rounded-lg shadow-md text-blue-800">
				Сырсөз ийгиликтүү кайра коюлду. Кирүү бетине багытталууда...
			</div>
		)
	}

	return (
		<div className="flex flex-col justify-center items-center min-h-screen bg-blue-50 p-4">
			<div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
				<h2 className="text-3xl font-bold mb-6 text-blue-600 text-center">
					Сырсөздү кайра коюу
				</h2>
				{error && (
					<div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
						{error}
					</div>
				)}
				<form onSubmit={handleSubmit} className="space-y-6">
					<div>
						<label
							htmlFor="password"
							className="block text-sm font-medium text-blue-700 mb-1"
						>
							Жаңы сырсөз
						</label>
						<div className="relative">
							<input
								type={showPassword ? "text" : "password"}
								id="password"
								value={password}
								onChange={e => setPassword(e.target.value)}
								required
								className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
							<button
								type="button"
								className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500"
								onClick={() => togglePasswordVisibility("password")}
							>
								<MdOutlinePassword />
							</button>
						</div>
					</div>
					<div>
						<label
							htmlFor="passwordConfirm"
							className="block text-sm font-medium text-blue-700 mb-1"
						>
							Жаңы сырсөздү ырастоо
						</label>
						<div className="relative">
							<input
								type={showPasswordConfirm ? "text" : "password"}
								id="passwordConfirm"
								value={passwordConfirm}
								onChange={e => setpasswordConfirm(e.target.value)}
								required
								className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
							<button
								type="button"
								className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500"
								onClick={() => togglePasswordVisibility("confirm")}
							>
								<MdOutlinePassword />
							</button>
						</div>
					</div>
					<button
						type="submit"
						className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-300"
					>
						Сырсөздү кайра коюу
					</button>
				</form>
			</div>
		</div>
	)
}

export default PasswordResetComponent
