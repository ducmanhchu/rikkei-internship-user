import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";

import ArtistCard from "../components/card/ArtistCard";
import { artistService } from "../services/artist";

export default function Artists() {
	const [featuredArtists, setFeaturedArtists] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchFeaturedArtists = async () => {
			try {
				setLoading(true);
				const response = await artistService.getFeaturedArtists();
				if (response.success) {
					setFeaturedArtists(response.data || []);
				} else {
					setFeaturedArtists([]);
				}
			} catch (error) {
				console.error("Error fetching featured artists:", error);
				setFeaturedArtists([]);
			} finally {
				setLoading(false);
			}
		};

		fetchFeaturedArtists();
	}, []);

	return (
		<div className="px-12 py-6 min-h-[100vh]">
			<div className="flex justify-between mb-4 mx-8">
				<div className="flex flex-col">
					<p className="text-[#3BC8E7] text-lg">Featured Artists</p>
					<span className="block h-0.5 w-5 rounded-md bg-[#3BC8E7]"></span>
				</div>
			</div>
			<div className="mx-8 mb-8 grid md:grid-cols-2 lg:grid-cols-6">
				{loading
					? Array.from({ length: 6 }).map((_, i) => (
							<div key={i} className="flex flex-col items-center p-2">
								<Skeleton circle width={192} height={192} />
								<Skeleton height={16} width={140} className="mt-4" />
								<Skeleton height={12} width={80} />
							</div>
					  ))
					: featuredArtists.map((item) => (
							<ArtistCard key={item.id} artist={item} />
					  ))}
			</div>
		</div>
	);
}
