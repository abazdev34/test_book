/** @format */

import React, { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getResults } from "../../redux/features/question/questionSlice"
import useAuthUser from "react-auth-kit/hooks/useAuthUser"
import { IStudentResultOneQuestion } from "../admin/studentsResults"

export default function Results() {
	const dispatch = useDispatch()
	const results = useSelector(state => state.questions.results)
	const auth = useAuthUser()

	const fetchOnce = useRef(false)
	useEffect(() => {
		if (!fetchOnce.current) {
			dispatch(getResults({ student_id: auth.userId }))
		}
		return () => {
			fetchOnce.current = true
		}
	}, [])

	const correctAnswers =
		results.items?.filter(
			(result: IStudentResultOneQuestion) => result.isCorrect
		).length || 0
	const totalQuestions = results.items?.length || 0
	const incorrectAnswers = totalQuestions - correctAnswers
	const correctPercentage =
		totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0

	return (
		<div className="container mx-auto p-4  min-h-screen">
			<h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
				Сиздин тесттин жыйынтыгы
			</h1>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				<div className="lg:col-span-1">
					<div className="bg-white p-6 rounded-xl shadow-2xl">
						<h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">
							Жыйынтык
						</h2>
						<div className="flex justify-center mb-6">
							<div className="relative w-48 h-48">
								<svg
									className="w-full h-full transform -rotate-90"
									viewBox="0 0 100 100"
								>
									<circle
										cx="50"
										cy="50"
										r="45"
										fill="none"
										stroke="red"
										strokeWidth="10"
									/>
									<circle
										cx="50"
										cy="50"
										r="45"
										fill="none"
										stroke="#4CAF50"
										strokeWidth="10"
										strokeDasharray={`${correctPercentage * 2.83}, 283`}
									/>
								</svg>
								<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
									<div className="text-4xl font-bold text-gray-800">
										{correctPercentage.toFixed(0)}%
									</div>
									<div className="text-sm text-gray-600">Туура</div>
								</div>
							</div>
						</div>
						<div className="flex justify-between text-center">
							<div className="bg-green-100 p-4 rounded-lg flex-1 mr-2">
								<div className="text-3xl font-bold text-green-600">
									{correctAnswers}
								</div>
								<div className="text-sm text-green-800">Туура</div>
							</div>
							<div className="bg-red-100 p-4 rounded-lg flex-1 ml-2">
								<div className="text-3xl font-bold text-red-600">
									{incorrectAnswers}
								</div>
								<div className="text-sm text-red-800">Ката</div>
							</div>
						</div>
					</div>
				</div>

				<div className="lg:col-span-2">
					<div className="bg-white p-6 rounded-xl shadow-lg">
						<h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">
							Толук маалымат
						</h2>
						<div className="space-y-6 max-h-[calc(100vh-300px)] overflow-y-auto pr-4">
							{results.items?.map(
								(result: IStudentResultOneQuestion, idx: number) => (
									<div
										key={idx}
										className={`p-6 rounded-xl ${
											result.isCorrect ? "bg-green-50" : "bg-red-50"
										} border-2 ${
											result.isCorrect ? "border-green-200" : "border-red-200"
										}`}
									>
										<p className="font-semibold text-lg mb-4 text-gray-800">
											{idx + 1}. {result.question.question}
										</p>
										<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
											{["a", "b", "c", "d"].map(option => (
												<div
													key={option}
													className={`p-4 rounded-lg transition-all duration-200 ${
														result.answer === option
															? "bg-blue-200 border-blue-500"
															: result.question.answer ===
															  result.question[option]
															? "bg-green-100 border-green-500"
															: "bg-gray-100 border-gray-300"
													} border-2`}
												>
													<span className="font-bold mr-2">
														{option.toUpperCase()})
													</span>
													{result.question[option]}
													{result.answer === option && (
														<span className="ml-2 font-semibold text-blue-700">
															← Сиздин жооп
														</span>
													)}
													{result.question.answer ===
														result.question[option] && (
														<span className="ml-2 font-semibold text-green-700">
															✓ Туура
														</span>
													)}
												</div>
											))}
										</div>
									</div>
								)
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
