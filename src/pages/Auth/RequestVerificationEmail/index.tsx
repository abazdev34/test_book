/** @format */

import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { resendVerificationEmail } from "../../../redux/features/auth/authSlice"
import { RootState } from "../../../redux/store"
import { ToastContainer, Bounce } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const ResendVerificationEmail: React.FC = () => {
	const dispatch = useDispatch()
	const [email, setEmail] = useState("")
	const loading = useSelector((state: RootState) => state.auth.loading)
	const error = useSelector((state: RootState) => state.auth.error)

	const handleResendVerification = async (e: React.FormEvent) => {
		e.preventDefault()
		if (email) {
			await dispatch(resendVerificationEmail({ email }))
		}
	}

	return (
		<div className="flex flex-col justify-center items-center h-screen gap-4">
			<h1 className="text-center text-blue-500 text-3xl">
				Текшерүү электрондук катын кайра жөнөтүү
			</h1>

			<div className="max-w-[400px] w-full bg-blue-400 p-4 rounded-md">
				<p className="text-white mb-4">
					Эгерде сиз текшерүү электрондук катын албаган болсоңуз, төмөнкү
					нускамаларды аткарыңыз:
				</p>
				<ol className="text-white list-decimal list-inside mb-4">
					<li>Электрондук почта дарегиңизди төмөндөгү талаага жазыңыз.</li>
					<li>"Кайра жөнөтүү" баскычын басыңыз.</li>
					<li>Электрондук почтаңызды текшериңиз.</li>
					<li>Келген катта көрсөтүлгөн нускамаларды аткарыңыз.</li>
				</ol>
			</div>

			<form
				onSubmit={handleResendVerification}
				className="max-w-[400px] w-full flex flex-col gap-4 p-4 rounded-md mx-auto bg-blue-400"
			>
				<InputField
					label="Электрондук почта"
					id="email"
					type="email"
					placeholder="Электрондук почтаңызды жазыңыз"
					value={email}
					onChange={e => setEmail(e.target.value)}
				/>
				<button
					type="submit"
					disabled={loading}
					className="py-2 px-4 text-blue-500 font-semibold text-xl border-none bg-white mt-[25px] rounded-md text-center"
				>
					{loading ? "Жөнөтүлүүдө..." : "Кайра жөнөтүү"}
				</button>
			</form>
			{error && (
				<div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg max-w-[400px] w-full">
					{error}
				</div>
			)}
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

const InputField = ({ label, id, type, placeholder, value, onChange }) => (
	<div className="flex flex-col gap-2 text-white font-semibold">
		<label htmlFor={id}>{label}</label>
		<input
			required
			className="authInputs text-blue-500 p-2 rounded-sm"
			type={type}
			id={id}
			placeholder={placeholder}
			value={value}
			onChange={onChange}
		/>
	</div>
)

export default ResendVerificationEmail
