/** @format */

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { signUp } from "../../../redux/features/auth/authSlice"
import { MdOutlinePassword } from "react-icons/md"
import { Bounce, toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export default function Register() {
	const dispatch = useDispatch()
	const { register, handleSubmit } = useForm()
	const navigate = useNavigate()
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
			const result = await dispatch(
				signUp({
					email: data.email,
					username: data.username,
					password: data.password,
					role: "student",
					isVerified: true,
					name: data.name,
					surname: data.surname,
				})
			).unwrap()

			if (result) {
				localStorage.setItem("email", data.email)
				toast.success("Ийгиликтүү катталды!")
				navigate("/request/verification")
			}
		} catch (error) {
			console.error("Каттоодогу ката:", error)
			notifyError(error.message || "Каттоодо ката кетти")
		}
	}

	return (
		<div className="flex flex-col justify-center items-center h-screen gap-4">
			<h1 className="text-center text-blue-500 text-3xl">Каттоо</h1>
			<form
				action="#"
				className="max-w-[400px] w-full flex flex-col gap-4 p-4 rounded-md mx-auto bg-blue-400"
				onSubmit={handleSubmit(onSubmit)}
			>
				<InputField
					label="Электрондук почта"
					id="email"
					type="email"
					placeholder="Электрондук почтаңызды жазыңыз"
					register={register}
				/>
				<InputField
					label="Логин"
					id="username"
					type="text"
					placeholder="Колдонуучу атыңызды жазыңыз"
					register={register}
				/>
				<InputField
					label="Аты"
					id="name"
					type="text"
					placeholder="Атыңызды жазыңыз"
					register={register}
				/>
				<InputField
					label="Фамилиясы"
					id="surname"
					type="text"
					placeholder="Фамилияңызды жазыңыз"
					register={register}
				/>
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
						onClick={() => setShowPassword(!showPassword)}
					>
						<MdOutlinePassword />
					</button>
				</div>
				<button
					type="submit"
					className="py-2 px-4 text-blue-500 font-semibold text-xl border-none bg-white mt-[25px] rounded-md text-center"
				>
					Каттоо
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

const InputField = ({ label, id, type, placeholder, register }) => (
	<div className="flex flex-col gap-2 text-white font-semibold">
		<label htmlFor={id}>{label}</label>
		<input
			required
			{...register(id, { required: true })}
			className="authInputs text-blue-500 p-2 rounded-sm"
			type={type}
			id={id}
			placeholder={placeholder}
		/>
	</div>
)
