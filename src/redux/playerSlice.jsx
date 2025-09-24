import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	currentSongId: null,
	isPlaying: false,
	currentTime: 0,
	duration: 0,
	volume: 1,
	playlist: [],
	currentIndex: -1,
};

const playerSlice = createSlice({
	name: "player",
	initialState,
	reducers: {
		setCurrentSong: (state, action) => {
			const id =
				typeof action.payload === "object" ? action.payload.id : action.payload;

			state.currentSongId = id;

			let index = state.playlist.findIndex((s) => s.id === id);

			if (index === -1 && typeof action.payload === "object") {
				state.playlist = [action.payload];
				index = 0;
			}

			state.currentIndex = index >= 0 ? index : -1;
			state.isPlaying = true;
		},
		togglePlay: (state) => {
			state.isPlaying = !state.isPlaying;
		},
		setCurrentTime: (state, action) => {
			state.currentTime = action.payload;
		},
		setDuration: (state, action) => {
			state.duration = action.payload;
		},
		setVolume: (state, action) => {
			state.volume = action.payload;
		},
		setPlaylist: (state, action) => {
			state.playlist = action.payload;
			if (state.currentSongId !== null) {
				state.currentIndex = state.playlist.findIndex(
					(s) => s.id === state.currentSongId
				);
			} else {
				state.currentIndex = -1;
			}
		},
		nextSong: (state) => {
			if (state.currentIndex < state.playlist.length - 1) {
				state.currentIndex += 1;
				state.currentSongId = state.playlist[state.currentIndex]?.id ?? null;
				state.isPlaying = true;
			}
		},
		previousSong: (state) => {
			if (state.currentIndex > 0) {
				state.currentIndex -= 1;
				state.currentSongId = state.playlist[state.currentIndex]?.id ?? null;
				state.isPlaying = true;
			}
		},
		clearPlayer: (state) => {
			state.currentSongId = null;
			state.isPlaying = false;
			state.currentTime = 0;
			state.duration = 0;
			state.playlist = [];
			state.currentIndex = -1;
		},
	},
});

export const {
	setCurrentSong,
	togglePlay,
	setCurrentTime,
	setDuration,
	setVolume,
	setPlaylist,
	nextSong,
	previousSong,
	clearPlayer,
} = playerSlice.actions;

export default playerSlice.reducer;
