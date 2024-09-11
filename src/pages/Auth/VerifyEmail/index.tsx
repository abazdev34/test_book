/** @format */

import { Link } from "react-router-dom"

export default function VerifyEmail() {
	const email = localStorage.getItem("email")

	return (
		<div className="flex justify-center pt-16">
			<div className="flex flex-col items-center gap-4">
				<h1 className="text-center text-3xl my-5 font-semi-bold text-blue-500">
					Verify Email
				</h1>
				<div className="flex flex-col gap-4">
					<p>
						We send the verification email to :
						<span className="text-blue-500"> {email}</span>
					</p>
					<p>After confirming email come here and press the button </p>
					<p className="text-red-500">
						Please don't press the button if you did not receive the email
					</p>
				</div>
				<Link to="/login">
					<button className="bg-blue-500 text-white px-4 py-2 mx-0-auto">
						I confirmed the email
					</button>
				</Link>
			</div>
		</div>
	)
}
