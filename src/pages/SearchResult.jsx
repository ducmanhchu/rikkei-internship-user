import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { searchService } from "../services/search";
import ItemsCarousel from "../components/util/ItemsCarousel";
import SongResultItem from "../components/item/SongResultItem";

export default function SearchResult() {
	const [searchParams] = useSearchParams();
	const query = searchParams.get("q");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const { user } = useSelector((state) => state.auth);
	const [songResults, setSongResults] = useState([]);
	const [albumResults, setAlbumResults] = useState([]);
	const [artistResults, setArtistResults] = useState([]);
	const [playlistResults, setPlaylistResults] = useState([]);

	useEffect(() => {
		const fetchSearch = async () => {
			if (!query) {
				setLoading(false);
				return;
			}

			setLoading(true);
			setError(null);

			try {
				const [songResults, albumResults, artistResults, playlistResults] =
					await Promise.allSettled([
						searchService.searchSong(query),
						searchService.searchAlbum(query),
						searchService.searchArtist(query),
						searchService.searchPlaylist(query),
					]);

				if (songResults.status === "fulfilled") {
					setSongResults(songResults.value.data.content || []);
				} else {
					console.error("Search song failed:", songResults.reason);
					setSongResults([]);
				}

				if (albumResults.status === "fulfilled") {
					setAlbumResults(albumResults.value.data.content || []);
				} else {
					console.error("Search album failed:", albumResults.reason);
					setAlbumResults([]);
				}

				if (artistResults.status === "fulfilled") {
					setArtistResults(artistResults.value.data.content || []);
				} else {
					console.error("Search artist failed:", artistResults.reason);
					setArtistResults([]);
				}

				if (
					playlistResults.status === "fulfilled" &&
					playlistResults.value.length > 0
				) {
					const publicPlaylist = playlistResults.value.data.filter(
						(item) => item.isPublic
					);
					const privatePlaylist = playlistResults.value.data.filter(
						(item) => !item.isPublic
					);
					if (
						user &&
						privatePlaylist.length > 0 &&
						user.id === privatePlaylist[0].userId
					) {
						setPlaylistResults([...publicPlaylist, ...privatePlaylist]);
					} else {
						setPlaylistResults(publicPlaylist);
					}
				} else {
					console.error("Search playlist failed:", playlistResults.reason);
					setPlaylistResults([]);
				}
			} catch (err) {
				setError("Có lỗi xảy ra khi tìm kiếm");
				console.error("Search error:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchSearch();
	}, [query]);

	if (loading) {
		return (
			<div className="px-12 py-8">
				<div className="text-center text-[#3BC8E7]">Đang tìm kiếm...</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="px-12 py-8">
				<div className="text-center text-red-500">Lỗi: {error}</div>
			</div>
		);
	}

	return (
		<div className="px-12 py-8">
			<div className="flex flex-col gap-0.5 mb-4">
				<p className="text-[#3BC8E7] font-semibold text-xl">Songs</p>
				<span className="block h-0.5 w-6 rounded-md bg-[#3BC8E7]"></span>
			</div>
			<div className="mb-8">
				{songResults.length > 0 ? (
					songResults.map((song) => (
						<SongResultItem key={song.id} song={song} />
					))
				) : (
					<p className="text-gray-400 my-4">No songs found.</p>
				)}
			</div>

			<div className="flex flex-col gap-0.5 mb-4">
				<p className="text-[#3BC8E7] font-semibold text-xl">Albums</p>
				<span className="block h-0.5 w-6 rounded-md bg-[#3BC8E7]"></span>
			</div>
			<div className="mb-8">
				{albumResults.length > 0 ? (
					<ItemsCarousel items={albumResults} isAlbum />
				) : (
					<p className="text-gray-400 my-4">No albums found.</p>
				)}
			</div>

			<div className="flex flex-col gap-0.5 mb-4">
				<p className="text-[#3BC8E7] font-semibold text-xl">Artist</p>
				<span className="block h-0.5 w-6 rounded-md bg-[#3BC8E7]"></span>
			</div>
			<div className="mb-8">
				{artistResults.length > 0 ? (
					<ItemsCarousel items={artistResults} isArtist />
				) : (
					<p className="text-gray-400 my-4">No artists found.</p>
				)}
			</div>

			<div className="flex flex-col gap-0.5 mb-4">
				<p className="text-[#3BC8E7] font-semibold text-xl">Playlist</p>
				<span className="block h-0.5 w-6 rounded-md bg-[#3BC8E7]"></span>
			</div>
			<div className="mb-8">
				{playlistResults.length > 0 ? (
					<ItemsCarousel items={playlistResults} isPlaylist />
				) : (
					<p className="text-gray-400 my-4">No playlists found.</p>
				)}
			</div>
		</div>
	);
}
