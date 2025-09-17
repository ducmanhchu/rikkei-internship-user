import { useDispatch } from "react-redux";
import { setCurrentSong } from "../redux/playerSlice";

export default function SongTable({ songs }) {
	const dispatch = useDispatch();

	const handlePlay = (song) => {
		dispatch(setCurrentSong(song));
	};

	return (
		<table className="text-white w-full">
			<thead className="text-[#2EC8E6] border-b border-b-[#2EC8E6]">
				<tr className="flex w-full">
					<th className="text-center flex-none w-12 py-3 px-2 font-normal">
						#
					</th>
					<th className="text-left flex-grow py-3 px-2 font-normal">Tiêu đề</th>
					<th className="text-center flex-none w-25 py-3 px-2 font-normal">
						Thời lượng
					</th>
				</tr>
			</thead>
			<tbody>
				{songs.map((song, index) => {
					return (
						<tr
							key={song.id}
							className="flex w-full py-2 cursor-pointer rounded-md hover:bg-gray-400/30 transition-colors"
							onClick={() => handlePlay(song)}
						>
							<td className="text-center flex-none w-12 py-2 px-2">
								{index + 1}
							</td>
							<td className="flex-grow py-2 px-2">
								<div className="flex flex-col">
									<span className="font-medium">{song.title}</span>
									<span className="text-gray-400 text-sm">
										{song.artistName}
									</span>
								</div>
							</td>
							<td className="text-center flex-none w-20 py-2 px-2">
								{song.duration}
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}
