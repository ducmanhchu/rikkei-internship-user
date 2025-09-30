import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import WeeklyItem from "../components/item/WeeklyItem";
import ItemsCarousel from "../components/util/ItemsCarousel";
import { songService } from "../services/song";
import Skeleton from "react-loading-skeleton";

export default function TopTracks() {
	const navigate = useNavigate();
	const [weeklySongs, setWeeklySongs] = useState([]);
	const [topAllTimeSongs, setTopAllTimeSongs] = useState([]);
	const [newSongs, setNewSongs] = useState([]);

	const [loadingWeekly, setLoadingWeekly] = useState(true);
	const [loadingAllTime, setLoadingAllTime] = useState(true);
	const [loadingNew, setLoadingNew] = useState(true);

	useEffect(() => {
		const fetchAll = async () => {
			try {
				setLoadingWeekly(true);
				setLoadingAllTime(true);
				setLoadingNew(true);

				const results = await Promise.allSettled([
					songService.getWeeklySongs(),
					songService.getTopAllTimeSongs(),
					songService.getNewSong(),
				]);

				const [weeklyRes, allTimeRes, newRes] = results;

				if (weeklyRes?.status === "fulfilled" && weeklyRes.value?.success) {
					setWeeklySongs(weeklyRes.value.data || []);
				} else {
					setWeeklySongs([]);
				}
				setLoadingWeekly(false);

				if (allTimeRes?.status === "fulfilled" && allTimeRes.value?.success) {
					setTopAllTimeSongs(allTimeRes.value.data || []);
				} else {
					setTopAllTimeSongs([]);
				}
				setLoadingAllTime(false);

				if (newRes?.status === "fulfilled" && newRes.value?.success) {
					const data = newRes.value.data || [];
					setNewSongs([...data].reverse());
				} else {
					setNewSongs([]);
				}
				setLoadingNew(false);
			} catch (error) {
				console.error("Error fetching top tracks:", error);
				setLoadingWeekly(false);
				setLoadingAllTime(false);
				setLoadingNew(false);
			}
		};

		fetchAll();
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
				{loadingWeekly
					? Array.from({ length: 15 }).map((_, i) => (
							<div key={i} className="p-2 pe-10 rounded-md">
								<div className="flex items-center gap-3">
									<Skeleton height={52} width={52} className="rounded-md" />
									<div className="flex-1">
										<Skeleton height={16} className="mb-2" />
										<Skeleton height={12} width="60%" />
									</div>
									<Skeleton height={12} width={32} />
								</div>
							</div>
					  ))
					: weeklySongs.map((song, index) => (
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
				{loadingAllTime ? (
					<div className="flex mx-8 gap-4">
						{Array.from({ length: 4 }).map((_, i) => (
							<div key={i} className="flex-shrink-0 w-1/4">
								<div className="p-2">
									<div className="flex items-center gap-3">
										<Skeleton height={52} width={52} className="rounded-md" />
										<div className="flex-1">
											<Skeleton height={16} className="mb-2" />
											<Skeleton height={12} width="60%" />
										</div>
										<Skeleton height={12} width={32} />
									</div>
								</div>
							</div>
						))}
					</div>
				) : (
					<ItemsCarousel items={topAllTimeSongs} isSong />
				)}
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
				{loadingNew ? (
					<div className="flex mx-8 gap-4">
						{Array.from({ length: 4 }).map((_, i) => (
							<div key={i} className="flex-shrink-0 w-1/4">
								<div className="p-2">
									<div className="flex items-center gap-3">
										<Skeleton height={52} width={52} className="rounded-md" />
										<div className="flex-1">
											<Skeleton height={16} className="mb-2" />
											<Skeleton height={12} width="60%" />
										</div>
										<Skeleton height={12} width={32} />
									</div>
								</div>
							</div>
						))}
					</div>
				) : (
					<ItemsCarousel items={newSongs} isSong />
				)}
			</div>
		</div>
	);
}
