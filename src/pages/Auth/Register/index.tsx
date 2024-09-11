/** @format */

import { useForm } from "react-hook-form"
import { signUp } from "../../../redux/features/auth/authSlice"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { MdOutlinePassword } from "react-icons/md"

export default function Register() {
	const dispatch = useDispatch()
	const { register, handleSubmit } = useForm()
	const navigate = useNavigate()
	const [showPassword, setShowPassword] = useState(false)

	const onSubmit = async (data: {
		email: string
		username: string
		password: string
	}) => {
		try {
			dispatch(
				signUp({
					email: data.email,
					username: data.username,
					password: data.password,
				})
			)
			localStorage.setItem("email", data.email)
			navigate("/verify-email")
		} catch (error) {
			console.log("error", error)
		}
		console.log("data", data)
	}

	return (
		<div className="flex flex-col justify-center items-center h-screen  gap-4  ">
			<h1 className="text-center text-blue-500 text-3xl ">Register</h1>
			<form
				action="#"
				className="max-w-[400px] w-full h-96 flex flex-col gap-4 p-4 rounded-md  mx-auto bg-blue-400"
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className="flex flex-col gap-2 text-white font-semibold">
					<label htmlFor="email">email</label>
					<input
						required
						{...register("email")}
						className="authInputs text-blue-500 p-2 rounded-sm "
						type="email"
						id="email"
						placeholder="Enter your email"
					/>
				</div>
				<div className="flex flex-col gap-2 text-white font-semibold">
					<label htmlFor="username">username</label>
					<input
						required
						{...register("username")}
						className="authInputs text-blue-500 p-2 rounded-sm"
						type="username"
						id="username"
						placeholder="Enter your username"
					/>
				</div>
				<div className="flex flex-col gap-2 text-white font-semibold relative">
					<label htmlFor="password">password</label>
					<input
						required
						{...register("password")}
						className="authInputs text-blue-500 p-2 rounded-sm"
						type={showPassword ? "text" : "password"}
						id="password"
						placeholder="Enter your password"
					/>
					<button
						type="button"
						className=" cursor-pointer absolute right-4 top-[70%]	text-black -translate-y-1/2"
						onClick={() => setShowPassword(!showPassword)}
					>
						<MdOutlinePassword />
					</button>
				</div>

				<button
					type="submit"
					className="py-2 px-4 text-blue-500 font-semibold text-xl border-none bg-white mt-[25px] rounded-md  text-center "
				>
					Register
				</button>
			</form>
		</div>
	)
}
