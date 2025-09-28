import { useDispatch } from "react-redux";
import { useRef, useState } from "react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";

import { setCurrentSong } from "../../redux/playerSlice";
import { secondsToTime } from "../../utils";
import SongOptionsMenu from "../modal/SongOptionsMenu";

export default function SongCard({ song }) {
	const dispatch = useDispatch();
	const [openMenu, setOpenMenu] = useState(false);
	const anchorRef = useRef(null);

	return (
		<article className="flex relative p-2 pe-10 rounded-md hover:bg-gray-500/30 transition-bg duration-150">
			<div
				className="flex grow shrink-0 items-center cursor-pointer"
				onClick={() => dispatch(setCurrentSong(song))}
			>
				<img
					className="size-13 aspect-square object-cover rounded-md me-3.5"
					src={song?.album?.coverImage}
					alt={song.title}
				/>
				<div className="flex flex-col justify-end gap-1 grow">
					<p className="text-base text-white">{song.title}</p>
					<p className="text-sm text-[#DEDEDE]">
						{song?.artist?.firstName + " " + song?.artist?.lastName}
					</p>
				</div>
				<p className="text-gray-300 text-sm me-2 self-center">
					{secondsToTime(song.duration)}
				</p>
			</div>
			<button
				type="button"
				ref={anchorRef}
				className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded hover:scale-115 transition-transform duration-150 cursor-pointer"
				onClick={() => setOpenMenu((v) => !v)}
			>
				<EllipsisHorizontalIcon className="size-5 text-gray-300" />
			</button>
			{openMenu && (
				<SongOptionsMenu
					anchorRect={anchorRef.current?.getBoundingClientRect?.()}
					anchorRef={anchorRef}
					song={song}
					onClose={() => setOpenMenu(false)}
				/>
			)}
		</article>
	);
}
