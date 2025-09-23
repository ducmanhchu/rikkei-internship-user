import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import PillButton from "../components/button/PillButton";
import SongCard from "../components/card/SongCard";
import { songService } from "../services/song";

export default function History() {
	const [history, setHistory] = useState([]);
	const { isLogin } = useSelector((state) => state.auth);

	useEffect(() => {
		const fetchHistory = async () => {
			try {
				const response = await songService.getPlayedHistory();

				if (response.success) {
					setHistory(response.data);
				}
			} catch (error) {
				console.error("Error fetching history:", error);
			}
		};

		if (isLogin) fetchHistory();
	}, [isLogin]);

	const handleClear = async () => {
		try {
			if (history.length === 0) return;
			const response = await songService.clearHistory();
			if (response.success) {
				setHistory([]);
			}
		} catch (error) {
			console.error("Error clearing history:", error);
		}
	};

	if (!isLogin) {
		return (
			<div className="flex justify-center items-center h-[80vh]">
				<p className="text-gray-500 text-lg">
					Please log in to view your history.
				</p>
			</div>
		);
	}

	return (
		<>
			<div className="flex justify-between mx-8 mt-8">
				<div className="flex flex-col">
					<p className="text-[#3BC8E7] text-md">History</p>
					<span className="block h-0.5 w-5 rounded-md bg-[#3BC8E7]"></span>
				</div>
				<PillButton text={"Clear"} onClick={handleClear} />
			</div>

			<div className="grid mx-8 mb-10 gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
				{history.length === 0 ? (
					<p className="text-gray-500 text-md">No history available.</p>
				) : (
					history.map((song) => <SongCard key={song.id} song={song} />)
				)}
			</div>
		</>
	);
}
