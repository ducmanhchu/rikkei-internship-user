import apiClient from "./http";

export const artistService = {
	getFeaturedArtists: async () => {
		try {
			const response = await apiClient.get("/user/featured/artists");

			return {
				success: true,
				data: response.data.data,
			};
		} catch (error) {
			const errorMessage =
				error.response?.data?.message || "Failed to fetch featured artists";
			throw new Error(errorMessage);
		}
	},
};
