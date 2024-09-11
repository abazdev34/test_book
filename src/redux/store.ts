/** @format */

import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./features/auth/authSlice"
import questionReducer from "./features/question/questionSlice"

export const store = configureStore({
	reducer: {
		auth: authReducer,
		questions: questionReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
