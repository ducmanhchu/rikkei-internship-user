import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

import { albumService } from "../services/album";
import { playlistService } from "../services/playlist";
import AlbumCard from "../components/card/AlbumCard";
import PillButton from "../components/button/PillButton";

export default function Library() {
	const { isLogin, user, roles } = useSelector((state) => state.auth);
	const [playlists, setPlaylists] = useState([]);
	const [albums, setAlbums] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchAlbums = async () => {
			try {
				const response = await albumService.getAlbumsByArtist(user.id);
				if (response.success) {
					setAlbums(response.data);
				}
			} catch (error) {
				console.error("Error fetching albums:", error);
			}
		};

		const fetchPlaylists = async () => {
			try {
				const response = await playlistService.getPlaylists();
				if (response.success) {
					setPlaylists(response.data);
				}
			} catch (error) {
				console.error("Error fetching playlists:", error);
			}
		};

		if (roles === "ROLE_ARTIST") {
			fetchAlbums();
		}
		fetchPlaylists();
	}, [user]);

	const handleCreatePlaylist = async () => {
		const toastId = toast.loading("Creating playlist...");
		try {
			const createRes = await playlistService.createPlaylist(
				"My Playlist",
				false
			);

			if (createRes.success) {
				navigate(`/playlists/${createRes.data.id}`);
				toast.success("Playlist created successfully", { id: toastId });
			}
		} catch (error) {
			toast.error("Failed to create playlist", { id: toastId });
			console.error("Error creating playlist:", error);
		}
	};

	const handleCreateAlbum = () => {};

	if (!isLogin) {
		return (
			<div className="flex justify-center items-center h-[80vh]">
				<p className="text-gray-500 text-lg">
					Please log in to view your library.
				</p>
			</div>
		);
	}
	return (
		<div className="px-12 py-8">
			{roles === "ROLE_ARTIST" && (
				<>
					<div className="flex justify-between mb-6 mx-8">
						<div className="flex flex-col">
							<p className="text-[#3BC8E7] text-lg">My Albums</p>
							<span className="block h-0.5 w-5 rounded-md bg-[#3BC8E7]"></span>
						</div>
						<PillButton
							text="Create Album"
							Icon={PlusIcon}
							onClick={handleCreateAlbum}
						/>
					</div>

					<div className="grid grid-cols-1 mx-8 mb-14 md:grid-cols-2 lg:grid-cols-6">
						{albums.map((album) => (
							<AlbumCard key={album.id} album={album} />
						))}
					</div>
				</>
			)}

			<div className="flex justify-between mb-6 mx-8">
				<div className="flex flex-col">
					<p className="text-[#3BC8E7] text-lg">My Playlists</p>
					<span className="block h-0.5 w-5 rounded-md bg-[#3BC8E7]"></span>
				</div>
				<PillButton
					text="Create Playlist"
					Icon={PlusIcon}
					onClick={handleCreatePlaylist}
				/>
			</div>

			<div className="grid grid-cols-1 mx-8 mb-14 md:grid-cols-2 lg:grid-cols-6">
				{playlists.map((playlist) => (
					<AlbumCard key={playlist.id} album={playlist} isPlaylist />
				))}
			</div>
		</div>
	);
}
