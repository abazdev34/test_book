/** @format */

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useNavigate } from "react-router-dom"
import useSignIn from "react-auth-kit/hooks/useSignIn"
import { Bounce, toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { login } from "../../../redux/features/auth/authSlice"
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
				window.location.reload()
				navigate("/")
			} else {
				notifyError(error)
			}
		} catch (error) {
			console.log("ката", error)
		}
	}

	const handleShowPassword = () => {
		setShowPassword(!showPassword)
	}

	return (
		<div className="flex flex-col justify-center items-center h-screen gap-4">
			<h1 className="text-center text-blue-500 text-3xl">Кирүү</h1>
			<form
				action="#"
				className="max-w-[400px] w-full h-72 flex flex-col gap-4 p-4 rounded-md mx-auto bg-blue-400"
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className="flex flex-col gap-2 text-white font-semibold">
					<label htmlFor="email">Логин</label>
					<input
						required
						{...register("email", { required: true })}
						className="authInputs text-blue-500 p-2 rounded-sm"
						type="text"
						id="email"
						placeholder="Электрондук почтаңызды жазыңыз"
					/>
				</div>

				<div className="flex flex-col gap-2 text-white font-semibold relative">
					<label htmlFor="password">Сырсөз</label>
					<input
						required
						{...register("password", { required: true })}
						className="authInputs text-blue-500 p-2 rounded-sm"
						type={showPassword ? "text" : "password"}
						id="password"
						placeholder="Сырсөзүңүздү жазыңыз"
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
					Кирүү
				</button>
			</form>
			<NavLink to="/auth/request/reset_password">
				Сыр сөздү унутуп калдыңызбы?
			</NavLink>

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
