import { useState, useRef } from "react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";

import { useDispatch } from "react-redux";
import { setCurrentSong, setPlaylist } from "../../redux/playerSlice";
import { secondsToTime } from "../../utils";
import SongOptionsMenu from "../modal/SongOptionsMenu";

export default function SongTable({ songs }) {
	const dispatch = useDispatch();
	const [expanded, setExpanded] = useState(false);
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
		dispatch(setPlaylist(songs));
	};

	const songLists = expanded ? songs : songs.slice(0, 5);

	return (
		<div className="">
			<table className="text-white w-full">
				<thead className="text-[#2EC8E6] border-b border-b-[#2EC8E6]">
					<tr className="flex w-full">
						<th className="text-center flex-none w-12 py-3 px-2 font-normal">
							#
						</th>
						<th className="text-left flex-grow py-3 px-2 font-normal">
							Tiêu đề
						</th>
						<th className="text-center flex-none w-25 py-3 px-2 font-normal">
							Thời lượng
						</th>
					</tr>
				</thead>
				<tbody>
					{songs.length > 0 ? (
						songLists.map((song, index) => {
							return (
								<tr
									key={song.id}
									className="flex w-full py-2 cursor-pointer rounded-md hover:bg-gray-400/30 transition-colors"
									onClick={() => handlePlay(song)}
								>
									<td className="text-center text-gray-300 flex-none w-12 py-2 px-2">
										{index + 1}
									</td>
									<td className="flex-grow py-2 px-2">
										<div className="flex flex-col">
											<span className="font-medium">{song.title}</span>
											<span className="text-gray-400 text-sm">
												{song?.artist?.firstName + " " + song?.artist?.lastName}
											</span>
										</div>
									</td>
									<td className="flex gap-2 justify-center items-center flex-none w-25 py-2 px-2">
										<p className="text-gray-300">
											{secondsToTime(song.duration)}
										</p>
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
									</td>
								</tr>
							);
						})
					) : (
						<tr>
							<td colSpan={3} className="text-center text-white py-4">
								No songs available.
							</td>
						</tr>
					)}
				</tbody>
			</table>
			{songs.length > 5 && (
				<button
					className="text-gray-400 font-semibold hover:text-gray-200 cursor-pointer mt-2 ms-5"
					onClick={() => setExpanded(!expanded)}
				>
					{expanded ? "Show Less" : "Show More"}
				</button>
			)}
		</div>
	);
}
