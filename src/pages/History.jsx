import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";
import { TrashIcon } from "@heroicons/react/24/outline";

import PillButton from "../components/button/PillButton";
import SongCard from "../components/card/SongCard";
import { songService } from "../services/song";

export default function History() {
	const [history, setHistory] = useState([]);
	const { isLogin } = useSelector((state) => state.auth);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchHistory = async () => {
			try {
				setLoading(true);
				const response = await songService.getPlayedHistory();
				if (response.success) {
					setHistory(response.data || []);
				} else {
					setHistory([]);
				}
			} catch (error) {
				console.error("Error fetching history:", error);
				setHistory([]);
			} finally {
				setLoading(false);
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
		<div className="px-12 py-6 min-h-[100vh]">
			<div className="flex justify-between mx-8 mb-6">
				<div className="flex flex-col">
					<p className="text-[#3BC8E7] text-lg">History</p>
					<span className="block h-0.5 w-5 rounded-md bg-[#3BC8E7]"></span>
				</div>
				<PillButton text={"Clear"} Icon={TrashIcon} onClick={handleClear} />
			</div>

			<div className="grid mx-8 mb-10 gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
				{loading ? (
					Array.from({ length: 12 }).map((_, i) => (
						<div key={i} className="p-2 pe-10 rounded-md">
							<div className="flex items-center gap-3">
								<Skeleton height={52} width={52} className="rounded-md" />
								<div className="flex-1">
									<Skeleton height={16} className="mb-2" />
									<Skeleton height={12} width="60%" />
								</div>
								<Skeleton height={12} width={32} />
							</div>
						</div>
					))
				) : history.length === 0 ? (
					<p className="text-gray-500 text-md">No history available.</p>
				) : (
					history.map((song) => <SongCard key={song.id} song={song} />)
				)}
			</div>
		</div>
	);
}
