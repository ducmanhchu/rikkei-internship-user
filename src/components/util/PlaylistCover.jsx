export default function PlaylistCover({ src }) {
	const images = src.slice(0, 4);

	return (
		<div className="grid grid-cols-2 grid-rows-2 aspect-square rounded-md overflow-hidden">
			{images.map((item) => (
				<img
					key={item.id}
					src={item.albumImage}
					alt={`Playlist cover part ${item}`}
					className="object-cover size-full"
				/>
			))}
		</div>
	);
}
