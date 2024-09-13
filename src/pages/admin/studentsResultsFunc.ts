/** @format */

// src/utils/resultUtils.js

export const groupResultsByStudent = results => {
	return results.reduce((acc, result) => {
		if (!acc[result.student_id]) {
			acc[result.student_id] = {
				student_id: result.student_id,
				correctAnswers: 0,
				wrongAnswers: 0,
				totalTime: 0,
				results: [],
			}
		}

		acc[result.student_id].correctAnswers += result.isCorrect ? 1 : 0
		acc[result.student_id].wrongAnswers += result.isCorrect ? 0 : 1
		acc[result.student_id].totalTime += result.time
		acc[result.student_id].results.push(result)

		return acc
	}, {})
}

export const formatTime = seconds => {
	const minutes = Math.floor(seconds / 60)
	const remainingSeconds = seconds % 60
	return `${minutes}м ${remainingSeconds}с`
}

export const sortStudentResults = (studentResults, sortBy) => {
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
