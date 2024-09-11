/** @format */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../auth/axiosAuthUtils"

export const getQuestions = createAsyncThunk(
	"questions/getQuestions",
	async () => {
		try {
			const response = await axiosInstance.get(
				"/api/collections/questions/records"
			)
			return response.data
		} catch (error) {
			console.log(error)
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
	error: "",
}
const questionSlice = createSlice({
	name: "counts",
	initialState: initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(getQuestions.pending, state => {
			state.loading = true
		})
		builder.addCase(getQuestions.fulfilled, (state, action) => {
			state.loading = false
			state.questions = action.payload
		})
		builder.addCase(getQuestions.rejected, (state, action) => {
			state.loading = false
			state.error = action.error.message
		})
	},
})

export default questionSlice.reducer
