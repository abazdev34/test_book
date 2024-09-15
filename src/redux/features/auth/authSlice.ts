/** @format */

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import axiosInstance, { setAuthToken, handleApiError } from "./axiosAuthUtils"
import pb from "../../../services/pocketbase"
import { AuthState, ISignUpPrompt, User } from "./authTypes"

export const login = createAsyncThunk(
	"auth/login",
	async (
		{
			identity,
			password,
			signIn,
		}: { identity: string; password: string; signIn: Function },
		{ rejectWithValue }
	) => {
		try {
			const response = await axiosInstance.post(
				"/api/collections/users/auth-with-password",
				{ identity, password }
			)
			signIn({
				auth: {
					token: response.data.token,
					type: "Bearer",
				},
				userState: {
					email: identity,
					userId: response.data.record.id,
					student_name: response.data.record.username,
				},
			})

			return response.data.record as User
		} catch (error) {
			return rejectWithValue(handleApiError(error))
		}
	}
)

export const signUp = createAsyncThunk(
	"auth/signUp",
	async (
		{ email, password, username, role, name, surname }: ISignUpPrompt,
		{ rejectWithValue }
	) => {
		try {
			const response = await axiosInstance.post(
				"/api/collections/users/records",
				{
					email,
					password,
					passwordConfirm: password,
					username,
					role,
					name,
					surname,
				}
			)

			// Request verification email
			await pb.collection("users").requestVerification(email)

			return response.data as User
		} catch (error) {
			return rejectWithValue(handleApiError(error))
		}
	}
)

export const verifyEmail = createAsyncThunk(
	"auth/verifyEmail",
	async ({ token }: { token: string }, { rejectWithValue }) => {
		try {
			await axiosInstance.post("/api/collections/users/confirm-verification", {
				token,
			})
			return true
		} catch (error) {
			return rejectWithValue(handleApiError(error))
		}
	}
)

export const resendVerificationEmail = createAsyncThunk(
	"auth/resendVerificationEmail",
	async ({ email }: { email: string }, { rejectWithValue }) => {
		try {
			await axiosInstance.post("/api/collections/users/request-verification", {
				email,
			})
			return true
		} catch (error) {
			return rejectWithValue(handleApiError(error))
		}
	}
)

export const forgotPassword = createAsyncThunk(
	"auth/forgotPassword",
	async ({ email }: { email: string }, { rejectWithValue }) => {
		try {
			await axiosInstance.post(
				"/api/collections/users/request-password-reset",
				{ email }
			)
			return true
		} catch (error) {
			return rejectWithValue(handleApiError(error))
		}
	}
)

export const resetPassword = createAsyncThunk(
	"auth/resetPassword",
	async (
		{
			token,
			password,
			passwordConfirm,
		}: {
			token: string
			password: string
			passwordConfirm: string
		},
		{ rejectWithValue }
	) => {
		try {
			await axiosInstance.post(
				"/api/collections/users/confirm-password-reset",
				{
					token,
					password,
					passwordConfirm,
				}
			)
			return true
		} catch (error) {
			return rejectWithValue(handleApiError(error))
		}
	}
)

const initialState: AuthState = {
	user: null,
	isAuthenticated: false,
	loading: false,
	error: null,
}

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		logout: state => {
			setAuthToken("")
			state.user = null
			state.isAuthenticated = false
			state.error = null
		},
		clearError: state => {
			state.error = null
		},
	},
	extraReducers: builder => {
		builder
			.addCase(login.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
				state.user = action.payload
				state.isAuthenticated = true
				state.loading = false
				state.error = null
			})
			.addCase(login.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload as string
			})
			.addCase(signUp.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(signUp.fulfilled, (state, action: PayloadAction<User>) => {
				state.user = action.payload
				state.isAuthenticated = false // User needs to verify email
				state.loading = false
				state.error = null
			})
			.addCase(signUp.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload as string
			})
			.addCase(verifyEmail.fulfilled, state => {
				if (state.user) {
					state.user.emailVerified = true
					state.isAuthenticated = true
				}
			})
			.addCase(verifyEmail.rejected, (state, action) => {
				state.error = action.payload as string
			})
			.addCase(resendVerificationEmail.fulfilled, state => {
				state.error = null
			})
			.addCase(resendVerificationEmail.rejected, (state, action) => {
				state.error = action.payload as string
			})
	},
})

export const { logout, clearError } = authSlice.actions
export default authSlice.reducer
