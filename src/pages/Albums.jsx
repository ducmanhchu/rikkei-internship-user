import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { albumService } from "../services/album";
import { artistService } from "../services/artist";
import ItemsCarousel from "../components/util/ItemsCarousel";
import WeeklyItem from "../components/item/WeeklyItem";

export default function Albums() {
	const navigate = useNavigate();
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

		const fetchNewAlbums = async () => {
			try {
				const response = await albumService.getNewAlbums();
				if (response.success) {
					setNewAlbums(response.data);
				}
			} catch (error) {
				console.error("Error fetching new albums:", error);
			}
		};

		fetchFeaturedAlbums();
		fetchFeaturedArtists();
		fetchTopAlbums();
		fetchNewAlbums();
	}, []);

	return (
		<div className="px-12">
			<div className="flex justify-between my-6 mx-8">
				<div className="flex flex-col">
					<p className="text-[#3BC8E7] text-lg">Featured Albums</p>
					<span className="block h-0.5 w-5 rounded-md bg-[#3BC8E7]"></span>
				</div>
				{featuredAlbums.length > 6 && (
					<p
						className="text-white text-md cursor-pointer hover:underline"
						onClick={() => navigate(`/show-all/albums?source=featured`)}
					>
						View More
					</p>
				)}
			</div>
			<div className="mb-14">
				<ItemsCarousel items={featuredAlbums} isAlbum />
			</div>

			<div className="mb-6 mx-8">
				<p className="text-[#3BC8E7] text-lg">Top 15 Albums</p>
				<span className="block h-0.5 w-5 rounded-md bg-[#3BC8E7]"></span>
			</div>
			<div className="grid grid-cols-1 mx-8 mb-14 gap-6 lg:grid-cols-3">
				{topAlbums.map((song, index) => (
					<WeeklyItem key={song.id} item={song} index={index} />
				))}
			</div>

			<div className="flex justify-between my-6 mx-8">
				<div className="flex flex-col">
					<p className="text-[#3BC8E7] text-lg">Albums By Artists</p>
					<span className="block h-0.5 w-5 rounded-md bg-[#3BC8E7]"></span>
				</div>
				{featuredArtists.length > 6 && (
					<p
						className="text-white text-md cursor-pointer hover:underline"
						onClick={() => navigate(`/show-all/artists?source=featured`)}
					>
						View More
					</p>
				)}
			</div>
			<div className="mb-14">
				<ItemsCarousel items={featuredArtists} isArtist />
			</div>

			<div className="flex justify-between my-6 mx-8">
				<div className="flex flex-col">
					<p className="text-[#3BC8E7] text-lg">New Releases</p>
					<span className="block h-0.5 w-5 rounded-md bg-[#3BC8E7]"></span>
				</div>
				{newAlbums.length > 6 && (
					<p
						className="text-white text-md cursor-pointer hover:underline"
						onClick={() => navigate(`/show-all/albums?source=new-releases`)}
					>
						View More
					</p>
				)}
			</div>
			<div className="mb-14">
				<ItemsCarousel items={newAlbums} isAlbum />
			</div>
		</div>
	);
}
