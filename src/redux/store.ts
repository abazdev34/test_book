/** @format */

import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./features/auth/authSlice"
import countsReducer from "./features/counts/countsSlice"

export const store = configureStore({
	reducer: {
		auth: authReducer,
		counts: countsReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
