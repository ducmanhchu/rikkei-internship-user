import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import { playlistService } from "../services/playlist";
import SongTable from "../components/table/SongTable";

export default function PlaylistDetail() {
	const { playlistID } = useParams();
	const [playlist, setPlaylist] = useState([]);

	// useEffect(() => {
	// 	const fetchPlaylist = async () => {
	// 		try {
	//             const response = await playlistService.getPlaylist(playlistID);
	//         }
	// 	};

	// }, [playlistID]);

	return <div></div>;
}
