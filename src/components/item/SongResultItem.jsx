import { useDispatch } from "react-redux";

import { secondsToTime } from "../../utils";
import { setCurrentSong } from "../../redux/playerSlice";

export default function SongResultItem({ song }) {
	const dispatch = useDispatch();

	return (
		<div className="flex items-center cursor-pointer hover:bg-gray-600/20 transition-colors duration-200 rounded-md p-2">
			<div
				className="flex items-center flex-1 gap-4"
				onClick={() => dispatch(setCurrentSong(song))}
			>
				<img
					src={song.albumImage}
					alt={song.title}
					className="w-14 aspect-square object-cover rounded-md"
				/>
				<div className="flex flex-col">
					<p className="text-white text-base">{song.title}</p>
					<p className="text-gray-400 text-sm">{song.artistName}</p>
				</div>
			</div>
			<p className="text-white text-base">{secondsToTime(song.duration)}</p>
		</div>
	);
}
