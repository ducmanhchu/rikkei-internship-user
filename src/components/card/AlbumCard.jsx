import { useNavigate } from "react-router-dom";

export default function AlbumCard({ album }) {
	const navigate = useNavigate();

	return (
		<article
			className="cursor-pointer hover:bg-gray-600/20 transition-colors duration-200 rounded-md p-2"
			onClick={() => navigate(`/albums/${album.albumId || album.id}`)}
		>
			<img
				src={album.albumImage || album.coverImage}
				alt="Album cover image"
				className="w-full aspect-square object-cover rounded-md"
			/>
			<p className="text-white text-md mt-2">{album.title}</p>
			<p
				className={`text-gray-400 text-sm ${album.artistName ? "" : "hidden"}`}
			>
				{album.artistName}
			</p>
		</article>
	);
}
