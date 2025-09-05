export default function NewSongCard({ song }) {
	return (
		<article className="flex p-2 pe-6 rounded-md cursor-pointer hover:bg-gray-500/30 transition-bg duration-150">
			<img
				className="w-14 rounded-md me-2"
				src={song.cover_image}
				alt={song.title}
			/>
			<div className="flex flex-col gap-2 grow">
				<p className="text-md text-white">{song.title}</p>
				<p className="text-sm text-[#DEDEDE]">{song.artist}</p>
			</div>
			<p className="text-white">{song.duration}</p>
		</article>
	);
}
