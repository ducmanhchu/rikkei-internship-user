import apiClient from "./http";

export const searchService = {
	searchAll: async (query) => {
		try {
			const searchRes = await apiClient.get("/search", {
				params: {
					keyword: query,
				},
			});

			return {
				success: true,
				data: searchRes.data.data,
			};
		} catch (error) {
			throw new Error(error.response?.data?.message || "Failed to search all");
		}
	},

	searchSong: async (keyword) => {
		try {
			const searchRes = await apiClient.get("/song", {
				params: {
					title: keyword,
				},
			});

			return {
				success: true,
				data: searchRes.data.data,
			};
		} catch (error) {
			throw new Error(error.response?.data?.message || "Failed to search song");
		}
	},

	searchAlbum: async (keyword) => {
		try {
			const searchRes = await apiClient.get("/album/all", {
				params: {
					title: keyword,
				},
			});

			return {
				success: true,
				data: searchRes.data.data,
			};
		} catch (error) {
			throw new Error(
				error.response?.data?.message || "Failed to search album"
			);
		}
	},

	searchArtist: async (keyword) => {
		try {
			const searchRes = await apiClient.get("/user/artist", {
				params: {
					name: keyword,
				},
			});

			return {
				success: true,
				data: searchRes.data.data,
			};
		} catch (error) {
			throw new Error(
				error.response?.data?.message || "Failed to search artist"
			);
		}
	},

	searchPlaylist: async (query) => {
		try {
			const searchRes = await apiClient.get("/playlist/search", {
				params: {
					keyword: query,
				},
			});

			return {
				success: true,
				data: searchRes.data.data,
			};
		} catch (error) {
			throw new Error(
				error.response?.data?.message || "Failed to search playlist"
			);
		}
	},
};
