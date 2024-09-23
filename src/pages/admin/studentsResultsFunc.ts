/** @format */

import {
	IStudentResultOneQuestion,
	IStudentResultSorted,
} from "./studentsResults"

// src/utils/resultUtils.js

export const groupResultsByStudent = (results: IStudentResultOneQuestion[]) => {
	return results.reduce((acc, result: IStudentResultOneQuestion) => {
		if (!acc[result.student_id]) {
			acc[result.student_id] = {
				student_id: result.student_id,
				correctAnswers: 0,
				wrongAnswers: 0,
				totalTime: 0,
				results: [],
				student_name: result.student_name,
			}
		}

		acc[result.student_id].correctAnswers += result.isCorrect ? 1 : 0
		acc[result.student_id].wrongAnswers += result.isCorrect ? 0 : 1
		acc[result.student_id].totalTime += result.time
		acc[result.student_id].results.push(result)

		return acc
	}, {})
}

export const formatTime = (seconds: number) => {
	const minutes = Math.floor(seconds / 60)
	const remainingSeconds = seconds % 60
	return `${minutes}м ${remainingSeconds}с`
}

export const sortStudentResults = (
	studentResults: IStudentResultSorted,
	sortBy: string
) => {
	return Object.values(studentResults).sort((a, b) => {
		switch (sortBy) {
			case "name":
				return a.student_id.localeCompare(b.student_id)
			case "time":
				return a.totalTime - b.totalTime
			case "correct":
				return b.correctAnswers - a.correctAnswers
			case "wrong":
				return b.wrongAnswers - a.wrongAnswers
			default:
				return 0
		}
	})
}
export const sortResultsByCorrectAnswersAndTime = (
	results: IStudentResultSorted
) => {
	return Object.values(groupResultsByStudent(results)).sort((a, b) => {
		if (b.correctAnswers !== a.correctAnswers) {
			return b.correctAnswers - a.correctAnswers
		}
		return a.totalTime - b.totalTime
	})
}
