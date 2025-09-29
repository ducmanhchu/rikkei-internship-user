import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { PencilIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import useColorThief from "use-color-thief";

import { openModal } from "../redux/modalSlice";
import { songService } from "../services/song";
import { albumService } from "../services/album";
import UserTable from "../components/table/UserTable";
import SongTable from "../components/table/SongTable";
import PillButton from "../components/button/PillButton";

export default function AlbumDetail() {
	const dispatch = useDispatch();
	const { user, roles } = useSelector((state) => state.auth);
	const { albumID } = useParams();
	const [songs, setSongs] = useState([]);
	const [album, setAlbum] = useState(null);
	const imageRef = useRef();
	const { color } = useColorThief(imageRef, {
		format: "hex",
	});

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [songsRes, albumRes] = await Promise.all([
					songService.getSongFromAlbum(albumID),
					albumService.getAlbumById(albumID),
				]);
				if (songsRes && songsRes.success) {
					setSongs(songsRes.data);
				}
				if (albumRes && albumRes.success) {
					setAlbum(albumRes.data);

					window.updateAlbumDetail = (updatedAlbum) => {
						setAlbum(updatedAlbum.album);
						setSongs(updatedAlbum.songs);
					};
				}
			} catch (error) {
				console.error("Error fetching songs:", error);
			}
		};
		fetchData();
	}, [albumID]);

	useEffect(() => {
		return () => {
			window.updateAlbumDetail = null;
		};
	}, []);

	const removeSongFromAlbum = async (songId) => {
		const toastId = toast.loading("Removing song from album...");
		try {
			const response = await songService.removeSongFromAlbum(albumID, songId);
			if (response.success) {
				toast.success("Song removed from album successfully", { id: toastId });
				setSongs((prevSongs) => prevSongs.filter((song) => song.id !== songId));
			}
		} catch (error) {
			toast.error("Failed to remove song from album", { id: toastId });
			console.error("Error removing song from album:", error);
		}
	};

	return (
		<div>
			<div
				className="flex gap-6 mb-2 py-8 px-12"
				style={{
					background: color
						? `linear-gradient(180deg, ${color} 0%, transparent 100%)`
						: undefined,
				}}
			>
				<div className="flex justify-between w-full gap-5">
					<img
						ref={imageRef}
						className="w-32 h-32 object-cover shadow-xl/30 rounded-md lg:w-52 lg:h-52"
						src={album?.coverImage || "/images/placeholder.png"}
						crossOrigin="anonymous"
						alt="Album cover"
					/>
					<div className="flex flex-1 flex-col text-white gap-2 justify-end">
						<h5 className="text-sm">Album</h5>
						<h1 className="text-2xl font-bold pt-1 md:text-4xl lg:text-6xl">
							{album?.title}
						</h1>
						<h4 className="font-medium text-md ">{album?.artistName}</h4>
					</div>
					{user?.id === album?.artistId && roles === "ROLE_ARTIST" && (
						<button
							className="self-end cursor-pointer hover:scale-110 transition-transform duration-150"
							onClick={() =>
								dispatch(
									openModal({
										modalName: "ALBUM_INFO_MODAL",
										modalData: { songs, album },
									})
								)
							}
						>
							<PencilIcon className="size-6 text-white" />
						</button>
					)}
				</div>
			</div>
			<div className="px-12 pb-8">
				{user?.id === album?.artistId && roles === "ROLE_ARTIST" && (
					<div className="mb-4">
						<PillButton
							text="Add Song"
							Icon={PlusIcon}
							onClick={() =>
								dispatch(
									openModal({
										modalName: "ADD_SONG_ALBUM_MODAL",
										modalData: { songs, album },
									})
								)
							}
						/>
					</div>
				)}
				{user?.id === album?.artistId && roles === "ROLE_ARTIST" ? (
					<UserTable data={songs} onRemove={removeSongFromAlbum} />
				) : (
					<SongTable songs={songs} />
				)}
			</div>
		</div>
	);
}
