import { useSelector } from "react-redux";

import QueueItem from "./QueueItem";

export default function Queue({ onClosed }) {
	const currentSong = useSelector((state) => state.player.currentSong);
	const playlist = useSelector((state) => state.player.playlist);

	return (
		<div className="absolute bottom-22 right-0 w-96 h-[75vh] bg-black text-white py-4 px-6 rounded-md">
			<div className="flex justify-between mb-4">
				<p className="font-semibold text-xl">Queue</p>
				<p className="text-2xl cursor-pointer" onClick={onClosed}>
					x
				</p>
			</div>

			<div className="flex flex-col gap-2 text-white overflow-y-auto">
				<p className="text-sm">Now playing</p>
				{currentSong && <QueueItem item={currentSong} />}
			</div>
		</div>
	);
}
