import { useNavigate } from "react-router-dom";

import PlaylistCover from "../util/PlaylistCover";

export default function AlbumCard({ album, isPlaylist }) {
	const navigate = useNavigate();

	return (
		<article
			className="cursor-pointer hover:bg-gray-600/20 transition-colors duration-200 rounded-md p-2"
			onClick={() => {
				if (isPlaylist) {
					navigate(`/playlists/${album.id}`);
				} else {
					navigate(`/albums/${album?.album?.id || album.id}`);
				}
			}}
		>
			{isPlaylist ? (
				album?.songs?.length >= 4 ? (
					<PlaylistCover src={album.songs} />
				) : (
					<img
						src={
							album?.songs[0]?.album?.coverImage || "/images/placeholder.png"
						}
						alt="Album cover image"
						className="w-full aspect-square object-cover rounded-md"
					/>
				)
			) : (
				<img
					src={
						album?.album?.coverImage ||
						album?.coverImage ||
						"/images/placeholder.png"
					}
					alt="Album cover image"
					className="w-full aspect-square object-cover rounded-md"
				/>
			)}
			<p className="text-white text-md mt-2">
				{isPlaylist ? album.name : album?.album?.title || album?.title}
			</p>
			<p className="text-gray-400 text-sm">
				{isPlaylist
					? album.username
					: album.artist
					? album?.artist?.firstName + " " + album?.artist?.lastName
					: album?.artistName}
			</p>
		</article>
	);
}
