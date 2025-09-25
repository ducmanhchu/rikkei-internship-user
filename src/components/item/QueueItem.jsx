import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { selectCurrentSong } from "../../redux/selector/playerSelector";
import { setCurrentSong } from "../../redux/playerSlice";

export default function QueueItem({ item }) {
	const dispatch = useDispatch();
	const currentSong = useSelector(selectCurrentSong);

	return (
		<div
			className="flex gap-4 cursor-pointer"
			onClick={() => dispatch(setCurrentSong(item))}
		>
			<img
				src={item.albumImage}
				alt="Song cover"
				className="aspect-square w-12 h-12 rounded-md"
			/>
			<div className="flex flex-col flex-1 justify-center">
				<p
					className={`font-semibold text-md ${
						item.id === currentSong.id ? "text-[#3BC8E7]" : "text-white"
					}`}
				>
					{item.title}
				</p>
				<p className="text-gray-400 text-sm">{item.artistName}</p>
			</div>
		</div>
	);
}
