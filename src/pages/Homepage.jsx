import banner from "../assets/banner.png";
import PillButton from "../components/PillButton";
import ItemsCarousel from "../components/ItemsCarousel";
import WeeklySong from "../components/WeeklySong";
import GenreCard from "../components/GenreCard";

export default function Homepage() {
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
	const draftGenres = [
		{ id: 1, name: "Pop", cover_image: "/images/genre1.png" },
		{ id: 2, name: "Rock", cover_image: "/images/genre1.png" },
		{ id: 3, name: "Jazz", cover_image: "/images/genre1.png" },
		{ id: 4, name: "Classical", cover_image: "/images/genre1.png" },
		{ id: 5, name: "Hip Hop", cover_image: "/images/genre1.png" },
		{ id: 6, name: "Country", cover_image: "/images/genre1.png" },
	];

	return (
		<>
			<div className="flex flex-col justify-center lg:flex-row lg:justify-stretch mb-4">
				<img src={banner} alt="Banner" className="w-full h-auto px-4 " />
				<div className="flex flex-col place-items-center lg:place-items-start lg:justify-center">
					<h1 className="text-white text-center text-2xl my-4 lg:text-start lg:text-4xl">
						This Month&apos;s <br />
						<span className="text-[#3BC8E7]">Record Breaking Album!</span>
					</h1>
					<p className="text-[#777777] text-center text-[15px] px-8 leading-7 lg:text-start lg:ps-0">
						Dream your moments, Until I Met You, Gimme Some Courage, Dark Alley,
						One More Of A Stranger, Endless Things, The Heartbeat Stops, Walking
						Promises, Desired Games and many more...
					</p>
					<div className="flex gap-2 my-4">
						<PillButton text="Listen Now" />
						<PillButton text="Add To Queue" />
					</div>
				</div>
			</div>

			<div className="flex justify-between mb-6 mx-8">
				<div className="flex flex-col">
					<p className="text-[#3BC8E7] text-md">Recently Played</p>
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

			<div className="flex justify-between mb-6 mx-8">
				<div className="flex flex-col">
					<p className="text-[#3BC8E7] text-md">Featured Artists</p>
					<span className="block h-0.5 w-5 rounded-md bg-[#3BC8E7]"></span>
				</div>
				<p className="text-white text-md cursor-pointer">View More</p>
			</div>
			<div className="mb-14">
				<ItemsCarousel items={draftAlbums} />
			</div>

			<div className="flex justify-between mb-6 mx-8">
				<div className="flex flex-col">
					<p className="text-[#3BC8E7] text-md">New Releases</p>
					<span className="block h-0.5 w-5 rounded-md bg-[#3BC8E7]"></span>
				</div>
				<p className="text-white text-md cursor-pointer">View More</p>
			</div>
			<div className="mb-14">
				<ItemsCarousel items={draftSongs} isNewSongs />
			</div>

			<div className="flex justify-between mb-6 mx-8">
				<div className="flex flex-col">
					<p className="text-[#3BC8E7] text-md">Featured Albums</p>
					<span className="block h-0.5 w-5 rounded-md bg-[#3BC8E7]"></span>
				</div>
				<p className="text-white text-md cursor-pointer">View More</p>
			</div>
			<div className="mb-14">
				<ItemsCarousel items={draftAlbums} />
			</div>

			<div className="flex justify-between mb-6 mx-8">
				<div className="flex flex-col">
					<p className="text-[#3BC8E7] text-md">Top Genres</p>
					<span className="block h-0.5 w-5 rounded-md bg-[#3BC8E7]"></span>
				</div>
				<p className="text-white text-md cursor-pointer">View More</p>
			</div>
			<div className="grid grid-cols-1 gap-3 mx-8 mb-14 md:grid-cols-2 lg:grid-cols-3">
				{draftGenres.map((item) => (
					<GenreCard
						key={item.id}
						genre={item}
						additionalClass="w-full h-32"
						onClick={(g) => console.log("Clicked genre:", g.name)}
					/>
				))}
			</div>
		</>
	);
}
