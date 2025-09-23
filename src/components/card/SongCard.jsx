import { useDispatch } from "react-redux";
import { useState } from "react";

import { setCurrentSong } from "../../redux/playerSlice";
import { secondsToTime } from "../../utils";

export default function SongCard({ song }) {
	const dispatch = useDispatch();
	const [functional, setFunctional] = useState(false);

	const handlePlay = () => {
		dispatch(setCurrentSong(song));
	};

	return (
		<article className="flex relative p-2 pe-6 rounded-md cursor-pointer hover:bg-gray-500/30 transition-bg duration-150">
			<div className="flex grow items-center" onClick={handlePlay}>
				<img
					className="w-14 aspect-square object-cover rounded-md me-3"
					src={song.albumImage}
					alt={song.title}
				/>
				<div className="flex flex-col justify-end grow">
					<p className="text-lg text-white">{song.title}</p>
					<p className="text-sm text-[#DEDEDE]">{song.artistName}</p>
				</div>
				<p className="text-white self-start">{secondsToTime(song.duration)}</p>
			</div>
			<button
				className="flex gap-0.5 mt-1.5 ms-4 cursor-pointer"
				onClick={() => {
					setFunctional(!functional);
				}}
			>
				<span className="h-0.75 w-0.75 rounded-full bg-white"></span>
				<span className="h-0.75 w-0.75 rounded-full bg-white"></span>
				<span className="h-0.75 w-0.75 rounded-full bg-white"></span>
			</button>
			{/* {functional && (
				<div className="absolute bottom-8 right-5 bg-black rounded-md p-4 flex flex-col gap-3">
					<button className="text-white">Add to Playlist</button>
					<button className="text-white">Add to Favourites</button>
				</div>
			)} */}
		</article>
	);
}
