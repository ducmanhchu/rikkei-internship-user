import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";

import { secondsToTime } from "../../utils";
import { setCurrentSong } from "../../redux/playerSlice";
import SongOptionsMenu from "../modal/SongOptionsMenu";

export default function WeeklyItem({ item, index, isSong }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [openMenu, setOpenMenu] = useState(false);
	const anchorRef = useRef(null);

	return (
		<div className="flex justify-between rounded-md p-4 cursor-pointer hover:bg-gray-600/20 transition-colors duration-200">
			<div
				className="flex"
				onClick={() => {
					if (isSong) {
						dispatch(setCurrentSong(item));
					} else {
						navigate(`/albums/${item.id}`);
					}
				}}
			>
				<p className="hidden text-white font-extrabold text-4xl w-12 flex-shrink-0 md:block">
					{index < 9 ? `0${index + 1}` : index + 1}
				</p>
				<img
					src={isSong ? item?.album?.coverImage : item.coverImage}
					alt="Songs Cover"
					className="w-14 rounded-md ms-4"
				/>
				<div className="flex flex-col self-center gap-1 grow ms-4">
					<p className="text-white text-base">{item.title}</p>
					<p className="text-[#DEDEDE] text-sm">
						{item.artist
							? item?.artist?.firstName + " " + item?.artist?.lastName
							: item?.artistName}
					</p>
				</div>
			</div>
			{isSong && (
				<>
					<div className="flex gap-2 items-center self-center">
						<p className="text-gray-300">{secondsToTime(item.duration)}</p>
						<button
							ref={anchorRef}
							className="flex gap-0.5 mt-1.5 ms-2 pb-1.5 cursor-pointer hover:scale-115 transition-transform duration-150"
							onClick={() => setOpenMenu((v) => !v)}
						>
							<EllipsisHorizontalIcon className="size-5 text-gray-300" />
						</button>
					</div>
					{openMenu && (
						<SongOptionsMenu
							anchorRect={anchorRef.current?.getBoundingClientRect?.()}
							anchorRef={anchorRef}
							song={item}
							onClose={() => setOpenMenu(false)}
						/>
					)}
				</>
			)}
		</div>
	);
}
