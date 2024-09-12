/** @format */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosInstance from '../auth/axiosAuthUtils'

export const getQuestions = createAsyncThunk(
	'questions/getQuestions',
	async () => {
		try {
			const response = await axiosInstance.get(
				'/api/collections/questions/records'
			)
			console.log(response.data) // Check the structure of the response
			return response.data.items // Ensure this is the correct path to the items
		} catch (error) {
			console.log(error)
			throw error // Throw the error to be caught in the rejected case
		}
	}
)

export const submitAnswer = createAsyncThunk(
	'questions/submitAnswer',
	async ({ student_id, questionId, answer, timeSpent, isCorrect }: any) => {
		try {
			const response = await axiosInstance.post(
				'/api/collections/results/records',
				{
					student_id: student_id,
					question_id: questionId,
					answer,
					isCorrect: isCorrect,
					time: timeSpent,
				}
			)
			console.log(response.data) // Check the structure of the response
			return response.data // Ensure this is the correct path to the items
		} catch (error) {
			console.log(error)
			throw error // Throw the error to be caught in the rejected case
		}
	}
)

interface Question {
	id: string
	title: string
	a: string
	b: string
	c: string
	d: string
	answer: string
}
interface QuestionState {
	questions: Question[]
	loading: boolean
	error: string | null
}
export const initialState: QuestionState = {
	questions: [],
	loading: false,
	error: '',
}
const questionSlice = createSlice({
	name: 'questions', // Change this to 'questions' for clarity
	initialState: {
		questions: [],
		loading: false,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getQuestions.pending, (state) => {
				state.loading = true
				state.error = null // Reset error on new request
			})
			.addCase(getQuestions.fulfilled, (state, action) => {
				state.loading = false
				state.questions = action.payload // Store the fetched questions
			})
			.addCase(getQuestions.rejected, (state, action) => {
				state.loading = false
				state.error = action.error.message // Store the error message
			})
	},
})

export default questionSlice.reducer
