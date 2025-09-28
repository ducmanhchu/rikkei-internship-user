import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import PillButton from "../components/button/PillButton";
import UserTable from "../components/table/UserTable";
import { songService } from "../services/song";

export default function Favourites() {
	const isLogin = useSelector((state) => state.auth.isLogin);
	const [favouriteSongs, setFavouriteSongs] = useState([]);

	useEffect(() => {
		const fetchFavourites = async () => {
			try {
				const favourites = await songService.getFavouriteSongs();
				if (favourites.success) {
					setFavouriteSongs(favourites.data.reverse());
				}
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		if (isLogin) fetchFavourites();
	}, [isLogin]);

	const handleRemoved = async (songId) => {
		try {
			const response = await songService.removeFavouriteSong(songId);
			if (response.success) {
				setFavouriteSongs((prevSongs) =>
					prevSongs.filter((song) => song.id !== songId)
				);
			}
		} catch (error) {
			console.error("Error removing favourite song:", error);
		}
	};

	if (!isLogin) {
		return (
			<div className="flex justify-center items-center h-[80vh]">
				<p className="text-gray-500 text-lg">
					Please log in to view your favourites.
				</p>
			</div>
		);
	}

	return (
		<div className="px-12 pb-8">
			<div className="flex flex-col mx-8 my-6">
				<p className="text-[#3BC8E7] text-lg">Favourites Songs</p>
				<span className="block h-0.5 w-5 rounded-md bg-[#3BC8E7]"></span>
			</div>
			<UserTable data={favouriteSongs} onRemove={handleRemoved} />
			{favouriteSongs.length > 10 && (
				<div className="flex justify-center my-6">
					<PillButton text="View More" />
				</div>
			)}
			{favouriteSongs.length === 0 && (
				<p className="text-gray-500 text-md mt-6 text-center">
					No favourite songs available.
				</p>
			)}
		</div>
	);
}
