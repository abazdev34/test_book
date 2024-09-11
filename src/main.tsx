/** @format */

import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { authStore } from "./redux/authStore"
import App from "./App"
import AuthProvider from "react-auth-kit"
import { store } from "./redux/store"
ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<Provider store={store}>
			<AuthProvider store={authStore}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</AuthProvider>
		</Provider>
	</React.StrictMode>
)
