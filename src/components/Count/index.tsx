/** @format */

import { useState, useEffect } from "react"
import AnimatedCounter from "./AnimatedCount"
import FuncButtons from "./FuncButtons"
import useAuthUser from "react-auth-kit/hooks/useAuthUser"
import { useDispatch } from "react-redux"
import { addCount } from "../../redux/features/counts/countsSlice"
import axiosInstance from "../../redux/features/auth/axiosAuthUtils"

// Helper functions to manage local storage
const saveToLocalStorage = (key: string, value: any) => {
	localStorage.setItem(key, JSON.stringify(value))
}

const getFromLocalStorage = (key: string) => {
	const data = localStorage.getItem(key)
	return data ? JSON.parse(data) : null
}

export default function Count({ bgColor }: { bgColor: string }) {
	const [count, setCount] = useState(0)
	const [amount, setAmount] = useState(1)
	const [isEdit, setIsEdit] = useState(false)
	const [isReset, setIsReset] = useState(false)
	const [nameOfTasbih, setNameOfTasbih] = useState("zikr")
	const [currentCountID, setCurrentCountID] = useState("")
	const dispatch = useDispatch()
	const auth = useAuthUser()

	const getCurrentTasbih = async () => {
		try {
			const responce = await axiosInstance.get(
				"/api/collections/counts/records",
				{
					filter: `user="${auth.userId}" && name_of_tasbih="${nameOfTasbih}"`,
				}
			)

			// console.log("current counting zikr", responce.data)
			setAmount(Number(responce.data.items[0].last_step))
			setCount(Number(responce.data.items[0].last_count))
			setNameOfTasbih(responce.data.items[0].name_of_tasbih)
			setCurrentCountID(responce.data.items[0].id)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		getCurrentTasbih()
	}, [])
	const askForReset = () => {
		setIsReset(true)
	}

	// Sync with backend on page unload
	const handleAddCount = () => {
		dispatch(
			addCount({
				user: auth.userId,
				name_of_tasbih: nameOfTasbih,
				last_count: count,
				last_step: amount,
				currentCountID: currentCountID,
			})
		)
	}

	// Warm color palette
	const colors = {
		primary: "#e67e22", // Orange
		secondary: "#f39c12", // Amber
		accent: "#d35400", // Dark Orange
		text: bgColor === "white" ? "#34495e" : "#ecf0f1", // Dark Blue-Gray for white bg, Light Gray for dark bg
		background: bgColor === "white" ? "#fff" : "#34495e", // White or Dark Blue-Gray
	}

	return (
		<div
			className="w-full relative pb-4"
			style={{
				backgroundColor: colors.background,
				color: colors.text,
				transition: "all 0.3s ease-in-out",
			}}
		>
			<h1
				className="text-3xl font-bold text-center mb-2"
				style={{ color: colors.primary }}
			>
				Tasbih Counter
			</h1>
			<div className="flex flex-col justify-between gap-5">
				<div className="">
					<label
						htmlFor="nameOfTasbih"
						className="text-center text-lg"
						style={{ color: colors.secondary }}
					>
						Write the name of tasbih you are counting
					</label>
					<input
						className="w-full text-center bg-transparent rounded-md focus:outline-none"
						style={{
							borderColor: colors.primary,
							borderWidth: "2px",
							color: colors.text,
						}}
						value={nameOfTasbih}
						type="text"
						id="nameOfTasbih"
						required
						onChange={e => setNameOfTasbih(e.target.value)}
					/>
				</div>
				<FuncButtons
					setIsEdit={setIsEdit}
					setAmount={setAmount}
					askForReset={askForReset}
					setCount={setCount}
					setIsReset={setIsReset}
					isReset={isReset}
					isEdit={isEdit}
					handleAddCount={handleAddCount}
				/>

				{isEdit ? (
					<input
						type="number"
						className="w-full h-16 bg-transparent text-center text-[47px] rounded-lg"
						style={{
							border: isEdit ? `3px solid ${colors.primary}` : "none",
							color: colors.text,
						}}
						value={count}
						onChange={e => setCount(Number(e.target.value))}
					/>
				) : (
					<AnimatedCounter count={count} />
				)}
			</div>

			<div className="flex flex-col items-center mt-10">
				<button
					className="w-48 h-48 rounded-full text-7xl"
					style={{
						backgroundColor: colors.primary,
						color: colors.background,
						border: `4px solid ${colors.accent}`,
					}}
					onClick={() => {
						setCount(prev => prev + amount)
						setIsEdit(false)
						handleAddCount()
					}}
				>
					+
				</button>
				<button
					style={{
						backgroundColor: colors.secondary,
						color: colors.background,
						border: `4px solid ${colors.accent}`,
						transition: "all 0.3s ease-in-out",
					}}
					className="w-24 h-24 text-5xl rounded-full absolute bottom-[-2rem] z-0"
					onClick={() => {
						setCount(prev => (prev > 0 ? prev - amount : 0))
						setIsEdit(false)
						handleAddCount()
					}}
				>
					-
				</button>
			</div>
		</div>
	)
}
