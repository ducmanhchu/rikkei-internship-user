import ItemsCarousel from "../components/ItemsCarousel";
import AlbumCard from "../components/AlbumCard";

export default function Artists() {
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
			<div className="flex justify-between my-6 mx-8">
				<div className="flex flex-col">
					<p className="text-[#3BC8E7] text-md">Featured Artists</p>
					<span className="block h-0.5 w-5 rounded-md bg-[#3BC8E7]"></span>
				</div>
				<p className="text-white text-md cursor-pointer">View More</p>
			</div>
			<div className="mb-14">
				<ItemsCarousel items={draftAlbums} />
			</div>

			<div className="flex justify-between my-6 mx-8">
				<div className="flex flex-col">
					<p className="text-[#3BC8E7] text-md">Featured Artists</p>
					<span className="block h-0.5 w-5 rounded-md bg-[#3BC8E7]"></span>
				</div>
				<p className="text-white text-md cursor-pointer">View More</p>
			</div>
			<div className="mx-8 mb-8 grid md:grid-cols-2 lg:grid-cols-6">
				{draftAlbums.map((item) => (
					<AlbumCard key={item.id} album={item} />
				))}
			</div>
		</>
	);
}
