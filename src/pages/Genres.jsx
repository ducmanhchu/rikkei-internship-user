import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";

import GenreCard from "../components/card/GenreCard";
import { genreService } from "../services/genre";

export default function Genres() {
	const [genres, setGenres] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchGenres = async () => {
			try {
				setLoading(true);
				const response = await genreService.getAllGenres();
				if (response.success) {
					const content = response.data?.content || response.data || [];
					setGenres(content);
				} else {
					setGenres([]);
				}
			} catch (error) {
				console.error("Error fetching genres:", error);
				setGenres([]);
			} finally {
				setLoading(false);
			}
		};
		fetchGenres();
	}, []);

	return (
		<div className="px-12 py-6 min-h-[100vh]">
			<div className="flex justify-between mb-6 mx-8">
				<div className="flex flex-col">
					<p className="text-[#3BC8E7] text-lg">Top Genres</p>
					<span className="block h-0.5 w-5 rounded-md bg-[#3BC8E7]"></span>
				</div>
			</div>
			<div className="grid grid-cols-1 gap-3 mx-8 mb-14 md:grid-cols-2 lg:grid-cols-3">
				{loading
					? Array.from({ length: 6 }).map((_, i) => (
							<div key={i} className="w-full">
								<Skeleton height={128} className="rounded-md" />
							</div>
					  ))
					: genres.map((item) => (
							<GenreCard
								key={item.id}
								genre={item}
								additionalClass="w-full h-32"
							/>
					  ))}
			</div>
		</div>
	);
}
