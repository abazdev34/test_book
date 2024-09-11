/** @format */

import PocketBase from "pocketbase"
/** @format */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
// import pb from "../../../services/pocketbase"
import axiosInstance from "../auth/axiosAuthUtils"

export const fetchCounts = createAsyncThunk(
	"counts/fetchCounts",
	async (userId: string) => {
		const records = await pb.collection("counts").getList(1, 50, {
			filter: `user="${userId}"`,
		})
		return records.items
	}
)

export const addCount = createAsyncThunk(
	"counts/createCount",
	async (
		{
			user,
			name_of_tasbih,
			last_count,
			last_step,
			currentCountID,
		}: {
			user: string
			name_of_tasbih: string
			last_count: number
			last_step: number
			currentCountID: string
		},
		{ rejectWithValue }
	) => {
		try {
			const pb = new PocketBase(import.meta.env.VITE_PB_URL)

			// Fetch the existing record
			const isRecordExist = await pb.collection("counts").getList(1, 50, {
				filter: `id="${currentCountID}"`,
			})

			const data = {
				user, // RELATION_RECORD_ID
				name_of_tasbih, // e.g., salavat
				last_count, // e.g., 123
				last_step, // e.g., 123
			}

			if (isRecordExist.items.length === 0) {
				// No record found, create a new one
				const response = await pb.collection("counts").create(data)
				console.log("response", response)
				return response // Return the response data
			} else {
				// Record found, update the existing one
				const recordId = isRecordExist.items[0].id
				const response = await pb.collection("counts").update(recordId, data)
				console.log("response", response)
				return response // Return the response data
			}
		} catch (error) {
			console.log("Error details:", error.response?.data || error.message)
			return rejectWithValue(error.response?.data || error.message)
		}
	}
)

const countsSlice = createSlice({
	name: "counts",
	initialState: {
		counts: [],
		loading: false,
		error: null,
	},
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchCounts.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(fetchCounts.fulfilled, (state, action) => {
				state.counts = action.payload
				state.loading = false
			})
			.addCase(fetchCounts.rejected, (state, action) => {
				state.loading = false
				state.error = action.error.message
			})
			.addCase(addCount.fulfilled, (state, action) => {
				state.counts.push(action.payload)
			})
	},
})

export default countsSlice.reducer
