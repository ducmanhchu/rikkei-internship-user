import { useDispatch } from "react-redux";

import { secondsToTime } from "../../utils";
import { setCurrentSong } from "../../redux/playerSlice";
import { useNavigate } from "react-router-dom";

export default function WeeklyItem({ item, index, isSong }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	return (
		<div
			className="flex items-start rounded-t-md p-4 border-b border-b-gray-500 cursor-pointer hover:bg-gray-600/20 transition-colors duration-200"
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
				src={isSong ? item.albumImage : item.coverImage}
				alt="Songs Cover"
				className="w-14 rounded-md mx-4"
			/>
			<div className="flex flex-col gap-2 grow ms-4">
				<p className="text-white text-md">{item.title}</p>
				<p className="text-[#DEDEDE] text-sm">{item.artistName}</p>
			</div>
			{isSong && (
				<div className="flex gap-2">
					<p className="text-white">{secondsToTime(item.duration)}</p>
					<button className="flex gap-0.5 mt-1.5 ms-3 cursor-pointer">
						<span className="h-0.75 w-0.75 rounded-full bg-white"></span>
						<span className="h-0.75 w-0.75 rounded-full bg-white"></span>
						<span className="h-0.75 w-0.75 rounded-full bg-white"></span>
					</button>
				</div>
			)}
		</div>
	);
}
