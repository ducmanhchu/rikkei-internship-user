import { useDispatch } from "react-redux";

import { secondsToTime } from "../utils";
import { setCurrentSong } from "../redux/playerSlice";

export default function WeeklyItem({ song, index, isSong, isAlbum }) {
	const dispatch = useDispatch();

	const handlePlay = (song) => {
		dispatch(setCurrentSong(song));
	};

	return (
		<div
			className="flex items-start p-4 border-b border-b-gray-500 cursor-pointer hover:bg-gray-600/20 transition-colors duration-200"
			onClick={() => {
				if (isSong) {
					handlePlay(song);
				}
			}}
		>
			<p className="text-white font-extrabold text-4xl w-12 flex-shrink-0">
				0{index + 1}
			</p>
			<img
				src={song.albumImage}
				alt="Songs Cover"
				className="w-14 rounded-md mx-4"
			/>
			<div className="flex flex-col gap-2 grow ms-4">
				<p className="text-white text-md">{song.title}</p>
				<p className="text-[#DEDEDE] text-sm">{song.artistName}</p>
			</div>
			<p className="text-white">{secondsToTime(song.duration)}</p>
			<button className="flex gap-0.5 mt-1.5 ms-3">
				<span className="h-0.75 w-0.75 rounded-full bg-white"></span>
				<span className="h-0.75 w-0.75 rounded-full bg-white"></span>
				<span className="h-0.75 w-0.75 rounded-full bg-white"></span>
			</button>
		</div>
	);
}
