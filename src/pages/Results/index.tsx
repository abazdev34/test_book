/** @format */

import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getResults } from "../../redux/features/question/questionSlice"
import { useSelector } from "react-redux"
import useAuthUser from "react-auth-kit/hooks/useAuthUser"

export default function Results() {
	const dispatch = useDispatch()
	const results = useSelector(state => state.questions.results)
	const auth = useAuthUser()
	useEffect(() => {
		dispatch(getResults({ student_id: auth.userId }))
	}, [])

	console.log("results", results)

	const letters = ["а", "б", "в", "г"]

	return (
		<div>
			<h1 className="text-3xl ">Сиздин жооптор </h1>
			{results.items?.map((result, idx) => (
				<div key={result.id} className="mt-4">
					<p
						className="text-xl font-bold"
						style={{ color: result.isCorrect ? "green" : "red" }}
					>
						{idx + 1}. {result.question.question}
					</p>
					{["a", "b", "c", "d"].map(option => (
						<p
							className="text-lg"
							key={option}
							style={{
								color:
									result.question[option] === result.question.answer
										? "green"
										: result.answer === option
										? "red"
										: "black",
							}}
						>
							{option.toUpperCase()}) {result.question[option]}
						</p>
					))}
				</div>
			))}
		</div>
	)
}
