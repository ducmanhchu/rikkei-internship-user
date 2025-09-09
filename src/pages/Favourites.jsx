import ItemsCarousel from "../components/ItemsCarousel";
import PillButton from "../components/PillButton";
import Table from "../components/Table";

export default function Favourites() {
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
	const draftSongs = [
		{
			id: 1,
			title: "Song One",
			artist: "Artist A",
			duration: "3:45",
			cover_image: "/images/album1.png",
		},
		{
			id: 2,
			title: "Song Two",
			artist: "Artist B",
			duration: "3:45",
			cover_image: "/images/album1.png",
		},
		{
			id: 3,
			title: "Song Three",
			artist: "Artist C",
			duration: "3:45",
			cover_image: "/images/album1.png",
		},
		{
			id: 4,
			title: "Song Four",
			artist: "Artist D",
			duration: "3:45",
			cover_image: "/images/album1.png",
		},
		{
			id: 5,
			title: "Song Five",
			artist: "Artist E",
			duration: "3:45",
			cover_image: "/images/album1.png",
		},
		{
			id: 6,
			title: "Song Six",
			artist: "Artist F",
			duration: "3:45",
			cover_image: "/images/album1.png",
		},
	];

	return (
		<>
			<div className="flex flex-col mx-8 my-6">
				<p className="text-[#3BC8E7] text-md">Free Downloads</p>
				<span className="block h-0.5 w-5 rounded-md bg-[#3BC8E7]"></span>
			</div>
			<Table data={draftSongs} isFavourite />
			<div className="flex justify-center my-6">
				<PillButton text="View More" />
			</div>

			<div className="flex flex-col mx-8 my-6">
				<p className="text-[#3BC8E7] text-md">Recently Played</p>
				<span className="block h-0.5 w-5 rounded-md bg-[#3BC8E7]"></span>
			</div>
			<div className="mb-14">
				<ItemsCarousel items={draftAlbums} />
			</div>
		</>
	);
}
