import ItemsCarousel from "../components/ItemsCarousel";
import WeeklySong from "../components/WeeklySong";

export default function Albums() {
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
			<div className="flex justify-between my-6 mx-8">
				<div className="flex flex-col">
					<p className="text-[#3BC8E7] text-md">Featured Albums</p>
					<span className="block h-0.5 w-5 rounded-md bg-[#3BC8E7]"></span>
				</div>
				<p className="text-white text-md cursor-pointer">View More</p>
			</div>
			<div className="mb-14">
				<ItemsCarousel items={draftAlbums} />
			</div>

			<div className="flex justify-between my-6 mx-8">
				<div className="flex flex-col">
					<p className="text-[#3BC8E7] text-md">Trending Albums</p>
					<span className="block h-0.5 w-5 rounded-md bg-[#3BC8E7]"></span>
				</div>
				<p className="text-white text-md cursor-pointer">View More</p>
			</div>
			<div className="mb-14">
				<ItemsCarousel items={draftAlbums} />
			</div>

			<div className="mb-6 mx-8">
				<p className="text-[#3BC8E7] text-md">Weekly Top 15</p>
				<span className="block h-0.5 w-5 rounded-md bg-[#3BC8E7]"></span>
			</div>
			<div className="grid grid-cols-1 mx-8 mb-14 gap-6 lg:grid-cols-3">
				{draftSongs.map((song, index) => (
					<WeeklySong key={song.id} song={song} index={index} />
				))}
			</div>

			<div className="flex justify-between my-6 mx-8">
				<div className="flex flex-col">
					<p className="text-[#3BC8E7] text-md">Albums By Artists</p>
					<span className="block h-0.5 w-5 rounded-md bg-[#3BC8E7]"></span>
				</div>
				<p className="text-white text-md cursor-pointer">View More</p>
			</div>
			<div className="mb-14">
				<ItemsCarousel items={draftAlbums} />
			</div>

			<div className="flex justify-between my-6 mx-8">
				<div className="flex flex-col">
					<p className="text-[#3BC8E7] text-md">New Releases</p>
					<span className="block h-0.5 w-5 rounded-md bg-[#3BC8E7]"></span>
				</div>
				<p className="text-white text-md cursor-pointer">View More</p>
			</div>
			<div className="mb-14">
				<ItemsCarousel items={draftSongs} isNewSongs />
			</div>
		</>
	);
}
