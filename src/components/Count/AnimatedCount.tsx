/** @format */

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const AnimatedDigit = ({ digit }: { digit: string }) => (
	<div className="relative h-[1em] w-[0.6em] inline-block overflow-hidden">
		<AnimatePresence initial={false}>
			<motion.span
				key={digit}
				className="absolute inset-0 flex items-center justify-center"
				initial={{ y: "100%" }}
				animate={{ y: 0 }}
				exit={{ y: "-100%" }}
				transition={{ duration: 0.2, ease: "easeInOut" }}
			>
				{digit}
			</motion.span>
		</AnimatePresence>
	</div>
)

const AnimatedCounter = ({ count }: { count: number }) => {
	const [digits, setDigits] = useState<string[]>([])

	useEffect(() => {
		setDigits(String(count).padStart(1, "0").split(""))
	}, [count])

	return (
		<div className="text-5xl text-center w-full h-18 	">
			{digits.map((digit, index) => (
				<AnimatedDigit key={index} digit={digit} />
			))}
		</div>
	)
}

export default AnimatedCounter
