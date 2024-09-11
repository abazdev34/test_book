/** @format */

import axios, { AxiosError } from "axios"

const API_URL = import.meta.env.VITE_PB_URL // Replace with your API URL

const axiosInstance = axios.create({
	baseURL: API_URL,
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
		"Access-Control-Allow-Origin": "*",
	},
})

// Intercept requests to add auth token
axiosInstance.interceptors.request.use(config => {
	const token = localStorage.getItem("authToken")
	if (token) {
		config.headers["Authorization"] = `Bearer ${token}`
	}
	return config
})

export const setAuthToken = (token: string) => {
	if (token) {
		localStorage.setItem("authToken", token)
	} else {
		localStorage.removeItem("authToken")
	}
}

export const handleApiError = (error: unknown): string => {
	if (axios.isAxiosError(error)) {
		const axiosError = error as AxiosError<{ message?: string }>
		return (
			axiosError.response?.data?.message ||
			axiosError.message ||
			"An unexpected error occurred"
		)
	}
	return "An unknown error occurred"
}

export default axiosInstance
