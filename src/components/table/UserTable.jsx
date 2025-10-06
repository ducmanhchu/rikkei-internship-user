import { useDispatch } from "react-redux";
import { useState, useRef } from "react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";

import { setCurrentSong, setPlaylist } from "../../redux/playerSlice";
import { secondsToTime } from "../../utils";
import SongOptionsMenu from "../modal/SongOptionsMenu";

export default function UserTable({ data, onRemove, isDownloaded }) {
	const dispatch = useDispatch();
	const [openMenuId, setOpenMenuId] = useState(null);
	const anchorRef = useRef(new Map());

	const getAnchorRef = (id) => {
		if (!anchorRef.current.has(id)) {
			anchorRef.current.set(id, { current: null });
		}
		return anchorRef.current.get(id);
	};

	const handlePlay = (song) => {
		dispatch(setCurrentSong(song));
		dispatch(setPlaylist(data));
	};

	return (
		<div>
			<table className="text-white w-full border-collapse">
				<thead className="text-[#2EC8E6] border-b border-b-[#2EC8E6]">
					<tr>
						<th className="text-left py-3 px-2 font-normal">#</th>
						<th className="text-left py-3 px-4 font-normal">Song Title</th>
						{!isDownloaded && (
							<th className="text-left py-3 px-4 font-normal">Album</th>
						)}
						<th className="text-left py-3 px-4 font-normal">Duration</th>
						<th className="text-center py-3 px-4 font-normal">Actions</th>
					</tr>
				</thead>
				<tbody>
					{data.length === 0 && (
						<tr>
							<td colSpan={5} className="py-4 px-4 text-center">
								No song available
							</td>
						</tr>
					)}
					{data.length > 0 &&
						data.map((song, index) => (
							<tr
								key={song.id}
								className=" hover:bg-gray-800/30 cursor-pointer transition-colors duration-150 border-b border-gray-600/30"
								onClick={() => handlePlay(song)}
							>
								<td className="py-4 px-2 text-gray-300">
									{index < 9 ? `0${index + 1}` : index + 1}
								</td>
								<td className={`py-4 px-4`}>{song.title}</td>
								{!isDownloaded && (
									<td className={`py-4 px-4`}>{song?.album?.title}</td>
								)}
								<td className="py-4 px-4 text-gray-300">
									{secondsToTime(song.duration)}
								</td>
								<td className="flex gap-10 justify-center items-center py-4 px-4 text-center">
									<button
										ref={getAnchorRef(song.id)}
										className="flex gap-0.5 mt-1.5 ms-2 pb-1.5 cursor-pointer hover:scale-115 transition-transform duration-150"
										onClick={(e) => {
											e.stopPropagation();
											setOpenMenuId(openMenuId === song.id ? null : song.id);
										}}
									>
										<EllipsisHorizontalIcon className="size-5 text-gray-300" />
									</button>
									{openMenuId === song.id && (
										<SongOptionsMenu
											anchorRect={getAnchorRef(
												song.id
											).current?.getBoundingClientRect?.()}
											anchorRef={getAnchorRef(song.id)}
											song={song}
											onClose={() => setOpenMenuId(null)}
										/>
									)}
									<button className="cursor-pointer hover:scale-110 transition-transform duration-150 p-1">
										<img
											src="/icons/remove.svg"
											alt="Remove from favourite"
											className="w-5 h-5 opacity-70 hover:opacity-100"
											onClick={(e) => {
												e.stopPropagation();
												onRemove(song.id);
											}}
										/>
									</button>
								</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
}
