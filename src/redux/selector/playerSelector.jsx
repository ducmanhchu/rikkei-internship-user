import { createSelector } from "@reduxjs/toolkit";

export const selectPlaylist = (s) => s.player.playlist;
export const selectCurrentIndex = (s) => s.player.currentIndex;
export const selectCurrentSongId = (s) => s.player.currentSongId;

export const selectCurrentSong = createSelector(
	[selectPlaylist, selectCurrentIndex],
	(playlist, idx) => (idx >= 0 && idx < playlist.length ? playlist[idx] : null)
);
