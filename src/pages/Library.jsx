import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";

import { albumService } from "../services/album";
import { playlistService } from "../services/playlist";
import AlbumCard from "../components/card/AlbumCard";
import PillButton from "../components/button/PillButton";

export default function Library() {
	const navigate = useNavigate();
	const { isLogin, user, roles } = useSelector((state) => state.auth);
	const [playlists, setPlaylists] = useState([]);
	const [albums, setAlbums] = useState([]);
	const [loadingAlbums, setLoadingAlbums] = useState(true);
	const [loadingPlaylists, setLoadingPlaylists] = useState(true);

	useEffect(() => {
		const fetchAlbums = async () => {
			try {
				setLoadingAlbums(true);
				const response = await albumService.getAlbumsByArtist(user.id);
				if (response.success) {
					setAlbums(response.data);
				}
			} catch (error) {
				console.error("Error fetching albums:", error);
			} finally {
				setLoadingAlbums(false);
			}
		};

		const fetchPlaylists = async () => {
			try {
				setLoadingPlaylists(true);
				const response = await playlistService.getPlaylists();
				if (response.success) {
					setPlaylists(response.data);
				}
			} catch (error) {
				console.error("Error fetching playlists:", error);
			} finally {
				setLoadingPlaylists(false);
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

	const handleCreateAlbum = async () => {
		const toastId = toast.loading("Creating album...");
		try {
			const createRes = await albumService.createAlbum(
				"My Album",
				new Date(),
				"/images/placeholder.png",
				"FREE"
			);
			if (createRes.success) {
				navigate(`/albums/${createRes.data.id}`);
				toast.success("Album created successfully", { id: toastId });
			}
		} catch (error) {
			toast.error("Failed to create album", { id: toastId });
			console.error("Error creating album:", error);
		}
	};

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
		<div className="px-12 py-6 min-h-[100vh]">
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

					<div className="grid grid-cols-1 mx-8 mb-3 md:grid-cols-2 lg:grid-cols-6">
						{loadingAlbums ? (
							Array.from({ length: 6 }).map((_, i) => (
								<div key={i} className="rounded-md p-2">
									<Skeleton height={160} className="w-full" />
									<Skeleton height={16} className="mt-2" />
									<Skeleton height={12} width="75%" />
								</div>
							))
						) : albums.length > 0 ? (
							albums.map((album) => <AlbumCard key={album.id} album={album} />)
						) : (
							<p className="text-gray-400 mt-2">No albums available.</p>
						)}
					</div>
					{albums.length > 12 && (
						<p
							className="text-gray-500 w-full text-end text-md font-semibold px-12 cursor-pointer hover:underline"
							onClick={() => navigate(`/show-all/albums?source=my-albums`)}
						>
							Show All
						</p>
					)}
				</>
			)}

			<div className="flex justify-between mt-8 mb-3 mx-8">
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

			<div className="grid grid-cols-1 mx-8 mb-3 md:grid-cols-2 lg:grid-cols-6">
				{loadingPlaylists ? (
					Array.from({ length: 6 }).map((_, i) => (
						<div key={i} className="rounded-md p-2">
							<Skeleton height={160} className="w-full" />
							<Skeleton height={16} className="mt-2" />
							<Skeleton height={12} width="75%" />
						</div>
					))
				) : playlists.length > 0 ? (
					playlists.map((playlist) => (
						<AlbumCard key={playlist.id} album={playlist} isPlaylist />
					))
				) : (
					<p className="text-gray-400 mt-2">No playlists available.</p>
				)}
			</div>
			{playlists.length > 12 && (
				<p
					className="text-gray-500 w-full text-end text-md font-semibold px-12 mb-6 cursor-pointer hover:underline"
					onClick={() => navigate(`/show-all/playlists?source=my-playlists`)}
				>
					Show All
				</p>
			)}
		</div>
	);
}
