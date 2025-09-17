import apiClient from "./http";

export const albumService = {
	createAlbum: async (title, releaseDate, coverImage, type) => {
		try {
			const response = await apiClient.post("/albums", {
				title,
				releaseDate,
				coverImage,
				type,
			});

			return {
				success: true,
				data: response.data.data,
				message: response.data.message || "Album created successfully",
			};
		} catch (error) {
			const errorMessage =
				error.response?.data?.message || "Failed to create album";
			throw new Error(errorMessage);
		}
	},

	getAllAlbums: async () => {
		try {
			const response = await apiClient.get("/albums");
			return {
				success: true,
				data: response.data.data,
			};
		} catch (error) {
			const errorMessage =
				error.response?.data?.message || "Failed to fetch albums";
			throw new Error(errorMessage);
		}
	},

	getFeaturedAlbums: async () => {
		try {
			const response = await apiClient.get("/album/featured");

			return {
				success: true,
				data: response.data.data,
			};
		} catch (error) {
			const errorMessage =
				error.response?.data?.message || "Failed to fetch featured albums";
			throw new Error(errorMessage);
		}
	},

	getAlbumsByArtist: async (artistID) => {
		try {
			const response = await apiClient.get(`/album/${artistID}`);

			return {
				success: true,
				data: response.data.data,
			};
		} catch (error) {
			const errorMessage =
				error.response?.data?.message || "Failed to fetch albums by artist";
			throw new Error(errorMessage);
		}
	},
};
