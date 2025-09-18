import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import PillButton from "../components/PillButton";
import AlbumCard from "../components/AlbumCard";
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
					console.log("Fetched history:", response.data);
				}
			} catch (error) {
				console.error("Error fetching history:", error);
			}
		};
	});

	if (!isLogin) {
		return (
			<div className="flex justify-center items-center h-screen">
				<p className="text-gray-400 font-semibold text-xl">
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
				<PillButton text={"Clear"} />
			</div>

			<div className="grid mx-8 mb-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-6">
				{history.map((album) => (
					<AlbumCard key={album.id} album={album} />
				))}
			</div>
		</>
	);
}
