import { useState, useEffect } from "react";

import ArtistCard from "../components/card/ArtistCard";
import { artistService } from "../services/artist";

export default function Artists() {
	const [featuredArtists, setFeaturedArtists] = useState([]);

	useEffect(() => {
		const fetchFeaturedArtists = async () => {
			try {
				const response = await artistService.getFeaturedArtists();
				if (response.success) {
					setFeaturedArtists(response.data);
				}
			} catch (error) {
				console.error("Error fetching featured artists:", error);
			}
		};

		fetchFeaturedArtists();
	}, []);

	return (
		<div className="px-12">
			<div className="flex justify-between my-6 mx-8">
				<div className="flex flex-col">
					<p className="text-[#3BC8E7] text-lg">Featured Artists</p>
					<span className="block h-0.5 w-5 rounded-md bg-[#3BC8E7]"></span>
				</div>
				{/* <p className="text-white text-md cursor-pointer">View More</p> */}
			</div>
			<div className="mx-8 mb-8 grid md:grid-cols-2 lg:grid-cols-6">
				{featuredArtists.map((item) => (
					<ArtistCard key={item.id} artist={item} />
				))}
			</div>
		</div>
	);
}
