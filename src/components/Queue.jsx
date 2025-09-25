import { useSelector } from "react-redux";
import { memo } from "react";

import {
	selectCurrentSong,
	selectCurrentIndex,
} from "../redux/selector/playerSelector";
import QueueItem from "./item/QueueItem";

export function Queue({ onClosed }) {
	const currentSong = useSelector(selectCurrentSong);
	const currentIndex = useSelector(selectCurrentIndex);
	const playlist = useSelector((state) => state.player.playlist);

	const upcomingPlaylist = playlist.slice(currentIndex + 1, playlist.length);

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
				<p className="text-sm mt-4">Upcoming</p>
				{upcomingPlaylist.length === 0 ? (
					<p className="text-sm text-gray-400">No songs in the queue</p>
				) : (
					upcomingPlaylist.map((song, index) => (
						<QueueItem key={index} item={song} />
					))
				)}
			</div>
		</div>
	);
}

export default memo(Queue);
