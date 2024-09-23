/** @format */

import { useDispatch, useSelector } from "react-redux"
import { forgotPassword } from "../../../redux/features/auth/authSlice"
import React, { useState } from "react"

export default function ForgotPassword() {
	const dispatch = useDispatch()
	const [email, setEmail] = useState("")
	const error = useSelector((state: any) => state.auth.error)

	const handleSubmit = async (e: React.HTMLButtonElement<SubmitEvent>) => {
		e.preventDefault()
		try {
			await dispatch(forgotPassword({ email })).unwrap()
		} catch (err) {
			console.error("Failed to send reset email:", err)
		}
	}

	return (
		<div className="py-28">
			<form
				onSubmit={handleSubmit}
				className="flex flex-col gap-8 bg-blue-500 p-4 rounded-lg"
			>
				{error && <div className="text-red-500">{error}</div>}
				<div>
					<label htmlFor="email" className="text-white text-lg font-bold mb-4">
						Email почтаңызды жазыңыз
					</label>

					<input
						id="email"
						className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						type="email"
						placeholder="Email"
						value={email}
						onChange={e => setEmail(e.target.value)}
						required
					/>
				</div>
				<button
					className="text-blue-500  bg-white  focus:ring-4  font-medium rounded-lg text-md w-full sm:w-auto px-5 py-2.5 text-center"
					type="submit"
				>
					Submit
				</button>
			</form>
		</div>
	)
}
