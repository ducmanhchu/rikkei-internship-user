import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

import { authService } from "../services/auth";
import AlbumCard from "../components/card/AlbumCard";

export default function Library() {
	const { isLogin } = useSelector((state) => state.auth);
	const [playlists, setPlaylists] = useState([]);

	useEffect(() => {
		const fetchPlaylists = async () => {
			try {
				const response = await authService.getMe();
				if (response.success) {
					setPlaylists(response.data.playlists);
					console.log(response.data.playlists);
				}
			} catch (error) {
				console.error("Error fetching playlists:", error);
			}
		};

		fetchPlaylists();
	}, []);

	if (!isLogin) {
		return (
			<div className="flex justify-center items-center h-[80vh]">
				<p className="text-gray-500 text-lg">
					Please log in to view your library.
				</p>
			</div>
		);
	}
	return (
		<div className="px-12 py-8">
			<div className="flex justify-between mb-6 mx-8">
				<div className="flex flex-col">
					<p className="text-[#3BC8E7] text-md">Playlists</p>
					<span className="block h-0.5 w-5 rounded-md bg-[#3BC8E7]"></span>
				</div>
			</div>

			<div className="grid grid-cols-1 gap-3 mx-8 mb-14 md:grid-cols-2 lg:grid-cols-6">
				{playlists.map((playlist) => (
					<AlbumCard key={playlist.id} album={playlist} />
				))}
			</div>
		</div>
	);
}
