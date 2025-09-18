import { useState, useEffect } from "react";

import ItemsCarousel from "../components/ItemsCarousel";
import WeeklyItem from "../components/WeeklyItem";
import { albumService } from "../services/album";
import { artistService } from "../services/artist";

export default function Albums() {
	const [featuredAlbums, setFeaturedAlbums] = useState([]);
	const [topAlbums, setTopAlbums] = useState([]);
	const [newAlbums, setNewAlbums] = useState([]);
	const [featuredArtists, setFeaturedArtists] = useState([]);

	useEffect(() => {
		const fetchFeaturedAlbums = async () => {
			try {
				const response = await albumService.getFeaturedAlbums();
				if (response.success) {
					setFeaturedAlbums(response.data);
				}
			} catch (error) {
				console.error("Error fetching featured albums:", error);
			}
		};

		const fetchFeaturedArtists = async () => {
			try {
				const response = await artistService.getFeaturedArtists();
				if (response.success) {
					setFeaturedArtists(response.data);
				}
			} catch (error) {
				console.error("Error fetching featured artists:", error);
			}
		};

		const fetchTopAlbums = async () => {
			try {
				const response = await albumService.getTop15Albums();
				if (response.success) {
					setTopAlbums(response.data);
				}
			} catch (error) {
				console.error("Error fetching top albums:", error);
			}
		};

		fetchFeaturedAlbums();
		fetchFeaturedArtists();
		fetchTopAlbums();
	}, []);

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
				<ItemsCarousel items={featuredAlbums} isAlbum />
			</div>

			<div className="mb-6 mx-8">
				<p className="text-[#3BC8E7] text-md">Top 15 Albums</p>
				<span className="block h-0.5 w-5 rounded-md bg-[#3BC8E7]"></span>
			</div>
			<div className="grid grid-cols-1 mx-8 mb-14 gap-6 lg:grid-cols-3">
				{topAlbums.map((song, index) => (
					<WeeklyItem key={song.id} item={song} index={index} />
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
				<ItemsCarousel items={featuredArtists} isArtist />
			</div>

			<div className="flex justify-between my-6 mx-8">
				<div className="flex flex-col">
					<p className="text-[#3BC8E7] text-md">New Releases</p>
					<span className="block h-0.5 w-5 rounded-md bg-[#3BC8E7]"></span>
				</div>
				<p className="text-white text-md cursor-pointer">View More</p>
			</div>
			<div className="mb-14">
				<ItemsCarousel items={newAlbums} isAlbum />
			</div>
		</>
	);
}
