import { useNavigate } from "react-router-dom";

export default function ArtistCard({ artist }) {
	const navigate = useNavigate();

	return (
		<article
			className="flex flex-col justify-center items-center cursor-pointer hover:bg-gray-600/20 transition-colors duration-200 rounded-md p-2"
			onClick={() => navigate(`/artists/${artist.id}`)}
		>
			<img
				src={
					artist.profileImage ||
					"https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png"
				}
				alt="Artist cover image"
				className="w-48 h-48 rounded-full object-cover"
			/>
			<p className="text-white text-center text-md mt-4">{artist.fullName}</p>
			<p className="text-gray-400 text-center text-sm">Artist</p>
		</article>
	);
}
