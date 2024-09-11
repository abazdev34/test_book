/** @format */

import { useForm } from "react-hook-form"
import { login } from "../../../redux/features/auth/authSlice"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import useSignIn from "react-auth-kit/hooks/useSignIn"
import { Bounce, toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useSelector } from "react-redux"
import { useState } from "react"
import { MdOutlinePassword } from "react-icons/md"

export default function Login() {
	const signIn = useSignIn()
	const dispatch = useDispatch()
	const { register, handleSubmit } = useForm()
	const navigate = useNavigate()
	const error = useSelector(state => state.auth.error)
	const [showPassword, setShowPassword] = useState(false)

	const notifyError = text =>
		toast.error(text, {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "colored",
			transition: Bounce,
		})

	const onSubmit = async data => {
		try {
			const resultAction = await dispatch(
				login({ identity: data.email, password: data.password, signIn })
			)

			if (login.fulfilled.match(resultAction)) {
				navigate("/dashboard")
			} else {
				notifyError(error)
			}
		} catch (error) {
			console.log("error", error)
		}
	}

	const handleShowPassword = () => {
		setShowPassword(!showPassword)
	}

	return (
		<div className="flex flex-col justify-center items-center h-screen gap-4">
			<h1 className="text-center text-blue-500 text-3xl">Login</h1>
			<form
				action="#"
				className="max-w-[400px] w-full h-72 flex flex-col gap-4 p-4 rounded-md mx-auto bg-blue-400"
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className="flex flex-col gap-2 text-white font-semibold">
					<label htmlFor="email">Email</label>
					<input
						required
						{...register("email", { required: true })}
						className="authInputs text-blue-500 p-2 rounded-sm"
						type="text"
						id="email"
						placeholder="Enter your email"
					/>
				</div>

				<div className="flex flex-col gap-2 text-white font-semibold relative">
					<label htmlFor="password">Password</label>
					<input
						required
						{...register("password", { required: true })}
						className="authInputs text-blue-500 p-2 rounded-sm"
						type={showPassword ? "text" : "password"}
						id="password"
						placeholder="Enter your password"
					/>
					<button
						type="button"
						className="absolute right-4 top-[70%] text-black -translate-y-1/2"
						onClick={handleShowPassword}
					>
						<MdOutlinePassword />
					</button>
				</div>

				<button
					type="submit"
					className="py-2 px-4 text-blue-500 font-semibold text-xl border-none bg-white mt-[25px] rounded-md text-center"
				>
					Login
				</button>
			</form>
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="colored"
				transition={Bounce}
			/>
		</div>
	)
}
