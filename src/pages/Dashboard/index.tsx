/** @format */
import useAuthUser from "react-auth-kit/hooks/useAuthUser"

export default function Dashboard() {
	const auth = useAuthUser()
	return (
		<div>
			Dashboard
			<h1>Hello! {auth.email}</h1>
		</div>
	)
}
