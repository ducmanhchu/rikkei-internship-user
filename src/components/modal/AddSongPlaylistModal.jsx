import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
	XMarkIcon,
	MagnifyingGlassIcon,
	PlusIcon,
} from "@heroicons/react/24/outline";
import { toast } from "react-hot-toast";

import { closeModal } from "../../redux/modalSlice";
import { searchService } from "../../services/search";
import { playlistService } from "../../services/playlist";
import { secondsToTime } from "../../utils";

export default function AddSongPlaylistModal({ data }) {
	const dispatch = useDispatch();
	const [searchQuery, setSearchQuery] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [loading, setLoading] = useState(false);
	const [addingSong, setAddingSong] = useState(null);

	useEffect(() => {
		const searchSongs = async () => {
			if (!searchQuery.trim()) {
				setSearchResults([]);
				return;
			}

			setLoading(true);
			try {
				const response = await searchService.searchSong(searchQuery);
				if (response.success) {
					setSearchResults(response.data.content || []);
				}
			} catch (error) {
				console.error("Search error:", error);
				toast.error("Cannot search song");
			} finally {
				setLoading(false);
			}
		};

		const timeoutId = setTimeout(searchSongs, 300);
		return () => clearTimeout(timeoutId);
	}, [searchQuery]);

	const handleAddSong = async (song) => {
		setAddingSong(song.id);
		const toastId = toast.loading("Adding song to playlist...");

		try {
			const response = await playlistService.addSongToPlaylist(
				data.id,
				song.id
			);

			if (response.success) {
				const updatedPlaylist = {
					...data,
					songs: [...data.songs, song],
				};

				if (window.updatePlaylistDetail) {
					window.updatePlaylistDetail(updatedPlaylist);
				}

				toast.success("Song added successfully", {
					id: toastId,
				});
				dispatch(closeModal());
			}
		} catch (error) {
			toast.error(error.message || "Cannot add song to playlist", {
				id: toastId,
			});
		} finally {
			setAddingSong(null);
		}
	};

	return (
		<div className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center p-4">
			<div className="w-[40vw] max-h-[80vh] bg-gradient-to-b from-black to-gray-800 shadow-2xl/30 rounded-md p-8 overflow-hidden">
				<div className="flex justify-between items-center mb-6">
					<h4 className="text-white font-semibold text-2xl">Add new song</h4>
					<button
						className="self-center cursor-pointer hover:scale-110 transition-transform duration-150"
						onClick={() => dispatch(closeModal())}
					>
						<XMarkIcon className="size-6 text-white" />
					</button>
				</div>

				<div className="relative mb-6">
					<div className="flex rounded-full overflow-hidden focus-within:shadow-[0_0_20px_rgba(59,200,231,0.7)] transition-shadow duration-300">
						<button className="bg-[#6C757D] ps-4 py-4 self-center cursor-pointer">
							<MagnifyingGlassIcon className="size-5 text-white" />
						</button>
						<input
							type="text"
							placeholder="Search for a song..."
							className="flex-1 text-[16px] text-white bg-[#6C757D] focus:outline-none px-4 py-3"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
					</div>
				</div>

				<div className="max-h-[50vh] overflow-y-auto">
					{loading ? (
						<div className="text-center text-[#3BC8E7] py-8">Searching...</div>
					) : searchQuery.trim() && searchResults.length === 0 ? (
						<div className="text-center text-gray-400 py-8">No song found</div>
					) : (
						<div className="space-y-2">
							{searchResults.map((song) => (
								<div
									key={song.id}
									className="flex items-center justify-between p-3 hover:bg-gray-700/30 transition-colors duration-200 rounded-md"
								>
									<div className="flex items-center gap-4 flex-1">
										<img
											src={
												song.album.coverImage ||
												"https://placehold.co/60/6C757D/FFF?text=No+Image"
											}
											alt={song.title}
											className="w-14 aspect-square object-cover rounded-md"
										/>
										<div className="flex flex-col">
											<p className="text-white text-base font-medium">
												{song.title}
											</p>
											<p className="text-gray-400 text-sm">
												{song.artist.firstName} {song.artist.lastName}
											</p>
										</div>
									</div>
									<div className="flex items-center gap-4">
										<span className="text-gray-400 text-sm">
											{secondsToTime(song.duration)}
										</span>
										<button
											className="flex items-center gap-2 bg-[#3BC8E7] text-black px-4 py-2 rounded-full font-semibold hover:bg-[#3BC8E7]/80 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
											onClick={() => handleAddSong(song)}
											disabled={addingSong === song.id}
										>
											{addingSong === song.id ? (
												<>
													<div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
													Adding...
												</>
											) : (
												<span className="flex items-center gap-2 cursor-pointer">
													<PlusIcon className="w-4 h-4" />
													Add
												</span>
											)}
										</button>
									</div>
								</div>
							))}
						</div>
					)}
				</div>

				{!searchQuery.trim() && (
					<div className="text-center text-gray-400 py-8">
						Enter the song name to search and add to playlist
					</div>
				)}
			</div>
		</div>
	);
}
