/** @format */

import { useState, useEffect } from "react"
import useAuthUser from "react-auth-kit/hooks/useAuthUser"
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated"
import useSignOut from "react-auth-kit/hooks/useSignOut"
import { FaList } from "react-icons/fa"
import { MdHome } from "react-icons/md"
import { PiSignOutBold } from "react-icons/pi"
import { NavLink } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import AskToLogOut from "./AskToLogOut"
import { RiLoginBoxLine } from "react-icons/ri"

const colors = {
	primary: "#e67e22",
	secondary: "#f39c12",
	accent: "#d35400",
	text: "#34495e",
	background: "#ffffff",
}

export default function Header() {
	const isAuthenticated = useIsAuthenticated()
	const [logOut, setLogOut] = useState(false)
	const signOut = useSignOut()
	const auth = useAuthUser()
	const [menuOpen, setMenuOpen] = useState(false)

	const buttonStyle = {
		borderColor: colors.primary,
		color: colors.primary,
		backgroundColor: "transparent",
	}

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 768) {
				setMenuOpen(false)
			}
		}

		window.addEventListener("resize", handleResize)
		return () => window.removeEventListener("resize", handleResize)
	}, [])

	useEffect(() => {
		document.body.style.overflow = menuOpen ? "hidden" : "unset"
		return () => {
			document.body.style.overflow = "unset"
		}
	}, [menuOpen])

	const NavButton = ({ to, onClick, children }) => (
		<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
			<NavLink to={to} onClick={onClick}>
				<button
					className="w-full md:w-auto py-2 px-4 border-2 h-10 rounded-md text-center transition-colors hover:bg-opacity-10 hover:bg-primary"
					style={buttonStyle}
				>
					{children}
				</button>
			</NavLink>
		</motion.div>
	)

	const renderNavButtons = (isMobile = false) => {
		const closeMenu = isMobile ? () => setMenuOpen(false) : () => {}
		const buttons = isAuthenticated
			? auth.role === "admin"
				? [
						{ to: "/admin", icon: "🛠️ Жыйынтыктар " },
						{ to: "/adminPanel", icon: "📘 Суроо кошуу" },
						{ to: "/all_results", icon: "📊 Жалпы жыйынтык" },
				  ]
				: [
						{
							to: "/dashboard",
							icon: (
								<div className="flex items-center gap-2">
									<FaList /> Суроолор
								</div>
							),
						},
						{ to: "/results", text: "✅ Жооптор" },
				  ]
			: [
					{ to: "/login", text: <RiLoginBoxLine />, icon: "Кирүү" },
					{ to: "/register", text: "Каттоо" },
			  ]

		return (
			<>
				{buttons.map((button, index) => (
					<motion.div
						key={button.to}
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: index * 0.1 }}
					>
						<NavButton to={button.to} onClick={closeMenu}>
							{button.icon || button.text}
						</NavButton>
					</motion.div>
				))}
				{isAuthenticated && (
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: buttons.length * 0.1 }}
					>
						<button
							className="w-full md:w-auto py-2 px-4 border-2 h-10 rounded-md text-center transition-colors hover:bg-opacity-10 hover:bg-primary"
							style={buttonStyle}
							onClick={() => {
								setLogOut(!logOut)
								closeMenu()
							}}
						>
							<PiSignOutBold />
						</button>
					</motion.div>
				)}
			</>
		)
	}

	return (
		<motion.header
			className="w-full relative bg-white shadow-md"
			initial={{ opacity: 0, y: -50 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<div className="container mx-auto px-4">
				<div className="flex justify-between items-center py-4">
					<NavLink to="/">
						<motion.button
							className="py-2 px-4 border-2 h-10 rounded-md text-center transition-colors hover:bg-opacity-10 hover:bg-primary"
							style={buttonStyle}
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
						>
							<MdHome />
						</motion.button>
					</NavLink>
					<motion.button
						className="md:hidden z-50 focus:outline-none"
						onClick={() => setMenuOpen(!menuOpen)}
						aria-label="Toggle menu"
						whileTap={{ scale: 0.9 }}
					>
						<motion.span
							className="text-2xl"
							initial={false}
							animate={{ rotate: menuOpen ? 90 : 0 }}
							transition={{ duration: 0.3 }}
						>
							{menuOpen ? "✕" : "☰"}
						</motion.span>
					</motion.button>
					<nav className="hidden md:flex md:items-center md:space-x-2">
						{renderNavButtons()}
					</nav>
				</div>
			</div>

			<AnimatePresence>
				{menuOpen && (
					<motion.div
						className="fixed inset-0 bg-white z-40 md:hidden overflow-y-auto"
						initial={{ opacity: 0, x: "100%" }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: "100%" }}
						transition={{ type: "spring", damping: 25, stiffness: 500 }}
					>
						<div className="flex flex-col space-y-4 p-4 pt-16">
							{renderNavButtons(true)}
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			<AnimatePresence>
				{logOut && <AskToLogOut setLogOut={setLogOut} signOut={signOut} />}
			</AnimatePresence>
		</motion.header>
	)
}
