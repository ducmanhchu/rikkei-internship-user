import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { songService } from "../services/song";
import { albumService } from "../services/album";
import { artistService } from "../services/artist";
import { genreService } from "../services/genre";
import banner from "../assets/banner.png";
import PillButton from "../components/button/PillButton";
import ItemsCarousel from "../components/util/ItemsCarousel";
import WeeklyItem from "../components/item/WeeklyItem";
import GenreCard from "../components/card/GenreCard";

export default function Homepage() {
	const { isLogin } = useSelector((state) => state.auth);

	const [recentlyPlayed, setRecentlyPlayed] = useState([]);
	const [weeklySongs, setWeeklySongs] = useState([]);
	const [featuredArtists, setFeaturedArtists] = useState([]);
	const [newReleases, setNewReleases] = useState([]);
	const [featuredAlbums, setFeaturedAlbums] = useState([]);
	const [topGenres, setTopGenres] = useState([]);

	useEffect(() => {
		const fetchRecentlyPlayed = async () => {
			try {
				const response = await songService.getPlayedHistory();
				if (response.success) {
					const recentlyAlbums = new Map();
					response.data.forEach((item) => {
						if (!recentlyAlbums.has(item.albumId)) {
							recentlyAlbums.set(item.albumId, item);
						}
					});
					setRecentlyPlayed(Array.from(recentlyAlbums.values()));
				}
			} catch (error) {
				console.error("Error fetching recently played:", error);
			}
		};

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

		const fetchWeeklySongs = async () => {
			try {
				const response = await songService.getWeeklySongs();
				if (response.success) {
					if (response.data.length > 15) {
						setWeeklySongs(response.data.slice(0, 15));
					} else {
						setWeeklySongs(response.data);
					}
				}
			} catch (error) {
				console.error("Error fetching weekly songs:", error);
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

		const fetchNewReleases = async () => {
			try {
				const response = await songService.getNewSong();
				if (response.success) {
					setNewReleases(response.data.reverse());
				}
			} catch (error) {
				console.error("Error fetching new releases:", error);
			}
		};

		const fetchGenres = async () => {
			try {
				const response = await genreService.getAllGenres();
				if (response.success) {
					if (response.data.content.length > 6) {
						setTopGenres(response.data.content.slice(0, 6));
					} else {
						setTopGenres(response.data.content);
					}
				}
			} catch (error) {
				console.error("Error fetching genres:", error);
			}
		};

		if (isLogin) {
			fetchRecentlyPlayed();
		}

		fetchWeeklySongs();
		fetchFeaturedAlbums();
		fetchFeaturedArtists();
		fetchNewReleases();
		fetchGenres();
	}, [isLogin]);

	return (
		<div>
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
			<div className="px-12">
				{isLogin && (
					<>
						<div className="flex justify-between mb-6 mx-8">
							<div className="flex flex-col">
								<p className="text-[#3BC8E7] text-md">Recently Played</p>
								<span className="block h-0.5 w-5 rounded-md bg-[#3BC8E7]"></span>
							</div>
							<p className="text-white text-md cursor-pointer">View More</p>
						</div>
						<div className="mb-14">
							{recentlyPlayed.length === 0 ? (
								<p className="text-gray-500 text-md ms-8">
									No recently played items available.
								</p>
							) : (
								<ItemsCarousel items={recentlyPlayed} isAlbum />
							)}
						</div>
					</>
				)}

				<div className="mb-6 mx-8">
					<p className="text-[#3BC8E7] text-md">Weekly Top 15</p>
					<span className="block h-0.5 w-5 rounded-md bg-[#3BC8E7]"></span>
				</div>
				<div className="grid grid-cols-1 mx-8 mb-14 gap-6 lg:grid-cols-3">
					{weeklySongs.map((song, index) => (
						<WeeklyItem key={song.id} item={song} index={index} isSong />
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
					<ItemsCarousel items={featuredArtists} isArtist />
				</div>

				<div className="flex justify-between mb-6 mx-8">
					<div className="flex flex-col">
						<p className="text-[#3BC8E7] text-md">New Releases</p>
						<span className="block h-0.5 w-5 rounded-md bg-[#3BC8E7]"></span>
					</div>
					<p className="text-white text-md cursor-pointer">View More</p>
				</div>
				<div className="mb-14">
					<ItemsCarousel items={newReleases} isSong />
				</div>

				<div className="flex justify-between mb-6 mx-8">
					<div className="flex flex-col">
						<p className="text-[#3BC8E7] text-md">Featured Albums</p>
						<span className="block h-0.5 w-5 rounded-md bg-[#3BC8E7]"></span>
					</div>
					<p className="text-white text-md cursor-pointer">View More</p>
				</div>
				<div className="mb-14">
					<ItemsCarousel items={featuredAlbums} isAlbum />
				</div>

				<div className="flex justify-between mb-6 mx-8">
					<div className="flex flex-col">
						<p className="text-[#3BC8E7] text-md">Top Genres</p>
						<span className="block h-0.5 w-5 rounded-md bg-[#3BC8E7]"></span>
					</div>
					<p className="text-white text-md cursor-pointer">View More</p>
				</div>
				<div className="grid grid-cols-1 gap-3 mx-8 mb-14 md:grid-cols-2 lg:grid-cols-3">
					{topGenres.map((item) => (
						<GenreCard
							key={item.id}
							genre={item}
							additionalClass="w-full h-32"
						/>
					))}
				</div>
			</div>
		</div>
	);
}
