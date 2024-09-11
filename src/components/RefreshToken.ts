/** @format */

import createRefresh from "react-auth-kit/createRefresh"
import axiosInstance from "../redux/features/auth/axiosAuthUtils"

export const refresh = createRefresh({
	interval: 600, // The time in sec to refresh the Access token,
	refreshApiCallback: async param => {
		try {
			const response = await axiosInstance.post(
				`/api/collections/users/auth-refresh`,
				param,
				{
					headers: { Authorization: `Bearer ${param.authToken}` },
				}
			)
			console.log("Refreshing")
			return {
				isSuccess: true,
				newAuthToken: response.data.token,
				newAuthTokenExpireIn: 10,
				newRefreshTokenExpiresIn: 60,
			}

			console.log(response.data)
		} catch (error) {
			console.error(error)
			return {
				isSuccess: false,
			}
		}
	},
})
