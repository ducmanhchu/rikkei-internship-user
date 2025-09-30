import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { albumService } from "../services/album";
import { artistService } from "../services/artist";
import ItemsCarousel from "../components/util/ItemsCarousel";
import WeeklyItem from "../components/item/WeeklyItem";
import Skeleton from "react-loading-skeleton";

export default function Albums() {
	const navigate = useNavigate();
	const [featuredAlbums, setFeaturedAlbums] = useState([]);
	const [topAlbums, setTopAlbums] = useState([]);
	const [newAlbums, setNewAlbums] = useState([]);
	const [featuredArtists, setFeaturedArtists] = useState([]);

	const [loadingFeaturedAlbums, setLoadingFeaturedAlbums] = useState(true);
	const [loadingTopAlbums, setLoadingTopAlbums] = useState(true);
	const [loadingNewAlbums, setLoadingNewAlbums] = useState(true);
	const [loadingFeaturedArtists, setLoadingFeaturedArtists] = useState(true);

	useEffect(() => {
		const fetchAll = async () => {
			try {
				setLoadingFeaturedAlbums(true);
				setLoadingFeaturedArtists(true);
				setLoadingTopAlbums(true);
				setLoadingNewAlbums(true);

				const results = await Promise.allSettled([
					albumService.getFeaturedAlbums(),
					artistService.getFeaturedArtists(),
					albumService.getTop15Albums(),
					albumService.getNewAlbums(),
				]);

				const [
					featuredAlbumsRes,
					featuredArtistsRes,
					topAlbumsRes,
					newAlbumsRes,
				] = results;

				if (
					featuredAlbumsRes?.status === "fulfilled" &&
					featuredAlbumsRes.value?.success
				) {
					setFeaturedAlbums(featuredAlbumsRes.value.data || []);
				} else {
					setFeaturedAlbums([]);
				}
				setLoadingFeaturedAlbums(false);

				if (
					featuredArtistsRes?.status === "fulfilled" &&
					featuredArtistsRes.value?.success
				) {
					setFeaturedArtists(featuredArtistsRes.value.data || []);
				} else {
					setFeaturedArtists([]);
				}
				setLoadingFeaturedArtists(false);

				if (
					topAlbumsRes?.status === "fulfilled" &&
					topAlbumsRes.value?.success
				) {
					setTopAlbums(topAlbumsRes.value.data || []);
				} else {
					setTopAlbums([]);
				}
				setLoadingTopAlbums(false);

				if (
					newAlbumsRes?.status === "fulfilled" &&
					newAlbumsRes.value?.success
				) {
					setNewAlbums(newAlbumsRes.value.data || []);
				} else {
					setNewAlbums([]);
				}
				setLoadingNewAlbums(false);
			} catch (error) {
				console.error("Error fetching albums page:", error);
				setLoadingFeaturedAlbums(false);
				setLoadingFeaturedArtists(false);
				setLoadingTopAlbums(false);
				setLoadingNewAlbums(false);
			}
		};

		fetchAll();
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
				{loadingFeaturedAlbums ? (
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

			<div className="mb-6 mx-8">
				<p className="text-[#3BC8E7] text-lg">Top 15 Albums</p>
				<span className="block h-0.5 w-5 rounded-md bg-[#3BC8E7]"></span>
			</div>
			<div className="grid grid-cols-1 mx-8 mb-14 gap-6 lg:grid-cols-3">
				{loadingTopAlbums
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
					: topAlbums.map((song, index) => (
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
				{loadingFeaturedArtists ? (
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
				{loadingNewAlbums ? (
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
					<ItemsCarousel items={newAlbums} isAlbum />
				)}
			</div>
		</div>
	);
}
