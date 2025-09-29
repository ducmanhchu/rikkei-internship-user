import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import { songService } from "../services/song";
import PillButton from "../components/button/PillButton";
import UserTable from "../components/table/UserTable";

export default function Downloads() {
	const { isLogin } = useSelector((state) => state.auth);
	const [downloadedSongs, setDownloadedSongs] = useState([]);

	useEffect(() => {
		const fetchDownloadedSongs = async () => {
			try {
				const response = await songService.getDownloadedSongs();
				if (response.success) {
					setDownloadedSongs(response.data.map((item) => item.song));
				}
			} catch (error) {
				console.error("Error fetching downloaded songs:", error);
			}
		};

		fetchDownloadedSongs();
	}, [isLogin]);

	const handleRemoved = async (songID) => {
		const toastId = toast.loading("Removing downloaded song...");
		try {
			const response = await songService.removeDownloadedSong(songID);
			if (response.success) {
				setDownloadedSongs((prevSongs) =>
					prevSongs.filter((song) => song.id !== songID)
				);
				toast.success("Downloaded song removed successfully", { id: toastId });
			}
		} catch (error) {
			console.error("Error removing downloaded song:", error);
			toast.error("Failed to remove downloaded song", { id: toastId });
		}
	};

	if (!isLogin) {
		return (
			<div className="flex justify-center items-center h-[80vh]">
				<p className="text-gray-500 text-lg">
					Please log in to view your downloaded songs.
				</p>
			</div>
		);
	}

	return (
		<div className="px-12 pb-8 min-h-[100vh]">
			<div className="flex flex-col mx-8 my-6">
				<p className="text-[#3BC8E7] text-lg">Free Downloads</p>
				<span className="block h-0.5 w-5 rounded-md bg-[#3BC8E7]"></span>
			</div>
			<div className="px-8 pb-8">
				<UserTable
					data={downloadedSongs}
					onRemove={handleRemoved}
					isDownloaded
				/>
			</div>
			{downloadedSongs.length > 10 && (
				<div className="flex justify-center my-6">
					<PillButton text="View More" />
				</div>
			)}
		</div>
	);
}
