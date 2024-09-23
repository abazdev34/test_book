/** @format */

import React, { useEffect, useRef, useState } from "react"
import { IoPerson } from "react-icons/io5"
import { RxLapTimer } from "react-icons/rx"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../redux/store" // Assuming you have these types defined
import axiosInstance from "../../redux/features/auth/axiosAuthUtils"
import { getAllResults } from "../../redux/features/question/questionSlice"
import {
	formatTime,
	groupResultsByStudent,
	sortStudentResults,
} from "./studentsResultsFunc"

export interface IStudentResultSorted {
	student_id: string
	student_name: string
	correctAnswers: number
	wrongAnswers: number
	result: IStudentResultOneQuestion[]
	totalTime: number
}

export interface IStudentResultOneQuestion {
	answer: string
	collectionId: string
	collectionName: string
	created: string
	id: string
	isCorrect: boolean
	question: {
		a: string
		answer: string
		b: string
		c: string
		collectionId: string
		collectionName: string
		created: string
		d: string
		id: string
		question: string
		updated: string
	}
}

const StudentsResults: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>()
	const { allResults, loading, error } = useSelector(
		(state: RootState) => state.questions
	)
	const [sortedResults, setSortedResults] = useState<IStudentResultSorted[]>([])
	const [sortBy, setSortBy] = useState<string>("name")

	useEffect(() => {
		if (allResults.items?.length > 0) {
			const groupedResults = groupResultsByStudent(allResults.items)
			const sorted: IStudentResultSorted[] = sortStudentResults(
				groupedResults,
				sortBy
			)
			setSortedResults(sorted)
		}
	}, [allResults.items, sortBy])

	const handleSort = (criteria: string) => {
		setSortBy(criteria)
	}

	const runOnce = useRef(false)

	useEffect(() => {
		if (!runOnce.current) {
			dispatch(getAllResults())
			runOnce.current = true
		}
	}, [])

	const gaveAccess = async ({ access }: { access: boolean }) => {
		try {
			const response = await axiosInstance.patch(
				"/api/collections/isAdminGaveAcces/records/vwyp7szt8vbrw90",
				{
					isIt: access,
				}
			)

			localStorage.setItem("isAccess", access.toString())

			console.log("response", response)
		} catch (error) {
			console.error(error)
		}
	}

	const isAccess = localStorage.getItem("isAccess") === "true"

	if (loading) return <div className="text-center py-4">Жүктөлүүдө...</div>
	if (error)
		return <div className="text-center py-4 text-red-600">Ката: {error}</div>

	return (
		<div className="container mx-auto px-4 py-8">
			<h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
				Окуучулардын жыйынтыктары
			</h2>
			<div className="flex flex-wrap justify-center gap-2 mb-6">
				<button
					onClick={() => handleSort("name")}
					className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
				>
					Аты ⬇️
				</button>
				<button
					onClick={() => handleSort("time")}
					className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
				>
					Убакыт ⬇️
				</button>
				<button
					onClick={() => handleSort("correct")}
					className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
				>
					Туура ⬇️
				</button>
				<button
					onClick={() => handleSort("wrong")}
					className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
				>
					Ката ⬇️
				</button>
				<button
					onClick={() => gaveAccess({ access: !isAccess })}
					className="bg-purple-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
				>
					{isAccess ? "Жыйынтыкты жашыруу " : "Жыйынтыкты көрсөтүү"}
				</button>
			</div>
			{sortedResults.length > 0 ? (
				<ul className="space-y-4">
					{sortedResults.map((studentResult: IStudentResultSorted, index) => (
						<li
							key={studentResult.student_id}
							className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
						>
							<div className="flex items-center justify-between mb-4">
								<strong className="text-[14px] sm:text-lg md:text-xl text-gray-800 flex items-center gap-2">
									{index + 1}. <IoPerson />: {studentResult.student_name}
								</strong>
								<span className="text-sm text-gray-500 flex items-center gap-2">
									<RxLapTimer />: {formatTime(studentResult.totalTime)}
								</span>
							</div>
							<div className="flex justify-between items-center">
								<div className="flex items-center">
									<span className="text-green-500 font-bold mr-2">
										{studentResult.correctAnswers}
									</span>
									<span className="text-sm text-gray-600">Туура жооптор</span>
								</div>
								<div className="flex items-center">
									<span className="text-red-500 font-bold mr-2">
										{studentResult.wrongAnswers}
									</span>
									<span className="text-sm text-gray-600">Ката жооптор</span>
								</div>
							</div>
							<div className="mt-4 bg-red-500 rounded-full h-2">
								<div
									className="bg-green-500 h-2 rounded-full"
									style={{
										width: `${
											(studentResult.correctAnswers /
												(studentResult.correctAnswers +
													studentResult.wrongAnswers)) *
											100
										}%`,
									}}
								></div>
							</div>
						</li>
					))}
				</ul>
			) : (
				<p className="text-center text-gray-600">Жыйынтык табылган жок.</p>
			)}
		</div>
	)
}

export default StudentsResults
