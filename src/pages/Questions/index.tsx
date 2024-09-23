/** @format */

import React, { useEffect, useRef, useState, useCallback } from "react"
import useAuthUser from "react-auth-kit/hooks/useAuthUser"
import { useDispatch, useSelector } from "react-redux"
import {
	getQuestions,
	submitAnswer,
} from "../../redux/features/question/questionSlice"
import { useTimer } from "./useTimer"

interface Question {
	id: string
	question_title: string
	question: string
	a: string
	b: string
	c: string
	d: string
	answer: string
}

interface RootState {
	questions: {
		questions: Question[]
		loading: boolean
		error: string | null
	}
}

export default function Dashboard() {
	const variants = ["А", "Б", "В", "Г"]
	const auth = useAuthUser()
	const dispatch = useDispatch()
	const { questions, loading, error } = useSelector(
		(state: RootState) => state.questions
	)
	const [questionNumber, setQuestionNumber] = useState<number>(1)
	const [selectedAnswer, setSelectedAnswer] = useState<string>("")
	const { timeLeft, startTimer, stopTimer, resetTimer } = useTimer(60)
	const [isFinished, setIsFinished] = useState<boolean>(false)
	const fetchOnce = useRef<boolean>(false)
	const [isCorrect, setIsCorrect] = useState<boolean>(false)

	useEffect(() => {
		const savedQuestionNumber = localStorage.getItem("questionNumber")
		const savedIsFinished = localStorage.getItem("isFinished")

		if (savedQuestionNumber) {
			setQuestionNumber(parseInt(savedQuestionNumber))
		}

		if (savedIsFinished === "true") {
			setIsFinished(true)
		}

		if (!fetchOnce.current && !isFinished && questions.length === 0) {
			dispatch(getQuestions())
			fetchOnce.current = true
		}
	}, [])

	useEffect(() => {
		if (questions.length > 0 && !isFinished) {
			startTimer()
		}
	}, [questions, questionNumber, startTimer, isFinished])

	useEffect(() => {
		if (timeLeft === 0) {
			const currentQuestion = questions[questionNumber - 1]
			const isCorrect =
				currentQuestion?.answer ===
				currentQuestion[selectedAnswer as keyof Question]

			setTimeout(() => {
				dispatch(
					submitAnswer({
						student_id: auth?.userId,
						questionId: currentQuestion.id,
						answer: selectedAnswer,
						isCorrect: isCorrect,
						timeSpent: 60 - timeLeft,
						question: currentQuestion,
						student_name: auth?.student_name,
					})
				)
			}, 2000)
			handleNextQuestion()
		}
	}, [timeLeft])

	const handleAnswerSelect = useCallback((answer: string) => {
		setSelectedAnswer(answer)
	}, [])

	const checkAnswer = useCallback(
		(answer: string) => {
			const currentQuestion = questions[questionNumber - 1]
			const isCorrect =
				currentQuestion.answer === currentQuestion[answer as keyof Question]
			setIsCorrect(isCorrect)
			dispatch(
				submitAnswer({
					student_id: auth?.userId,
					questionId: currentQuestion.id,
					answer: answer,
					isCorrect: isCorrect,
					timeSpent: 60 - timeLeft,
					question: currentQuestion,
					student_name: auth?.student_name,
				})
			)
		},
		[auth, dispatch, questionNumber, questions, timeLeft]
	)

	const handleNextQuestion = useCallback(() => {
		if (selectedAnswer) {
			checkAnswer(selectedAnswer)
		}

		if (questionNumber < questions.length) {
			const nextQuestionNumber = questionNumber + 1
			setQuestionNumber(nextQuestionNumber)
			localStorage.setItem("questionNumber", nextQuestionNumber.toString())
			setSelectedAnswer("")
			resetTimer()
		} else {
			stopTimer()
			alert("Тест бүттү!")
			localStorage.setItem("isFinished", "true")
			localStorage.setItem("questionNumber", "1")
			setIsFinished(true)
		}
	}, [
		selectedAnswer,
		checkAnswer,
		questionNumber,
		questions.length,
		resetTimer,
		stopTimer,
	])

	if (isFinished)
		return (
			<div className="flex items-center justify-center h-screen bg-gray-100">
				<p className="text-xl text-center p-4 bg-white shadow rounded">
					Тестти тапшыргансыз кийинки окуучуга орун бериңиз!
				</p>
			</div>
		)

	if (loading)
		return (
			<div className="flex items-center justify-center h-screen bg-gray-100">
				<p className="text-xl">Жүктөлүүдө...</p>
			</div>
		)

	if (error)
		return (
			<div className="flex items-center justify-center h-screen bg-gray-100">
				<p className="text-xl text-red-500">Ката : {error}</p>
			</div>
		)

	if (questions.length === 0)
		return (
			<div className="flex items-center justify-center h-screen bg-gray-100">
				<p className="text-xl">No questions available.</p>
			</div>
		)

	const currentQuestion = questions[questionNumber - 1]

	return (
		<div className="max-w-4xl mx-auto p-4 bg-gray-100 min-h-screen">
			<h1 className="text-2xl md:text-3xl mb-4 text-center">
				Кош келдиңиз{" "}
				<span className="font-bold text-orange-500">{auth?.student_name}</span>!
			</h1>

			<div className="mb-6 bg-white shadow rounded p-4">
				<h2 className="text-xl font-bold mb-2">
					{currentQuestion.question_title}
				</h2>
				<p
					className={`text-lg ${
						timeLeft <= 10 ? "text-red-500" : ""
					} font-semibold`}
				>
					Калган убакыт : {timeLeft} cекунд
				</p>
			</div>

			<div className="space-y-4 bg-white shadow rounded p-4 mb-6">
				<p className="text-lg mb-4">{currentQuestion.question}</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{["a", "b", "c", "d"].map((option, idx) => (
						<label
							key={option}
							className={`flex items-center space-x-2 border-2 p-3 rounded cursor-pointer transition-colors duration-200
                ${
									selectedAnswer === option
										? "border-blue-500 bg-blue-100"
										: "border-gray-300 hover:border-blue-300"
								}`}
						>
							<input
								type="radio"
								name="answer"
								value={option}
								checked={selectedAnswer === option}
								onChange={() => handleAnswerSelect(option)}
								className="form-radio text-blue-600"
							/>
							<span className="text-lg">
								{variants[idx]}) {currentQuestion[option as keyof Question]}
							</span>
						</label>
					))}
				</div>
			</div>

			<button
				onClick={handleNextQuestion}
				className="w-full md:w-auto px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 text-lg font-semibold"
			>
				Кийинки суроо
			</button>
		</div>
	)
}
