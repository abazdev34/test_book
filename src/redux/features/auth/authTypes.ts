/** @format */

export interface User {
	id: string
	email: string
	username: string
	emailVerified: boolean
}

export interface AuthState {
	user: User | null
	isAuthenticated: boolean
	loading: boolean
	error: string | null
}

export interface ISignUpPrompt {
	email: string
	password: string
	username: string
	role: string
	name: string
	surname: string
}
