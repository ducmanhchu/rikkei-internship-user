import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import useColorThief from "use-color-thief";

import { songService } from "../services/song";
import SongTable from "../components/table/SongTable";

export default function AlbumDetail() {
	const { albumID } = useParams();
	const [songs, setSongs] = useState([]);
	const imageRef = useRef();
	const { color } = useColorThief(imageRef, {
		format: "hex",
	});

	useEffect(() => {
		const fetchSongs = async () => {
			try {
				const response = await songService.getSongFromAlbum(albumID);
				if (response && response.data && response.data.length > 0) {
					setSongs(response.data);
				}
			} catch (error) {
				console.error("Error fetching songs:", error);
			}
		};
		fetchSongs();
	}, [albumID]);

	return (
		<div>
			<div
				className="flex gap-6 mb-2 py-8 px-12"
				style={{
					background: color
						? `linear-gradient(180deg, ${color} 0%, transparent 100%)`
						: undefined,
				}}
			>
				<img
					ref={imageRef}
					className="w-32 h-32 object-cover shadow-xl/30 rounded-md lg:w-52 lg:h-52"
					src={songs[0]?.album?.coverImage}
					crossOrigin="anonymous"
					alt="Album cover"
				/>
				<div className="flex flex-col text-white gap-2 justify-end">
					<h5 className="text-sm">Album</h5>
					<h1 className="text-2xl font-bold pt-1 md:text-4xl lg:text-6xl">
						{songs[0]?.album?.title}
					</h1>
					<h4 className="font-medium text-md ">
						{songs[0]?.artist?.firstName + " " + songs[0]?.artist?.lastName}
					</h4>
				</div>
			</div>
			<div className="px-12 pb-8">
				<SongTable songs={songs} />
			</div>
		</div>
	);
}
