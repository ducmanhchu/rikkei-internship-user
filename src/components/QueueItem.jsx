import { useDispatch } from "react-redux";

import { setCurrentSong } from "../redux/playerSlice";

export default function QueueItem({ item }) {
	const dispatch = useDispatch();

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
				<p className="text-[#3BC8E7] font-semibold text-md">{item.title}</p>
				<p className="text-gray-400 text-sm">{item.artistName}</p>
			</div>
		</div>
	);
}
