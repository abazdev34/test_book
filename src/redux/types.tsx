/** @format */

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
	isCorrect: true
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
