import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import WeeklyItem from "../components/item/WeeklyItem";
import ItemsCarousel from "../components/util/ItemsCarousel";
import { songService } from "../services/song";

export default function TopTracks() {
	const navigate = useNavigate();
	const [topSongs, setTopSongs] = useState([]);
	const [topAllTimeSongs, setTopAllTimeSongs] = useState([]);
	const [newSongs, setNewSongs] = useState([]);

	useEffect(() => {
		const fetchTopSongs = async () => {
			try {
				const response = await songService.getWeeklySongs();
				if (response.success) {
					setTopSongs(response.data);
				}
			} catch (error) {
				console.error("Error fetching weekly songs:", error);
			}
		};

		const fetchTopAllTimeSongs = async () => {
			try {
				const response = await songService.getTopAllTimeSongs();
				if (response.success) {
					setTopAllTimeSongs(response.data);
				}
			} catch (error) {
				console.error("Error fetching top all time songs:", error);
			}
		};

		const fetchNewSongs = async () => {
			try {
				const response = await songService.getNewSong();
				if (response.success) {
					setNewSongs(response.data.reverse());
				}
			} catch (error) {
				console.error("Error fetching new releases:", error);
			}
		};

		fetchTopSongs();
		fetchTopAllTimeSongs();
		fetchNewSongs();
	}, []);

	return (
		<div className="px-12">
			<div className="flex justify-between my-6 mx-8">
				<div className="flex flex-col">
					<p className="text-[#3BC8E7] text-lg">Weekly Top 15</p>
					<span className="block h-0.5 w-5 rounded-md bg-[#3BC8E7]"></span>
				</div>
			</div>
			<div className="grid grid-cols-1 mx-8 mb-14 gap-3 lg:grid-cols-3">
				{topSongs.map((song, index) => (
					<WeeklyItem key={song.id} item={song} index={index} isSong />
				))}
			</div>

			<div className="flex justify-between my-6 mx-8">
				<div className="flex flex-col">
					<p className="text-[#3BC8E7] text-lg">Top Tracks Of All Time</p>
					<span className="block h-0.5 w-5 rounded-md bg-[#3BC8E7]"></span>
				</div>
				{topAllTimeSongs.length > 4 && (
					<p
						className="text-white text-md cursor-pointer hover:underline"
						onClick={() => navigate(`/show-all/songs?source=top-all-time`)}
					>
						View More
					</p>
				)}
			</div>
			<div className="mb-14">
				<ItemsCarousel items={topAllTimeSongs} isSong />
			</div>

			<div className="flex justify-between my-6 mx-8">
				<div className="flex flex-col">
					<p className="text-[#3BC8E7] text-lg">New Releases</p>
					<span className="block h-0.5 w-5 rounded-md bg-[#3BC8E7]"></span>
				</div>
				{newSongs.length > 4 && (
					<p
						className="text-white text-md cursor-pointer hover:underline"
						onClick={() => navigate(`/show-all/songs?source=new-releases`)}
					>
						View More
					</p>
				)}
			</div>
			<div className="mb-14">
				<ItemsCarousel items={newSongs} isSong />
			</div>
		</div>
	);
}
