/** @format */

import { NavLink } from "react-router-dom"
import useSignOut from "react-auth-kit/hooks/useSignOut"
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated"
import { PiSignOutBold } from "react-icons/pi"
import { MdHome } from "react-icons/md"
import { FaList } from "react-icons/fa"
import { useState } from "react"
import AskToLogOut from "./AskToLogOut"

// Warm color palette
const colors = {
	primary: "#e67e22", // Orange
	secondary: "#f39c12", // Amber
	accent: "#d35400", // Dark Orange
	text: "#34495e", // Dark Blue-Gray
	background: "#fff", // White
}

export default function Header() {
	const isAuthenticated = useIsAuthenticated()
	const [logOut, setLogOut] = useState(false)
	const signOut = useSignOut()

	const buttonStyle = {
		borderColor: colors.primary,
		color: colors.primary,
		backgroundColor: colors.background,
	}

	return (
		<header>
			<nav className="flex justify-center items-center gap-4 h-16">
				<NavLink to="/">
					<button
						className="py-2 px-4 border-2 rounded-md text-center"
						style={buttonStyle}
					>
						<MdHome />
					</button>
				</NavLink>
				<NavLink to="/dashboard">
					<button
						className="py-2 px-4 border-2 rounded-md text-center"
						style={buttonStyle}
					>
						<FaList />
					</button>
				</NavLink>
				{isAuthenticated ? (
					<>
						<button
							className="py-2 px-4 border-2 rounded-md text-center"
							style={buttonStyle}
							onClick={() => setLogOut(!logOut)}
						>
							<PiSignOutBold />
						</button>
						{logOut && <AskToLogOut setLogOut={setLogOut} signOut={signOut} />}
					</>
				) : (
					<>
						<NavLink to="/login">
							<button
								className="py-2 px-4 border-2 rounded-md text-center"
								style={buttonStyle}
							>
								Login
							</button>
						</NavLink>
						<NavLink to="/register">
							<button
								className="py-2 px-4 border-2 rounded-md text-center"
								style={buttonStyle}
							>
								Register
							</button>
						</NavLink>
					</>
				)}
			</nav>
		</header>
	)
}
