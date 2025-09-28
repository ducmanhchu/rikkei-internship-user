export default function PlaylistCover({ src, notInCarousel }) {
	const images = src.slice(0, 4);

	return (
		<div
			className={`grid grid-cols-2 grid-rows-2 aspect-square shadow-xl/30 rounded-md overflow-hidden ${
				notInCarousel ? "w-32 h-32 lg:w-52 lg:h-52" : ""
			}`}
		>
			{images.map((item) => (
				<img
					key={item.id}
					src={item.album?.coverImage}
					alt={`Playlist cover part ${item}`}
					className="object-cover w-full"
				/>
			))}
		</div>
	);
}
