export default function AlbumCard({ album }) {
	return (
		<article className="cursor-pointer hover:bg-gray-600/20 transition-colors duration-200 rounded-md p-2">
			<img
				src={album.cover_image}
				alt="Album cover image"
				className="w-full rounded-md"
			/>
			<p className="text-white text-md mt-2">{album.title}</p>
			<p className={`text-[#DEDEDE] text-sm ${album.artist ? "" : "hidden"}`}>
				{album.artist}
			</p>
		</article>
	);
}
