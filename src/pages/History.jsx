import PillButton from "../components/PillButton";
import AlbumCard from "../components/AlbumCard";

export default function History() {
	const draftAlbums = [
		{
			id: 1,
			title: "Album One",
			artist: "Artist A",
			cover_image: "/images/album1.png",
		},
		{
			id: 2,
			title: "Album Two",
			artist: "Artist A",
			cover_image: "/images/album1.png",
		},
		{
			id: 3,
			title: "Album Three",
			artist: "Artist A",
			cover_image: "/images/album1.png",
		},
		{
			id: 4,
			title: "Album Four",
			artist: "Artist A",
			cover_image: "/images/album1.png",
		},
		{
			id: 5,
			title: "Album Five",
			artist: "Artist A",
			cover_image: "/images/album1.png",
		},
		{
			id: 6,
			title: "Album Six",
			artist: "Artist A",
			cover_image: "/images/album1.png",
		},
		{
			id: 7,
			title: "Album Seven",
			artist: "Artist A",
			cover_image: "/images/album1.png",
		},
		{
			id: 8,
			title: "Album Eight",
			artist: "Artist A",
			cover_image: "/images/album1.png",
		},
		{
			id: 9,
			title: "Album Nine",
			artist: "Artist A",
			cover_image: "/images/album1.png",
		},
	];

	return (
		<>
			<div className="flex justify-between mx-8 mt-8">
				<div className="flex flex-col">
					<p className="text-[#3BC8E7] text-md">History</p>
					<span className="block h-0.5 w-5 rounded-md bg-[#3BC8E7]"></span>
				</div>
				<PillButton text={"Clear"} />
			</div>

			<div className="grid mx-8 mb-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-6">
				{draftAlbums.map((album) => (
					<AlbumCard key={album.id} album={album} />
				))}
			</div>
		</>
	);
}
