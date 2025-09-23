import { useState, useEffect } from "react";

import GenreCard from "../components/GenreCard";
import { genreService } from "../services/genre";

export default function Genres() {
	const [genres, setGenres] = useState([]);

	useEffect(() => {
		const fetchGenres = async () => {
			try {
				const response = await genreService.getAllGenres();
				if (response.success) {
					setGenres(response.data.content);
				}
			} catch (error) {
				console.error("Error fetching genres:", error);
			}
		};
		fetchGenres();
	}, []);

	return (
		<>
			<div className="flex justify-between my-6 mx-8">
				<div className="flex flex-col">
					<p className="text-[#3BC8E7] text-md">Top Genres</p>
					<span className="block h-0.5 w-5 rounded-md bg-[#3BC8E7]"></span>
				</div>
				<p className="text-white text-md cursor-pointer">View More</p>
			</div>
			<div className="grid grid-cols-1 gap-3 mx-8 mb-14 md:grid-cols-2 lg:grid-cols-3">
				{genres.map((item) => (
					<GenreCard key={item.id} genre={item} additionalClass="w-full h-32" />
				))}
			</div>
		</>
	);
}
