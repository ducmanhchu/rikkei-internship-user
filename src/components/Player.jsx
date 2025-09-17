import { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	togglePlay,
	setCurrentTime,
	setDuration,
	setVolume,
	nextSong,
	previousSong,
	clearPlayer,
} from "../redux/playerSlice";
import apiClient from "../services/http";
import { songService } from "../services/song";

export default function Player() {
	const dispatch = useDispatch();
	const { isLogin } = useSelector((state) => state.auth);

	const audioRef = useRef(null);
	const { currentSong, isPlaying, currentTime, duration, volume } = useSelector(
		(state) => state.player
	);
	const listenedTime = useRef(new Set());
	const viewSubmittedRef = useRef(false);
	const historySubmittedRef = useRef(false);

	useEffect(() => {
		if (audioRef.current && isLogin) {
			if (isPlaying) {
				audioRef.current.play();
			} else {
				audioRef.current.pause();
			}
		}
	}, [currentSong, isPlaying]);

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

	if (!currentSong) {
		return null;
	}

	if (!isLogin) {
		return (
			<div
				className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center p-4	"
				onClick={() => dispatch(clearPlayer())}
			>
				<div className="flex flex-col gap-6 backdrop-blur-sm rounded-lg p-8 text-center md:flex-row">
					<img
						className="w-32 h-32 rounded-lg object-cover mx-auto md:w-42 md:h-42 lg:w-52 lg:h-52"
						src={currentSong.albumImage}
						alt={currentSong.title}
					/>

					<div className="">
						<div className="mb-6">
							<h2 className="text-white text-2xl font-bold mb-2 lg:text-3xl">
								Đăng nhập
							</h2>
							<h2 className="text-white text-2xl font-bold mb-2 lg:text-3xl">
								để nghe ngay
							</h2>
						</div>

						<button className="w-full cursor-pointer bg-[#3BC8E7] hover:bg-[#099bbc] text-black font-bold py-3 px-6 rounded-full transition-colors duration-200 text-md">
							Đăng ký miễn phí
						</button>

						<div className="text-white text-sm mt-4">
							Bạn đã có tài khoản?&nbsp;
							<button className="text-white underline hover:text-gray-300 font-semibold cursor-pointer">
								Đăng nhập
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="fixed bottom-0 left-0 right-0 bg-black py-4 z-50">
			<audio
				ref={audioRef}
				src={currentSong.songUrl}
				onTimeUpdate={handleTimeUpdate}
				onLoadedMetadata={handleLoadedMetadata}
				onEnded={() => dispatch(nextSong())}
			/>

			<div className="flex mx-auto gap-4 max-w-7xl">
				{/* Song Info */}
				<div className="flex items-center gap-3 min-w-0 flex-1">
					<img
						className="w-12 h-12 rounded object-cover"
						src={currentSong.albumImage}
						alt={currentSong.title}
					/>
					<div className="min-w-0 flex-1">
						<p className="text-white font-medium truncate">
							{currentSong.title}
						</p>
						<p className="text-gray-400 text-sm truncate">
							{currentSong.artistName}
						</p>
					</div>
				</div>

				{/* Controls */}
				<div className="flex flex-col items-center gap-2 flex-1">
					<div className="flex items-center gap-4">
						<button
							onClick={() => dispatch(previousSong())}
							className="text-gray-400 cursor-pointer hover:scale-110 hover:text-white transition-all"
						>
							<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
								<path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z" />
							</svg>
						</button>

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

						<button
							onClick={() => dispatch(nextSong())}
							className="text-gray-400 cursor-pointer hover:scale-110 hover:text-white transition-all"
						>
							<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
								<path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798l-5.445-3.63z" />
							</svg>
						</button>
					</div>

					{/* Progress Bar */}
					<div className="flex items-center w-full max-w-md">
						<span className="text-white text-center text-sm w-12">
							{formatTime(currentTime)}
						</span>
						<div
							className="flex-1 h-1 mx-2 bg-gray-600 rounded-full cursor-pointer hover:scale-102 hover:bg-gray-500 transition-all"
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
				<div className="flex items-center gap-2 min-w-0 flex-1 justify-end">
					<svg
						className="w-5 h-5 text-white me-2"
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
						className="w-20 h-1.5 cursor-pointer appearance-none outline-none rounded-full overflow-hidden hover:scale-105 transition-transform
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
		</div>
	);
}
