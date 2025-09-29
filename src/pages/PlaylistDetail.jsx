import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { PencilIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";

import { openModal } from "../redux/modalSlice";
import { playlistService } from "../services/playlist";
import PlaylistCover from "../components/util/PlaylistCover";
import UserTable from "../components/table/UserTable";
import SongTable from "../components/table/SongTable";
import PillButton from "../components/button/PillButton";

export default function PlaylistDetail() {
	const dispatch = useDispatch();
	const { playlistID } = useParams();
	const { user } = useSelector((state) => state.auth);
	const [playlist, setPlaylist] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchPlaylist = async () => {
			try {
				setLoading(true);
				setError(null);
				const response = await playlistService.getPlaylistById(playlistID);

				if (response.success) {
					setPlaylist(response.data);
					window.updatePlaylistDetail = (updatePlaylistDetail) => {
						setPlaylist(updatePlaylistDetail);
					};
				}
			} catch (error) {
				console.error("Error fetching playlist:", error);
				setError("Could not fetch playlist. Please try again.");
			} finally {
				setLoading(false);
			}
		};

		fetchPlaylist();
	}, [user]);

	useEffect(() => {
		return () => {
			window.updatePlaylistDetail = null;
		};
	}, []);

	if (loading) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="text-white text-lg">Loading...</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="text-red-500 text-lg">{error}</div>
			</div>
		);
	}

	const removeSongFromPlaylist = async (songId) => {
		const toastId = toast.loading("Removing song from playlist...");
		try {
			const response = await playlistService.removeSongFromPlaylist(
				playlistID,
				songId
			);
			if (response.success) {
				toast.success("Song removed from playlist successfully", {
					id: toastId,
				});
				setPlaylist((prev) => ({
					...prev,
					songs: prev.songs.filter((song) => song.id !== songId),
				}));
			}
		} catch (error) {
			toast.error(`${error.message}`, { id: toastId });
		}
	};

	return (
		<div>
			<div className="flex gap-6 mb-2 py-8 px-12">
				{playlist?.songs?.length >= 4 ? (
					<div className="shrink-0">
						<PlaylistCover src={playlist.songs} notInCarousel />
					</div>
				) : (
					<img
						src={
							playlist?.songs?.[0]?.album?.coverImage ||
							"/images/placeholder.png"
						}
						alt="Playlist cover"
						className="w-32 h-32 bg-cover shadow-xl/30 rounded-md lg:w-52 lg:h-52 shrink-0"
					/>
				)}
				<div className="flex justify-between w-full">
					<div className="flex flex-col text-white gap-2 justify-end">
						<h5 className="text-sm">
							{playlist?.isPublic ? "Public Playlist" : "Private Playlist"}
						</h5>
						<h1 className="text-2xl font-bold pt-1 md:text-4xl lg:text-6xl">
							{playlist?.name}
						</h1>
						<h4 className="font-medium text-md ">{playlist?.username}</h4>
					</div>
					{user && user.id === playlist.userId && (
						<button
							className="self-end cursor-pointer hover:scale-110 transition-transform duration-150"
							onClick={() =>
								dispatch(
									openModal({
										modalName: "PLAYLIST_INFO_MODAL",
										modalData: playlist,
									})
								)
							}
						>
							<PencilIcon className="size-6 text-white" />
						</button>
					)}
				</div>
			</div>
			{user && user.id === playlist.userId && (
				<div className="px-12 pb-4">
					<PillButton
						text="Add Song"
						Icon={PlusIcon}
						onClick={() =>
							dispatch(
								openModal({
									modalName: "ADD_SONG_PLAYLIST_MODAL",
									modalData: playlist,
								})
							)
						}
					/>
				</div>
			)}
			<div className="px-12 pb-8">
				{user && user.id === playlist.userId ? (
					<UserTable
						data={playlist?.songs || []}
						onRemove={removeSongFromPlaylist}
					/>
				) : (
					<SongTable songs={playlist?.songs || []} />
				)}
			</div>
		</div>
	);
}
