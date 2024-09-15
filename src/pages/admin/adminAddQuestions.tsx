/** @format */

import { useState } from "react"
import { useDispatch } from "react-redux"
import { addQuestion } from "../../redux/features/question/questionSlice"

export default function AdminAddQuestion() {
	const dispatch = useDispatch()
	const [questionState, setQuestionState] = useState({
		question: "",
		a: "",
		b: "",
		c: "",
		d: "",
		answer: "",
	})

	const handleSubmit = e => {
		e.preventDefault()
		dispatch(addQuestion(questionState))
		setQuestionState({ question: "", a: "", b: "", c: "", d: "", answer: "" })
	}

	const handleInputChange = e => {
		const { name, value } = e.target
		setQuestionState(prev => ({ ...prev, [name]: value }))
	}

	return (
		<div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
			<div className="relative py-3 sm:max-w-xl sm:mx-auto">
				<div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
					<h1 className="text-2xl font-semibold mb-5 text-center">
						Жаңы суроо кошуу
					</h1>
					<form onSubmit={handleSubmit} className="space-y-4">
						<div>
							<label
								htmlFor="question"
								className="block text-sm font-medium text-gray-700"
							>
								Суроо
							</label>
							<input
								type="text"
								id="question"
								name="question"
								value={questionState.question}
								onChange={handleInputChange}
								className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
								required
							/>
						</div>
						{["a", "b", "c", "d"].map(option => (
							<div key={option}>
								<label
									htmlFor={option}
									className="block text-sm font-medium text-gray-700"
								>
									Вариант {option.toUpperCase()}
								</label>
								<input
									type="text"
									id={option}
									name={option}
									value={questionState[option]}
									onChange={handleInputChange}
									className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
									required
								/>
							</div>
						))}
						<div>
							<label
								htmlFor="answer"
								className="block text-sm font-medium text-gray-700"
							>
								Туура жооп
							</label>
							<select
								id="answer"
								name="answer"
								value={questionState.answer}
								onChange={handleInputChange}
								className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
								required
							>
								<option value="">Туура жоопту тандаңыз</option>
								{["a", "b", "c", "d"].map(option => (
									<option key={option} value={questionState[option]}>
										Вариант {option.toUpperCase()}
									</option>
								))}
							</select>
						</div>
						<button
							type="submit"
							className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							Суроону кошуу
						</button>
					</form>
				</div>
			</div>
		</div>
	)
}
