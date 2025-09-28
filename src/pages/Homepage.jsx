import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
	const navigate = useNavigate();
	const { isLogin } = useSelector((state) => state.auth);

	const [recentlyPlayed, setRecentlyPlayed] = useState([]);
	const [weeklySongs, setWeeklySongs] = useState([]);
	const [featuredArtists, setFeaturedArtists] = useState([]);
	const [newReleases, setNewReleases] = useState([]);
	const [featuredAlbums, setFeaturedAlbums] = useState([]);
	const [topGenres, setTopGenres] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const promises = [
					songService.getWeeklySongs(),
					albumService.getFeaturedAlbums(),
					artistService.getFeaturedArtists(),
					songService.getNewSong(),
					genreService.getAllGenres(),
				];

				if (isLogin) {
					promises.unshift(songService.getPlayedHistory());
				}

				const results = await Promise.allSettled(promises);

				let offset = 0;
				if (isLogin) {
					const recentlyPlayedRes = results[0];
					offset = 1;
					if (
						recentlyPlayedRes.status === "fulfilled" &&
						recentlyPlayedRes.value.success
					) {
						const recentlyAlbums = new Map();
						(recentlyPlayedRes.value.data || []).forEach((item) => {
							if (!recentlyAlbums.has(item.albumId)) {
								recentlyAlbums.set(item.albumId, item);
							}
						});
						setRecentlyPlayed(Array.from(recentlyAlbums.values()));
					} else {
						setRecentlyPlayed([]);
					}
				}

				const [
					weeklySongsRes,
					featuredAlbumsRes,
					featuredArtistsRes,
					newReleasesRes,
					genresRes,
				] = results.slice(offset);

				// Weekly Songs
				if (
					weeklySongsRes &&
					weeklySongsRes.status === "fulfilled" &&
					weeklySongsRes.value.success
				) {
					const data = weeklySongsRes.value.data || [];
					setWeeklySongs(data.length > 15 ? data.slice(0, 15) : data);
				} else {
					setWeeklySongs([]);
				}

				// Featured Albums
				if (
					featuredAlbumsRes &&
					featuredAlbumsRes.status === "fulfilled" &&
					featuredAlbumsRes.value.success
				) {
					setFeaturedAlbums(featuredAlbumsRes.value.data || []);
				} else {
					setFeaturedAlbums([]);
				}

				// Featured Artists
				if (
					featuredArtistsRes &&
					featuredArtistsRes.status === "fulfilled" &&
					featuredArtistsRes.value.success
				) {
					setFeaturedArtists(featuredArtistsRes.value.data || []);
				} else {
					setFeaturedArtists([]);
				}

				// New Releases
				if (
					newReleasesRes &&
					newReleasesRes.status === "fulfilled" &&
					newReleasesRes.value.success
				) {
					const data = newReleasesRes.value.data || [];
					setNewReleases([...data].reverse());
				} else {
					setNewReleases([]);
				}

				// Genres
				if (
					genresRes &&
					genresRes.status === "fulfilled" &&
					genresRes.value.success
				) {
					const content =
						genresRes.value.data?.content || genresRes.value.data || [];
					setTopGenres(content.length > 6 ? content.slice(0, 6) : content);
				} else {
					setTopGenres([]);
				}
			} catch (error) {
				console.error("Error fetching genres:", error);
			}
		};

		fetchData();
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
								<p className="text-[#3BC8E7] text-lg">Recently Played</p>
								<span className="block h-0.5 w-5 rounded-md bg-[#3BC8E7]"></span>
							</div>
							{recentlyPlayed.length > 6 && (
								<p
									className="text-white text-md cursor-pointer hover:underline"
									onClick={() =>
										navigate(`/show-all/albums?source=recently-played`)
									}
								>
									View More
								</p>
							)}
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
					<p className="text-[#3BC8E7] text-lg">Weekly Top 15</p>
					<span className="block h-0.5 w-5 rounded-md bg-[#3BC8E7]"></span>
				</div>
				<div className="grid grid-cols-1 mx-8 mb-14 gap-6 lg:grid-cols-3">
					{weeklySongs.map((song, index) => (
						<WeeklyItem key={song.id} item={song} index={index} isSong />
					))}
				</div>

				<div className="flex justify-between mb-6 mx-8">
					<div className="flex flex-col">
						<p className="text-[#3BC8E7] text-lg">Featured Artists</p>
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

				<div className="flex justify-between mb-6 mx-8">
					<div className="flex flex-col">
						<p className="text-[#3BC8E7] text-lg">New Releases</p>
						<span className="block h-0.5 w-5 rounded-md bg-[#3BC8E7]"></span>
					</div>
					{newReleases.length > 4 && (
						<p
							className="text-white text-md cursor-pointer hover:underline"
							onClick={() => navigate(`/show-all/songs?source=new-releases`)}
						>
							View More
						</p>
					)}
				</div>
				<div className="mb-14">
					<ItemsCarousel items={newReleases} isSong />
				</div>

				<div className="flex justify-between mb-6 mx-8">
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

				<div className="flex justify-between mb-6 mx-8">
					<div className="flex flex-col">
						<p className="text-[#3BC8E7] text-lg">Top Genres</p>
						<span className="block h-0.5 w-5 rounded-md bg-[#3BC8E7]"></span>
					</div>
					{topGenres.length > 6 && (
						<p
							className="text-white text-md cursor-pointer hover:underline"
							onClick={() => navigate(`/show-all/genres?source=top`)}
						>
							View More
						</p>
					)}
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
