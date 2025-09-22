import apiClient from "./http";

export const songService = {
	getSongFromAlbum: async (albumID) => {
		try {
			const response = await apiClient.get(`/song/album/${albumID}`);

			return {
				success: true,
				data: response.data.data,
			};
		} catch (error) {
			throw new Error(
				error.response?.data?.message || "Failed to fetch songs from album"
			);
		}
	},

	increaseViewSong: async (songID) => {
		try {
			const response = await apiClient.post(`/song/${songID}/view`);

			return {
				success: true,
				data: response.data.data,
			};
		} catch (error) {
			throw new Error(
				error.response?.data?.message || "Failed to increase view for song"
			);
		}
	},

	getWeeklySongs: async () => {
		try {
			const response = await apiClient.get("/song/top-weekly");

			return {
				success: true,
				data: response.data.data,
			};
		} catch (error) {
			throw new Error(
				error.response?.data?.message || "Failed to fetch top songs"
			);
		}
	},

	playSong: async (songID) => {
		try {
			const response = await apiClient.post(`/song/${songID}/play`);
			return {
				success: true,
				data: response.data.data,
			};
		} catch (error) {
			throw new Error(error.response?.data?.message || "Failed to play song");
		}
	},

	getSongByArtist: async (artistID) => {
		try {
			const response = await apiClient.get(`/song/artist/${artistID}`);
			return {
				success: true,
				data: response.data.data,
			};
		} catch (error) {
			throw new Error(
				error.response?.data?.message || "Failed to fetch songs by artist"
			);
		}
	},

	getNewSong: async () => {
		try {
			const response = await apiClient.get("/song/new-songs");

			return {
				success: true,
				data: response.data.data,
			};
		} catch (error) {
			throw new Error(
				error.response?.data?.message || "Failed to fetch new songs"
			);
		}
	},

	getPlayedHistory: async () => {
		try {
			const response = await apiClient.get("/song/my-history");

			return {
				success: true,
				data: response.data.data,
			};
		} catch (error) {
			throw new Error(
				error.response?.data?.message || "Failed to fetch played history"
			);
		}
	},

	getTopAllTimeSongs: async () => {
		try {
			const response = await apiClient.get("/song/stat/view");
			return {
				success: true,
				data: response.data.data,
			};
		} catch (error) {
			throw new Error(
				error.response?.data?.message || "Failed to fetch top all time songs"
			);
		}
	},

	getFavouriteSongs: async () => {
		try {
			const response = await apiClient.get("/song/favor-song");
			return {
				success: true,
				data: response.data.data,
			};
		} catch (error) {
			throw new Error(
				error.response?.data?.message || "Failed to fetch favourite songs"
			);
		}
	},
};
