import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useColorThief from "use-color-thief";

import { genreService } from "../services/genre";
import SongTable from "../components/table/SongTable";
import ItemsCarousel from "../components/util/ItemsCarousel";

export default function GenreDetail() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const { genreID } = useParams();
	const [curGenre, setCurGenre] = useState();
	const [songs, setSongs] = useState([]);
	const [albums, setAlbums] = useState([]);
	const { color } = useColorThief(curGenre?.genreUrl, {
		format: "hex",
	});

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const promises = [
					genreService.getAllGenres(),
					genreService.getSongsByGenre(genreID),
				];

				const results = await Promise.all(promises);
				const [genresRes, songsRes] = results;

				if (genresRes && genresRes.success) {
					const cur = genresRes.data.content.find(
						(genre) => genre.id === Number.parseInt(genreID)
					);
					if (cur) setCurGenre(cur);
				}
				if (songsRes && songsRes.success) {
					setSongs(songsRes.data);
					const albums = new Map();
					songsRes.data.forEach((item) => {
						const albumId = item.albumId;
						if (!albums.has(albumId)) {
							albums.set(albumId, item);
						}
					});
					setAlbums(Array.from(albums.values()));
				}
			} catch (error) {
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	return (
		<div>
			<div
				className="relative flex px-12 py-8 h-[35vh] bg-cover bg-center items-end"
				style={{ backgroundImage: `url(${curGenre?.genreUrl})` }}
			>
				<div className="absolute inset-0 bg-black/20 bg-opacity-50"></div>
				<div className="relative z-10">
					<h1 className="text-white ms-6 text-5xl font-bold">
						{curGenre?.genreName}
					</h1>
				</div>
			</div>

			<div
				className="p-2 lg:px-12 lg:pb-8"
				style={{
					background: color
						? `linear-gradient(180deg, ${color} 0%, transparent 50%)`
						: undefined,
				}}
			>
				{loading && <p className="text-gray-400 text-center">Loading...</p>}
				{!loading && error && (
					<p className="text-red-400 text-center">{error}</p>
				)}
				<div className="m-8">
					<h2 className="text-white text-xl font-bold">Featured Songs</h2>
					{songs.length > 0 ? (
						<SongTable songs={songs} />
					) : (
						<p className="text-gray-400 my-4">
							No songs available for this genre.
						</p>
					)}
				</div>
				<div className="m-8">
					<h2 className="text-white text-xl font-bold mb-4">Featured Albums</h2>
					{albums.length > 0 ? (
						<ItemsCarousel items={albums} isAlbum />
					) : (
						<p className="text-gray-400 my-4">
							No albums available for this genre.
						</p>
					)}
				</div>
			</div>
		</div>
	);
}
