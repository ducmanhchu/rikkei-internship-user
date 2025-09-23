import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { albumService } from "../services/album";
import { songService } from "../services/song";
import SongTable from "../components/table/SongTable";
import ItemsCarousel from "../components/util/ItemsCarousel";

export default function ArtistDetail() {
	const { artistID } = useParams();
	const [albums, setAlbums] = useState([]);
	const [songs, setSongs] = useState([]);

	useEffect(() => {
		const fetchSongs = async () => {
			try {
				const response = await songService.getSongByArtist(artistID);
				if (response && response.data) {
					setSongs(response.data);
					console.log("Fetched songs by artist:", response.data);
				}
			} catch (error) {
				console.error("Error fetching songs:", error);
			}
		};

		const fetchAlbums = async () => {
			try {
				const response = await albumService.getAlbumsByArtist(artistID);
				if (response && response.data && response.data.length > 0) {
					setAlbums(response.data);
					console.log("Fetched albums by artist:", response.data);
				}
			} catch (error) {
				console.error("Error fetching albums:", error);
			}
		};

		fetchSongs();
		fetchAlbums();
	}, []);

	return (
		<div className="m-8">
			<div className="flex gap-4 mb-8">
				<img
					src={songs[0]?.artistImage || songs.profileImage}
					className="w-32 h-32 bg-cover rounded-full lg:w-52 lg:h-52"
					alt="Artist Image"
				/>
				<div className="flex flex-col gap-2 justify-center text-white">
					<h5 className="text-md ps-1">Artist</h5>
					<h1 className="text-xl font-bold pt-1 md:text-3xl lg:text-5xl">
						{songs[0]?.artistName || songs.fullName}
					</h1>
				</div>
			</div>
			<div className="mb-8">
				<h2 className="text-white text-xl font-bold">Popular</h2>
				{songs.length > 0 ? (
					<SongTable songs={songs} />
				) : (
					<p className="text-gray-400 my-4">
						No songs available for this artist.
					</p>
				)}
			</div>
			<div className="">
				<h2 className="text-white text-xl font-bold mb-4">Discography</h2>
				{albums.length > 0 ? (
					<ItemsCarousel items={albums} isAlbum />
				) : (
					<p className="text-gray-400 my-4">
						No albums available for this artist.
					</p>
				)}
			</div>
		</div>
	);
}
