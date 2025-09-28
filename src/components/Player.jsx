import { useCallback, useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useColorThief from "use-color-thief";

import {
	togglePlay,
	setCurrentTime,
	setDuration,
	setVolume,
	nextSong,
	previousSong,
	setRepeatSong,
	setRepeatPlaylist,
	setCurrentIndex,
	setShuffle,
} from "../redux/playerSlice";
import { openModal } from "../redux/modalSlice";
import { songService } from "../services/song";
import { selectCurrentSong } from "../redux/selector/playerSelector";
import apiClient from "../services/http";
import Queue from "./Queue";

export default function Player() {
	const dispatch = useDispatch();
	const { isLogin } = useSelector((state) => state.auth);
	const audioRef = useRef(null);
	const currentSong = useSelector(selectCurrentSong);
	const {
		isPlaying,
		currentTime,
		duration,
		volume,
		currentIndex,
		playlist,
		repeatSong,
		repeatPlaylist,
		shuffle,
	} = useSelector((state) => state.player);
	const listenedTime = useRef(new Set());
	const viewSubmittedRef = useRef(false);
	const historySubmittedRef = useRef(false);
	const [queue, setQueue] = useState(false);
	const handleCloseQueue = useCallback(() => setQueue(false), []);
	const repeatType = repeatSong ? "song" : repeatPlaylist ? "playlist" : "none";
	const { color } = useColorThief(currentSong?.album?.coverImage, {
		format: "hex",
	});

	useEffect(() => {
		if (audioRef.current && isLogin) {
			if (isPlaying) {
				audioRef.current.play();
			} else {
				audioRef.current.pause();
			}
		}
	}, [currentSong?.id, isPlaying]);

	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.volume = volume;
		}
	}, [volume]);

	useEffect(() => {
		if (currentSong?.id && isLogin && !historySubmittedRef.current) {
			historySubmittedRef.current = true;
			songService.playSong(currentSong.id).catch((error) => {
				console.error("Error submitting to history:", error);
			});
		}
	}, [currentSong?.id]);

	useEffect(() => {
		if (!isLogin && currentSong) {
			dispatch(
				openModal({ modalName: "AUTH_REQ_MODAL", modalData: currentSong })
			);
		}
	}, [isLogin, currentSong]);

	// Reset tracking khi đổi bài
	useEffect(() => {
		listenedTime.current = new Set();
		viewSubmittedRef.current = false;
		historySubmittedRef.current = false;
	}, [currentSong?.id]);

	// Track listened time
	const handleTimeUpdate = () => {
		if (!audioRef.current) return;

		const currentTime = audioRef.current.currentTime;
		dispatch(setCurrentTime(currentTime));

		if (
			currentSong &&
			audioRef.current.duration >= 30 &&
			!viewSubmittedRef.current
		) {
			const second = Math.floor(currentTime);
			listenedTime.current.add(second);

			if (listenedTime.current.size >= 30) {
				viewSubmittedRef.current = true;
				apiClient.post(`/song/${currentSong.id}/view`).catch((error) => {
					console.error("Error submitting view:", error);
				});
			}
		}

		if (currentTime === audioRef.current.duration) {
			dispatch(togglePlay());
		}
	};

	const handleLoadedMetadata = () => {
		if (audioRef.current) {
			dispatch(setDuration(audioRef.current.duration));
		}
	};

	const handleSeek = (e) => {
		const rect = e.currentTarget.getBoundingClientRect();
		const clickX = e.clientX - rect.left;
		const width = rect.width;
		const newTime = (clickX / width) * duration;

		if (audioRef.current) {
			audioRef.current.currentTime = newTime;
			dispatch(setCurrentTime(newTime));
		}
	};

	const formatTime = (time) => {
		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time % 60);
		return `${minutes}:${seconds.toString().padStart(2, "0")}`;
	};

	const handleRepeat = () => {
		if (repeatType === "none") {
			dispatch(setRepeatPlaylist(true));
		} else if (repeatType === "playlist") {
			dispatch(setRepeatPlaylist(false));
			dispatch(setRepeatSong(true));
		} else {
			dispatch(setRepeatSong(false));
			dispatch(setRepeatPlaylist(false));
		}
	};

	const handleShuffle = () => dispatch(setShuffle());

	const handleEnded = () => {
		if (repeatSong) {
			dispatch(setCurrentTime(0));
			dispatch(togglePlay());
		} else if (repeatPlaylist && currentIndex === playlist.length - 1) {
			dispatch(setCurrentIndex(0));
			dispatch(togglePlay());
		} else {
			dispatch(nextSong());
		}
	};

	if (!currentSong) {
		return null;
	}

	if (!isLogin) {
		return null;
	}

	return (
		<div
			className="fixed bottom-0 left-0 right-0 bg-black py-4 z-50"
			style={{
				background: color
					? `linear-gradient(90deg, ${color} 0%, black 25%)`
					: undefined,
			}}
		>
			<audio
				ref={audioRef}
				src={currentSong.songUrl}
				onTimeUpdate={handleTimeUpdate}
				onLoadedMetadata={handleLoadedMetadata}
				onEnded={handleEnded}
			/>

			<div className="flex px-8">
				{/* Song Info */}
				<div className="flex items-center gap-3 md:w-36">
					<img
						src={currentSong.album?.coverImage}
						alt={currentSong.title}
						className="w-14 h-14 rounded shadow-xl/30 object-cover"
						crossOrigin="anonymous"
					/>
					<div>
						<p className="text-white text-[18px] truncate">
							{currentSong.title}
						</p>
						<p className="text-gray-300 text-sm truncate">
							{currentSong?.artist?.firstName +
								" " +
								currentSong?.artist?.lastName}
						</p>
					</div>
				</div>

				{/* Controls */}
				<div className="flex flex-col items-center gap-2 flex-1 mx-4">
					<div className="flex items-center gap-4">
						{/* Shuffle Button */}
						<button
							className="text-gray-400 cursor-pointer hover:scale-110 hover:text-white transition-all"
							onClick={handleShuffle}
						>
							<svg className="w-5 h-5" viewBox="0 0 24 24">
								<path
									d="M18 4L21 7M21 7L18 10M21 7H17C16.0707 7 15.606 7 15.2196 7.07686C13.6329 7.39249 12.3925 8.63288 12.0769 10.2196C12 10.606 12 11.0707 12 12C12 12.9293 12 13.394 11.9231 13.7804C11.6075 15.3671 10.3671 16.6075 8.78036 16.9231C8.39397 17 7.92931 17 7 17H3M18 20L21 17M21 17L18 14M21 17H17C16.0707 17 15.606 17 15.2196 16.9231C15.1457 16.9084 15.0724 16.8917 15 16.873M3 7H7C7.92931 7 8.39397 7 8.78036 7.07686C8.85435 7.09158 8.92758 7.1083 9 7.12698"
									stroke={shuffle ? "#3BC8E7" : "currentColor"}
									strokeWidth="2"
								/>
							</svg>
						</button>

						{/* Previous Button */}
						<button
							onClick={() => dispatch(previousSong())}
							className="text-gray-400 cursor-pointer hover:scale-110 hover:text-white transition-all"
						>
							<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
								<path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z" />
							</svg>
						</button>

						{/* Play/Pause Button */}
						<button
							onClick={() => dispatch(togglePlay())}
							className="bg-white text-black rounded-full p-1.5 cursor-pointer hover:scale-110 transition-transform"
						>
							{isPlaying ? (
								<svg
									className="w-6 h-6"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path d="M6 5a1 1 0 011-1h2a1 1 0 011 1v14a1 1 0 01-1 1H7a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h2a1 1 0 011 1v14a1 1 0 01-1 1h-2a1 1 0 01-1-1V5z" />
								</svg>
							) : (
								<svg
									className="w-6 h-6"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18c.62-.39.62-1.29 0-1.68L9.54 5.98C8.87 5.55 8 6.03 8 6.82z" />
								</svg>
							)}
						</button>

						{/* Next Button */}
						<button
							onClick={() => dispatch(nextSong())}
							className="text-gray-400 cursor-pointer hover:scale-110 hover:text-white transition-all"
						>
							<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
								<path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798l-5.445-3.63z" />
							</svg>
						</button>

						{/* Repeat Button */}
						<button
							className="text-gray-400 cursor-pointer hover:scale-110 hover:text-white transition-all"
							onClick={handleRepeat}
						>
							{repeatType === "playlist" || repeatType === "none" ? (
								<svg
									className="w-6 h-6"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M17 17H8C6.33333 17 3 16 3 12C3 8 6.33333 7 8 7H16C17.6667 7 21 8 21 12C21 13.4943 20.5348 14.57 19.865 15.3312"
										stroke={repeatPlaylist ? "#3BC8E7" : "currentColor"}
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M14.5 14.5L17 17L14.5 19.5"
										stroke={repeatPlaylist ? "#3BC8E7" : "currentColor"}
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							) : (
								<svg
									className="w-6 h-6"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M17 17H8C6.33333 17 3 16 3 12"
										stroke={repeatSong ? "#3BC8E7" : "currentColor"}
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M8 7H16C17.6667 7 21 8 21 12C21 13.4943 20.5348 14.57 19.865 15.3312"
										stroke={repeatSong ? "#3BC8E7" : "currentColor"}
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M14.5 14.5L17 17L14.5 19.5"
										stroke={repeatSong ? "#3BC8E7" : "currentColor"}
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M4 8V5V3L2 4"
										stroke={repeatSong ? "#3BC8E7" : "currentColor"}
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							)}
						</button>
					</div>

					{/* Progress Bar */}
					<div className="flex items-center w-full max-w-xl">
						<span className="text-white text-center text-sm w-12">
							{formatTime(currentTime)}
						</span>
						<div
							className="flex-1 min-w-6 h-1 mx-2 bg-gray-600 rounded-full cursor-pointer hover:scale-102 hover:bg-gray-500 transition-all"
							onClick={handleSeek}
						>
							<div
								className="h-full bg-white rounded-full transition-all"
								style={{
									width: `${duration ? (currentTime / duration) * 100 : 0}%`,
								}}
							/>
						</div>
						<span className="text-white text-center text-sm w-12">
							{formatTime(duration)}
						</span>
					</div>
				</div>

				{/* Volume Control */}
				<div className="flex items-center gap-2 min-w-0 justify-end">
					<button
						className="text-gray-400 cursor-pointer hover:scale-110 hover:text-white transition-all"
						onClick={() => setQueue(!queue)}
					>
						<svg className="w-5 h-5" viewBox="0 0 24 24">
							<path
								d="M22,4H2A1,1,0,0,0,1,5v6a1,1,0,0,0,1,1H22a1,1,0,0,0,1-1V5A1,1,0,0,0,22,4Zm-1,6H3V6H21Zm2,5a1,1,0,0,1-1,1H2a1,1,0,0,1,0-2H22A1,1,0,0,1,23,15Zm0,4a1,1,0,0,1-1,1H2a1,1,0,0,1,0-2H22A1,1,0,0,1,23,19Z"
								fill={`${queue ? "#3BC8E7" : "#99a1af"}`}
							/>
						</svg>
					</button>

					<svg
						className="w-5 h-5 text-white mx-2"
						fill="currentColor"
						viewBox="0 0 20 20"
					>
						<path d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.824L4.383 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.383l4-3.824a1 1 0 011-.1zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" />
					</svg>
					<input
						type="range"
						min="0"
						max="1"
						step="0.1"
						value={volume}
						onChange={(e) => dispatch(setVolume(parseFloat(e.target.value)))}
						className="w-6 md:w-20 h-1.5 cursor-pointer appearance-none outline-none rounded-full overflow-hidden hover:scale-105 transition-transform
							[&::-webkit-slider-thumb]:appearance-none
							[&::-webkit-slider-thumb]:w-1.5
							[&::-webkit-slider-thumb]:h-1.5
							[&::-webkit-slider-thumb]:rounded-full
							[&::-webkit-slider-thumb]:outline-none
							[&::-webkit-slider-thumb]:bg-white
							[&::-webkit-slider-thumb]:cursor-pointer
							[&::-webkit-slider-thumb]:shadow-[-100px_0_0_95px_white]
							[&::-webkit-slider-runnable-track]:bg-gray-600"
					/>
				</div>
			</div>
			{queue && <Queue onClosed={handleCloseQueue} />}
		</div>
	);
}
