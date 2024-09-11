/** @format */
import { useEffect } from "react"
import useAuthUser from "react-auth-kit/hooks/useAuthUser"
import { getQuestions } from "../../redux/features/question/questionSlice"
import { useSelector } from "react-redux"

export default function Dashboard() {
	const auth = useAuthUser()
	const questions = useSelector(state => state.question.questions)
	useEffect(() => {
		getQuestions()
		console.log("questions", questions)
	}, [])
	return (
		<div>
			Dashboard
			<h1>Hello! {auth.email}</h1>
		</div>
	)
}
