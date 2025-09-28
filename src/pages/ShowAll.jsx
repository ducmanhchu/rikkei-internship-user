import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import { albumService } from "../services/album";
import { songService } from "../services/song";
import { artistService } from "../services/artist";
import { genreService } from "../services/genre";

import AlbumCard from "../components/card/AlbumCard";
import SongCard from "../components/card/SongCard";
import ArtistCard from "../components/card/ArtistCard";
import GenreCard from "../components/card/GenreCard";

export default function ShowAll() {
	const { type } = useParams();
	const [searchParams] = useSearchParams();
	const source = searchParams.get("source");

	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	const title = useMemo(() => {
		const map = {
			"albums:featured": "Featured Albums",
			"albums:recently-played": "Recently Played",
			"albums:new-releases": "New Releases",
			"songs:weekly": "Weekly Top",
			"songs:new-releases": "New Releases",
			"songs:top-all-time": "Top All Time",
			"artists:featured": "Featured Artists",
			"genres:top": "Top Genres",
		};
		return map[`${type}:${source}`] || "All";
	}, [type, source]);

	useEffect(() => {
		let mounted = true;
		const fetchData = async () => {
			setLoading(true);
			setError("");
			try {
				let response;
				if (type === "albums") {
					if (source === "featured") {
						response = await albumService.getFeaturedAlbums();
						mounted && setItems(response.data || []);
					} else if (source === "new-releases") {
						response = await albumService.getNewAlbums();
						mounted && setItems(response.data || []);
					} else if (source === "recently-played") {
						response = await songService.getPlayedHistory();
						if (mounted) {
							const uniqueAlbumById = new Map();
							(response.data || []).forEach((item) => {
								const albumId = item.album?.id;
								if (!uniqueAlbumById.has(albumId))
									uniqueAlbumById.set(albumId, item);
							});
							setItems(Array.from(uniqueAlbumById.values()));
						}
					} else {
						mounted && setItems([]);
					}
				} else if (type === "songs") {
					if (source === "weekly") {
						response = await songService.getWeeklySongs();
						mounted && setItems(response.data || []);
					} else if (source === "new-releases") {
						response = await songService.getNewSong();
						mounted && setItems((response.data || []).slice().reverse());
					} else if (source === "top-all-time") {
						response = await songService.getTopAllTimeSongs();
						mounted && setItems(response.data || []);
					} else {
						mounted && setItems([]);
					}
				} else if (type === "artists") {
					if (source === "featured") {
						response = await artistService.getFeaturedArtists();
						mounted && setItems(response.data || []);
					} else {
						mounted && setItems([]);
					}
				} else if (type === "genres") {
					if (source === "top") {
						response = await genreService.getAllGenres();
						const data = response.data?.content || response.data || [];
						mounted && setItems(data);
					} else {
						mounted && setItems([]);
					}
				} else {
					mounted && setItems([]);
				}
			} catch (err) {
				if (mounted) setError(err.message || "Đã có lỗi xảy ra");
			} finally {
				if (mounted) setLoading(false);
			}
		};

		fetchData();
		return () => {
			mounted = false;
		};
	}, [type, source]);

	return (
		<div className="px-12 py-8">
			<div className="flex justify-between mb-6 mx-8">
				<div className="flex flex-col">
					<p className="text-[#3BC8E7] text-md">{title}</p>
					<span className="block h-0.5 w-5 rounded-md bg-[#3BC8E7]"></span>
				</div>
			</div>

			{loading && <p className="text-gray-400 mx-8">Loading...</p>}
			{!loading && error && <p className="text-red-400 mx-8">{error}</p>}
			{!loading && !error && items.length === 0 && (
				<p className="text-gray-500 mx-8">No data available.</p>
			)}

			{!loading && !error && items.length > 0 && (
				<div
					className={`grid grid-cols-1 mx-8 mb-14 md:grid-cols-2 ${
						type === "songs" ? "lg:grid-cols-3" : "lg:grid-cols-6"
					}`}
				>
					{type === "albums" &&
						items.map((album, idx) => (
							<AlbumCard key={album.id || album.albumId || idx} album={album} />
						))}
					{type === "songs" &&
						items.map((song, idx) => (
							<SongCard key={song.id || idx} song={song} />
						))}
					{type === "artists" &&
						items.map((artist, idx) => (
							<ArtistCard key={artist.id || idx} artist={artist} />
						))}
					{type === "genres" &&
						items.map((genre) => (
							<div className="px-1 py-2" key={genre.id}>
								<GenreCard genre={genre} additionalClass="w-full h-32" />
							</div>
						))}
				</div>
			)}
		</div>
	);
}
