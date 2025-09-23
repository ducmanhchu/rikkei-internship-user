import { secondsToTime } from "../../utils";

export default function UserTable({ data, onRemove }) {
	return (
		<div className="mx-8">
			<table className="text-white table-fixed w-full border-collapse">
				<thead className="text-[#2EC8E6] border-b border-b-[#2EC8E6]">
					<tr>
						<th className="text-left py-3 px-2 font-normal">#</th>
						<th className="text-left py-3 px-4 font-normal">Song Title</th>
						<th className="text-left py-3 px-4 font-normal">Album</th>
						<th className="text-left py-3 px-4 font-normal">Duration</th>
						<th className="text-center py-3 px-4 font-normal">Remove</th>
					</tr>
				</thead>
				<tbody>
					{data.map((song, index) => (
						<tr
							key={song.id}
							className="hover:bg-gray-800/30 transition-colors duration-150 border-b border-gray-600/30"
						>
							<td className="py-4 px-2 text-gray-300">
								{index < 9 ? `0${index + 1}` : index + 1}
							</td>
							<td className={`py-4 px-4`}>{song.title}</td>
							<td className={`py-4 px-4`}>{song.albumTitle}</td>
							<td className="py-4 px-4 text-gray-300">
								{secondsToTime(song.duration)}
							</td>
							<td className="py-4 px-4 text-center">
								<button className="cursor-pointer hover:scale-110 transition-transform duration-150 p-1">
									<img
										src="/icons/remove.svg"
										alt="Remove from favourite"
										className="w-5 h-5 opacity-70 hover:opacity-100"
										onClick={() => onRemove(song.id)}
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
