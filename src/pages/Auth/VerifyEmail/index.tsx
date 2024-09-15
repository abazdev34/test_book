/** @format */

import React from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { verifyEmail } from "../../../redux/features/auth/authSlice"

const EmailVerificationComponent = () => {
	const { token } = useParams()
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const handleVerification = async () => {
		if (token) {
			try {
				const resultAction = await dispatch(verifyEmail({ token }))
				if (verifyEmail.fulfilled.match(resultAction)) {
					// Верификация ийгиликтүү болду
					alert("Электрондук почта ийгиликтүү текшерилди!")
					navigate("/login") // Колдонуучуну кирүү бетине багыттоо
				} else {
					// Верификация катасы
					alert(
						"Электрондук почтаны текшерүүдө ката кетти. Кайра аракет кылыңыз."
					)
				}
			} catch (error) {
				console.error("Верификация катасы:", error)
				alert(
					"Электрондук почтаны текшерүүдө ката кетти. Кайра аракет кылыңыз."
				)
			}
		} else {
			alert(
				"Жараксыз токен. Сураныч, электрондук почтаңыздагы шилтемени текшериңиз."
			)
		}
	}

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
			<div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
				<h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
					Электрондук почтаны текшерүү
				</h2>
				<p className="mb-6 text-center text-gray-700">
					Электрондук почтаңызды текшерүү үчүн төмөнкү баскычты басыңыз. Эгер
					сиз бул бетке каталык менен келип калган болсоңуз, анда электрондук
					почтаңыздагы шилтемени колдонуңуз.
				</p>
				<button
					onClick={handleVerification}
					className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-300"
				>
					Электрондук почтаны текшерүү
				</button>
			</div>
		</div>
	)
}

export default EmailVerificationComponent
