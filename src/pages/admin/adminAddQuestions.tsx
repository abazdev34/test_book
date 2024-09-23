/** @format */

import React, { useState, useEffect } from "react"
import PocketBase from "pocketbase"
import { useNavigate } from "react-router-dom"

const pb = new PocketBase("https://tasbih.pockethost.io")

export default function AdminPanel() {
	const [questions, setQuestions] = useState([])
	const [newQuestion, setNewQuestion] = useState({
		question: "",
		a: "",
		b: "",
		c: "",
		d: "",
		answer: "",
	})
	const [editingId, setEditingId] = useState(null)
	const navigate = useNavigate()
	useEffect(() => {
		fetchQuestions()
	}, [])

	const fetchQuestions = async () => {
		try {
			const records = await pb.collection("questions").getList(1, 50)
			setQuestions(records.items)
		} catch (error) {
			console.error("Error fetching questions:", error)
		}
	}

	const handleInputChange = e => {
		const { name, value } = e.target
		setNewQuestion(prev => ({ ...prev, [name]: value }))
	}

	const handleSubmit = async e => {
		e.preventDefault()
		try {
			if (editingId) {
				await pb.collection("questions").update(editingId, newQuestion)
			} else {
				await pb.collection("questions").create(newQuestion)
			}
			setNewQuestion({ question: "", a: "", b: "", c: "", d: "", answer: "" })
			setEditingId(null)
			fetchQuestions()
		} catch (error) {
			console.error("Error submitting question:", error)
		}
	}

	const handleEdit = question => {
		setNewQuestion(question)
		setEditingId(question.id)
	}

	const handleDelete = async id => {
		if (window.confirm("Бул суроону өчүрүүнү каалайсызбы?")) {
			try {
				await pb.collection("questions").delete(id)
				fetchQuestions()
			} catch (error) {
				console.error("Error deleting question:", error)
			}
		}
	}

	return (
		<div className="container mx-auto p-4">
			<h1 id="top" className="text-2xl font-bold mb-4">
				Суроолорду башкаруу
			</h1>

			<form
				onSubmit={handleSubmit}
				className="mb-8 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
			>
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="question"
					>
						Суроо
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="question"
						type="text"
						name="question"
						value={newQuestion.question}
						onChange={handleInputChange}
						required
					/>
				</div>
				{["a", "b", "c", "d"].map(option => (
					<div key={option} className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor={option}
						>
							Вариант {option.toUpperCase()}
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id={option}
							type="text"
							name={option}
							value={newQuestion[option]}
							onChange={handleInputChange}
							required
						/>
					</div>
				))}
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="answer"
					>
						Туура жооп
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="answer"
						type="text"
						name="answer"
						value={newQuestion.answer}
						onChange={handleInputChange}
						required
					/>
				</div>
				<div className="flex items-center justify-between">
					<button
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						type="submit"
					>
						{editingId ? "Жаңыртуу" : "Кошуу"}
					</button>
				</div>
			</form>

			<div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
				<h2 className="text-xl font-bold mb-4">Суроолор тизмеси</h2>
				{questions.map(q => (
					<div key={q.id} className="mb-4 p-4 border rounded">
						<p className="font-bold">{q.question}</p>
						<p>A: {q.a}</p>
						<p>B: {q.b}</p>
						<p>C: {q.c}</p>
						<p>D: {q.d}</p>
						<p>Туура жооп: {q.answer}</p>
						<div className="mt-2">
							<button
								onClick={() => {
									handleEdit(q)
									scrollTo({ top: 0, behavior: "smooth" })l
								}}
								className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2"
							>
								Өзгөртүү
							</button>
							<button
								onClick={() => handleDelete(q.id)}
								className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
							>
								Өчүрүү
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
