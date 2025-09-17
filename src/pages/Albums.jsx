import { useState, useEffect } from "react";

import ItemsCarousel from "../components/ItemsCarousel";
import WeeklySong from "../components/WeeklySong";
import { albumService } from "../services/album";

export default function Albums() {
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
	const [albums, setAlbums] = useState([]);

	useEffect(() => {
		const fetchALbums = async () => {
			try {
				const response = await albumService.getAllAlbums();
				if (response.success) {
					setAlbums(response.data.content);
				}
			} catch (error) {
				console.error("Error fetching albums:", error);
			}
		};
		fetchALbums();
	}, []);
	console.log("Fetched albums:", albums);

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
				<ItemsCarousel items={albums} />
			</div>

			<div className="flex justify-between my-6 mx-8">
				<div className="flex flex-col">
					<p className="text-[#3BC8E7] text-md">Trending Albums</p>
					<span className="block h-0.5 w-5 rounded-md bg-[#3BC8E7]"></span>
				</div>
				<p className="text-white text-md cursor-pointer">View More</p>
			</div>
			<div className="mb-14">
				<ItemsCarousel items={albums} />
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
				<ItemsCarousel items={albums} />
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
