import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { songService } from "../services/song";
import SongTable from "../components/SongTable";

export default function AlbumDetail() {
	const { albumID } = useParams();
	const [songs, setSongs] = useState([]);

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
		<div className="m-8">
			<div className="flex gap-4 mb-4">
				<img
					className="w-32 h-32 bg-cover rounded-md lg:w-52 lg:h-52"
					src={songs[0]?.albumImage}
					alt="Album cover"
				/>
				<div className="flex flex-col text-white gap-1 justify-end">
					<h5 className="text-sm">Album</h5>
					<h1 className="text-2xl font-bold pt-1 md:text-4xl lg:text-6xl">
						{songs[0]?.albumTitle}
					</h1>
					<h4 className="font-medium text-md ">{songs[0]?.artistName}</h4>
				</div>
			</div>
			<SongTable songs={songs} />
		</div>
	);
}
