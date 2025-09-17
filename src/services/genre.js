import apiClient from "./http";

export const genreService = {
	getAllGenres: async () => {
		try {
			const response = await apiClient.get("/genre");

			return {
				success: true,
				data: response.data.data,
			};
		} catch (error) {
			const errorMessage =
				error.response?.data?.message || "Failed to fetch genres";
			throw new Error(errorMessage);
		}
	},
};
