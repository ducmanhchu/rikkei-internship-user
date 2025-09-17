import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	currentSong: null,
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
			const song = action.payload;
			state.isPlaying = true;
			state.currentSong = song;

			const index = state.playlist.findIndex((s) => s.id === song.id);
			state.currentIndex = index >= 0 ? index : -1;
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
		},
		nextSong: (state) => {
			if (state.currentIndex < state.playlist.length - 1) {
				state.currentIndex += 1;
				state.currentSong = state.playlist[state.currentIndex];
			}
		},
		previousSong: (state) => {
			if (state.currentIndex > 0) {
				state.currentIndex -= 1;
				state.currentSong = state.playlist[state.currentIndex];
			}
		},
		clearPlayer: (state) => {
			state.currentSong = null;
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
