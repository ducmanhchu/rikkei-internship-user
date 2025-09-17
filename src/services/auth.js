import apiClient from "./http";

export const authService = {
	login: async (email, password) => {
		try {
			const response = await apiClient.post("/auth/login", {
				email,
				password,
			});

			if (response.data && response.data.data) {
				const { accessToken, user } = response.data.data;

				if (accessToken) {
					localStorage.setItem("token", accessToken);
					localStorage.setItem("user", JSON.stringify(user));
				}

				return {
					success: true,
					data: response.data.data,
					message: response.data.message || "Login successful",
				};
			}

			throw new Error("Invalid response format");
		} catch (error) {
			const errorMessage =
				error.response?.data?.message ||
				error.response?.data?.data ||
				"Login failed";

			throw new Error(errorMessage);
		}
	},

	register: async (firstName, lastName, email, password) => {
		try {
			const response = await apiClient.post("/auth/register", {
				firstName,
				lastName,
				email,
				password,
			});

			return {
				success: true,
				message: response.data.data || "Registration successful",
			};
		} catch (error) {
			const errorMessage =
				error.response?.data?.message || "Registration failed";
			throw new Error(errorMessage);
		}
	},

	logout: async (token) => {
		try {
			if (token) {
				const response = await apiClient.post(
					"/auth/logout",
					{ token },
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				return {
					success: true,
					message: response.data.message || "Logout successful",
				};
			}
		} catch (error) {
			console.error("Logout error:", error);
		} finally {
			localStorage.removeItem("token");
			localStorage.removeItem("user");
		}
	},

	verifyOTP: async (email, otp) => {
		try {
			const response = await apiClient.post("/otp/verify-otp", {
				email,
				otp,
			});

			return {
				success: true,
				message: response.data.message || "OTP verification successful",
			};
		} catch (error) {
			const errorMessage =
				error.response?.data?.message || "OTP verification failed";
			throw new Error(errorMessage);
		}
	},

	resendOTP: async (email) => {
		try {
			const response = await apiClient.post("/otp/resend-otp", {
				email,
			});

			return {
				success: true,
				message: response.data.message || "OTP resent successfully",
			};
		} catch (error) {
			const errorMessage = error.response?.data?.message || "Resend OTP failed";
			throw new Error(errorMessage);
		}
	},
};
