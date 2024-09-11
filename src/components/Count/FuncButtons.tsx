/** @format */

// Warm color palette
const colors = {
	primary: "#e67e22", // Orange
	secondary: "#f39c12", // Amber
	accent: "#d35400", // Dark Orange
	text: "#34495e", // Dark Blue-Gray
	background: "#fff", // White
	danger: "#c0392b", // Dark Red
	success: "#27ae60", // Green
}

export default function FuncButtons({
	setIsEdit,
	setAmount,
	askForReset,
	setIsReset,
	setCount,
	isReset,
	isEdit,
	handleAddCount,
}) {
	return (
		<div className="flex gap-7 w-full justify-between">
			<select
				name="amount"
				onChange={e => {
					setAmount(Number(e.target.value))
					handleAddCount()
				}}
				id="amount"
				className="rounded-lg w-28 bg-transparent px-2"
				style={{
					color: colors.primary,
					borderColor: colors.primary,
					borderWidth: 2,
					outlineColor: colors.primary,
				}}
			>
				{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 30, 50, 100].map(value => (
					<option
						key={value}
						value={value}
						style={{ background: colors.background }}
					>
						+{value}
					</option>
				))}
			</select>
			<button
				className="border-2 rounded-lg w-28"
				style={{ borderColor: colors.primary, color: colors.primary }}
				onClick={() => setIsEdit(!isEdit)}
			>
				Edit
			</button>
			<button
				className="border-2 rounded-lg w-28"
				style={{ borderColor: colors.primary, color: colors.primary }}
				onClick={askForReset}
			>
				Reset
			</button>
			{isReset && (
				<div
					className="absolute w-full h-64 rounded-2xl z-10 flex flex-col items-center justify-center gap-10"
					style={{ backgroundColor: colors.secondary }}
				>
					<h2
						className="text-2xl text-center"
						style={{ color: colors.background }}
					>
						Are you sure you want to reset?
					</h2>
					<div className="flex justify-around w-full ">
						<button
							className="p-3 rounded-lg"
							style={{
								color: colors.danger,
								borderColor: colors.danger,
								borderWidth: 4,
							}}
							onClick={() => {
								setCount(0)
								setIsReset(false)
							}}
						>
							Yes
						</button>
						<button
							className="p-3 rounded-lg"
							style={{
								color: colors.success,
								borderColor: colors.success,
								borderWidth: 4,
							}}
							onClick={() => setIsReset(false)}
						>
							No
						</button>
					</div>
				</div>
			)}
		</div>
	)
}
