import { useDispatch } from "react-redux";
import { setCurrentSong } from "../redux/playerSlice";
import { secondsToTime } from "../utils";

export default function SongCard({ song }) {
	const dispatch = useDispatch();

	const handlePlay = () => {
		dispatch(setCurrentSong(song));
	};

	return (
		<article
			className="flex p-2 pe-6 rounded-md cursor-pointer hover:bg-gray-500/30 transition-bg duration-150"
			onClick={handlePlay}
		>
			<img
				className="w-14 aspect-square object-cover rounded-md me-3"
				src={song.albumImage}
				alt={song.title}
			/>
			<div className="flex flex-col justify-end grow">
				<p className="text-lg text-white">{song.title}</p>
				<p className="text-sm text-[#DEDEDE]">{song.artistName}</p>
			</div>
			<p className="text-white">{secondsToTime(song.duration)}</p>
		</article>
	);
}
