import apiClient from "./http";

export const playlistService = {
	getPlaylists: async () => {
		try {
			const response = await apiClient.get("/playlist");

			return {
				success: true,
				data: response.data.data,
			};
		} catch (error) {
			throw new Error(
				error.response?.data?.data ||
					error.response?.data?.message ||
					"Failed to fetch playlists"
			);
		}
	},

	createPlaylist: async (name, isPublic) => {
		try {
			const response = await apiClient.post("/playlist", {
				name,
				isPublic,
			});

			return {
				success: true,
				data: response.data.data,
			};
		} catch (error) {
			throw new Error(
				error.response?.data?.data ||
					error.response?.data?.message ||
					"Failed to create playlist"
			);
		}
	},

	addSongToPlaylist: async (playlistId, songId) => {
		try {
			const response = await apiClient.post(
				`/playlist/${playlistId}/songs/${songId}`
			);

			return {
				success: true,
				data: response.data.data,
			};
		} catch (error) {
			throw new Error(
				error.response?.data?.data ||
					error.response?.data?.message ||
					"Failed to add song to playlist"
			);
		}
	},

	removeSongFromPlaylist: async (playlistId, songId) => {
		try {
			const response = await apiClient.delete(
				`/playlist/${playlistId}/songs/${songId}`
			);

			return {
				success: true,
				data: response.data.data,
			};
		} catch (error) {
			throw new Error(
				error.response?.data?.data ||
					error.response?.data?.message ||
					"Failed to remove song from playlist"
			);
		}
	},

	getPlaylistById: async (playlistId) => {
		try {
			const response = await apiClient.get(`/playlist/${playlistId}`);

			return {
				success: true,
				data: response.data.data,
			};
		} catch (error) {
			throw new Error(
				error.response?.data?.data ||
					error.response?.data?.message ||
					"Failed to fetch playlist"
			);
		}
	},

	updatePlaylist: async (playlistId, name, isPublic) => {
		try {
			const response = await apiClient.put(`/playlist/${playlistId}`, {
				name,
				isPublic,
			});

			return {
				success: true,
				data: response.data.data,
			};
		} catch (error) {
			throw new Error(
				error.response?.data?.data ||
					error.response?.data?.message ||
					"Failed to update playlist"
			);
		}
	},

	removePlaylist: async (playlistId) => {
		try {
			const response = await apiClient.delete(`/playlist/${playlistId}`);

			return {
				success: true,
				data: response.data.data,
			};
		} catch (error) {
			throw new Error(
				error.response?.data?.data ||
					error.response?.data?.message ||
					"Failed to remove playlist"
			);
		}
	},
};
