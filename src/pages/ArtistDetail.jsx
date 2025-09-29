import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import useColorThief from "use-color-thief";

import { albumService } from "../services/album";
import { songService } from "../services/song";
import SongTable from "../components/table/SongTable";
import ItemsCarousel from "../components/util/ItemsCarousel";

export default function ArtistDetail() {
	const { artistID } = useParams();
	const [albums, setAlbums] = useState([]);
	const [songs, setSongs] = useState([]);
	const imageRef = useRef();
	const { color } = useColorThief(imageRef, {
		format: "hex",
	});

	useEffect(() => {
		const fetchSongs = async () => {
			try {
				const response = await songService.getSongByArtist(artistID);
				if (response && response.data) {
					setSongs(response.data);
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
				}
			} catch (error) {
				console.error("Error fetching albums:", error);
			}
		};

		fetchSongs();
		fetchAlbums();
	}, []);

	return (
		<div>
			<div
				className="flex gap-4 mb-4 py-8 px-12"
				style={{
					background: color
						? `linear-gradient(180deg, ${color} 0%, transparent 100%)`
						: undefined,
				}}
			>
				<img
					ref={imageRef}
					crossOrigin="anonymous"
					src={songs[0]?.artist?.profileImage || songs?.profileImage}
					className="w-32 h-32 object-cover shadow-xl/30 rounded-full lg:w-52 lg:h-52"
					alt="Artist Image"
				/>
				<div className="flex flex-col gap-2 justify-center text-white">
					<h5 className="text-md ps-1">Artist</h5>
					<h1 className="text-xl font-bold pt-1 md:text-3xl lg:text-5xl">
						{songs[0]?.artist
							? songs[0]?.artist?.firstName + " " + songs[0]?.artist?.lastName
							: songs?.firstName + " " + songs?.lastName}
					</h1>
				</div>
			</div>
			<div className="px-12 pb-8">
				<div className="mx-8 mb-8">
					<h2 className="text-white text-xl font-bold">Popular</h2>
					{songs.length > 0 ? (
						<SongTable songs={songs} />
					) : (
						<p className="text-gray-400 my-4">
							No songs available for this artist.
						</p>
					)}
				</div>
				<div className="m-8">
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
		</div>
	);
}
