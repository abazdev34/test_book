/** @format */

import { useState, useEffect, useCallback } from "react"

export function useTimer(initialTime: number) {
	const [timeLeft, setTimeLeft] = useState<number>(() => {
		const savedTime = localStorage.getItem("timeLeft")
		return savedTime ? parseInt(savedTime, 10) : initialTime
	})
	const [isRunning, setIsRunning] = useState<boolean>(false)

	useEffect(() => {
		localStorage.setItem("timeLeft", timeLeft.toString())
	}, [timeLeft])

	useEffect(() => {
		let timer: number | undefined
		if (isRunning && timeLeft > 0) {
			timer = window.setInterval(() => {
				setTimeLeft(prevTime => {
					const newTime = prevTime - 1
					localStorage.setItem("timeLeft", newTime.toString())
					return newTime
				})
			}, 1000)
		} else if (timeLeft === 0) {
			setIsRunning(false)
		}
		return () => clearInterval(timer)
	}, [isRunning, timeLeft])

	const startTimer = useCallback(() => {
		setIsRunning(true)
	}, [])

	const stopTimer = useCallback(() => {
		setIsRunning(false)
	}, [])

	const resetTimer = useCallback(() => {
		setTimeLeft(initialTime)
		localStorage.setItem("timeLeft", initialTime.toString())
	}, [initialTime])

	return { timeLeft, startTimer, stopTimer, resetTimer }
}
