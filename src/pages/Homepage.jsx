import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { songService } from "../services/song";
import { albumService } from "../services/album";
import { artistService } from "../services/artist";
import { genreService } from "../services/genre";
import { setCurrentSong, setPlaylist } from "../redux/playerSlice";
import banner from "../assets/banner.png";
import PillButton from "../components/button/PillButton";
import ItemsCarousel from "../components/util/ItemsCarousel";
import WeeklyItem from "../components/item/WeeklyItem";
import GenreCard from "../components/card/GenreCard";
import Skeleton from "react-loading-skeleton";

export default function Homepage() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { isLogin } = useSelector((state) => state.auth);

	const [recentlyPlayed, setRecentlyPlayed] = useState([]);
	const [weeklySongs, setWeeklySongs] = useState([]);
	const [featuredArtists, setFeaturedArtists] = useState([]);
	const [newReleases, setNewReleases] = useState([]);
	const [featuredAlbums, setFeaturedAlbums] = useState([]);
	const [topGenres, setTopGenres] = useState([]);
	const [breakingSongs, setBreakingSongs] = useState([]);

	const [loadingRecently, setLoadingRecently] = useState(false);
	const [loadingWeekly, setLoadingWeekly] = useState(true);
	const [loadingArtists, setLoadingArtists] = useState(true);
	const [loadingNew, setLoadingNew] = useState(true);
	const [loadingAlbums, setLoadingAlbums] = useState(true);
	const [loadingGenres, setLoadingGenres] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoadingWeekly(true);
				setLoadingArtists(true);
				setLoadingNew(true);
				setLoadingAlbums(true);
				setLoadingGenres(true);
				if (isLogin) setLoadingRecently(true);

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
							if (!recentlyAlbums.has(item.album.id)) {
								recentlyAlbums.set(item.album.id, item);
							}
						});
						setRecentlyPlayed(Array.from(recentlyAlbums.values()));
					} else {
						setRecentlyPlayed([]);
					}
					setLoadingRecently(false);
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
					setBreakingSongs(data.slice(0, 15).map((song) => song.title));
				} else {
					setWeeklySongs([]);
					setBreakingSongs([]);
				}
				setLoadingWeekly(false);

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
				setLoadingAlbums(false);

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
				setLoadingArtists(false);

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
				setLoadingNew(false);

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
				setLoadingGenres(false);
			} catch (error) {
				console.error("Error fetching genres:", error);

				setLoadingWeekly(false);
				setLoadingArtists(false);
				setLoadingNew(false);
				setLoadingAlbums(false);
				setLoadingGenres(false);
				setLoadingRecently(false);
			}
		};

		fetchData();
	}, [isLogin]);

	const handleListenNow = () => {
		dispatch(setCurrentSong(weeklySongs[0]));
		dispatch(setPlaylist(weeklySongs));
	};

	return (
		<div>
			<div className="flex flex-col justify-center lg:flex-row lg:justify-stretch mb-4">
				<img
					src={banner}
					alt="Banner"
					className="w-full basis-3/7 shrink-0 h-auto px-4 "
				/>
				<div className="flex flex-col basis-4/7 place-items-center lg:place-items-start lg:justify-center">
					<h1 className="text-white text-center text-2xl my-4 lg:text-start lg:text-5xl">
						This Month&apos;s <br />
						<span className="text-[#3BC8E7]">Record Breaking Songs!</span>
					</h1>
					<p className="text-[#777777] text-center text-base px-14 mb-4 leading-7 lg:text-start lg:ps-0">
						{loadingWeekly ? (
							<Skeleton count={2} height={16} width="75%" />
						) : (
							breakingSongs.join(", ") + " and many more..."
						)}
					</p>
					<PillButton text="Listen Now" onClick={handleListenNow} />
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
							{loadingRecently ? (
								<div className="flex mx-8 gap-4">
									{Array.from({ length: 6 }).map((_, i) => (
										<div key={i} className="flex-shrink-0 w-1/6">
											<div className="rounded-md p-2">
												<Skeleton height={160} className="w-full" />
												<Skeleton height={16} className="mt-2" />
												<Skeleton height={12} width="75%" />
											</div>
										</div>
									))}
								</div>
							) : recentlyPlayed.length === 0 ? (
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
					{loadingArtists ? (
						<div className="flex mx-8 gap-4">
							{Array.from({ length: 6 }).map((_, i) => (
								<div key={i} className="flex-shrink-0 w-1/6">
									<div className="p-2">
										<Skeleton circle height={160} width={160} />
										<Skeleton height={16} className="mt-2" />
										<Skeleton height={12} width="50%" />
									</div>
								</div>
							))}
						</div>
					) : (
						<ItemsCarousel items={featuredArtists} isArtist />
					)}
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
						<ItemsCarousel items={newReleases} isSong />
					)}
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
					{loadingAlbums ? (
						<div className="flex mx-8 gap-4">
							{Array.from({ length: 6 }).map((_, i) => (
								<div key={i} className="flex-shrink-0 w-1/6">
									<div className="rounded-md p-2">
										<Skeleton height={160} className="w-full" />
										<Skeleton height={16} className="mt-2" />
										<Skeleton height={12} width="75%" />
									</div>
								</div>
							))}
						</div>
					) : (
						<ItemsCarousel items={featuredAlbums} isAlbum />
					)}
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
					{loadingGenres
						? Array.from({ length: 6 }).map((_, i) => (
								<div key={i} className="w-full">
									<Skeleton height={128} className="rounded-md" />
								</div>
						  ))
						: topGenres.map((item) => (
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
