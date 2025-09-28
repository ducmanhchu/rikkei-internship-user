import apiClient from "./http";

export const albumService = {
	createAlbum: async (title, releaseDate, coverImage, type) => {
		try {
			const response = await apiClient.post("/album/create", {
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

	getAlbumById: async (id) => {
		try {
			const response = await apiClient.get(`/album/${id}`);
			return {
				success: true,
				data: response.data.data,
			};
		} catch (error) {
			const errorMessage =
				error.response?.data?.message || "Failed to fetch album";
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
			const response = await apiClient.get(`/album/${artistID}/artist`);

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

	getTop15Albums: async () => {
		try {
			const response = await apiClient.get("/album/top15");
			return {
				success: true,
				data: response.data.data,
			};
		} catch (error) {
			const errorMessage =
				error.response?.data?.message || "Failed to fetch top 15 albums";
			throw new Error(errorMessage);
		}
	},

	getNewAlbums: async () => {
		try {
			const response = await apiClient.get("/album/new-releases");
			return {
				success: true,
				data: response.data.data,
			};
		} catch (error) {
			const errorMessage =
				error.response?.data?.message || "Failed to fetch new albums";
			throw new Error(errorMessage);
		}
	},

	updateAlbum: async (id, title, coverImageFile) => {
		try {
			const formData = new FormData();

			if (title) {
				formData.append("title", title);
			}

			if (coverImageFile) {
				formData.append("coverImage", coverImageFile);
			}

			const response = await apiClient.put(`/album/${id}/update`, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			return {
				success: true,
				data: response.data.data,
			};
		} catch (error) {
			const errorMessage =
				error.response?.data?.data ||
				error.response?.data?.message ||
				"Failed to update album";
			throw new Error(errorMessage);
		}
	},
};
