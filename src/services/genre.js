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

	getSongsByGenre: async (genreId) => {
		try {
			const response = await apiClient.get(`/song/genre/${genreId}`);

			return {
				success: true,
				data: response.data.data,
			};
		} catch (error) {
			const errorMessage =
				error.response?.data?.message || "Failed to fetch songs by genre";
			throw new Error(errorMessage);
		}
	},
};
