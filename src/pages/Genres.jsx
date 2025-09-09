import GenreCard from "../components/GenreCard";

export default function Genres() {
	const draftGenres = [
		{ id: 1, name: "Pop", cover_image: "/images/genre1.png" },
		{ id: 2, name: "Rock", cover_image: "/images/genre1.png" },
		{ id: 3, name: "Jazz", cover_image: "/images/genre1.png" },
		{ id: 4, name: "Classical", cover_image: "/images/genre1.png" },
		{ id: 5, name: "Hip Hop", cover_image: "/images/genre1.png" },
		{ id: 6, name: "Country", cover_image: "/images/genre1.png" },
	];

	return (
		<>
			<div className="flex justify-between mb-6 mx-8">
				<div className="flex flex-col">
					<p className="text-[#3BC8E7] text-md">Top Genres</p>
					<span className="block h-0.5 w-5 rounded-md bg-[#3BC8E7]"></span>
				</div>
				<p className="text-white text-md cursor-pointer">View More</p>
			</div>
			<div className="grid grid-cols-1 gap-3 mx-8 mb-14 md:grid-cols-2 lg:grid-cols-3">
				{draftGenres.map((item) => (
					<GenreCard
						key={item.id}
						genre={item}
						additionalClass="w-full h-32"
						onClick={(g) => console.log("Clicked genre:", g.name)}
					/>
				))}
			</div>
		</>
	);
}
