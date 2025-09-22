export default function GenreCard({ genre, additionalClass, onClick }) {
	const handleClick = () => {
		if (onClick) {
			onClick(genre);
		}
	};

	return (
		<div
			className={`relative rounded-lg overflow-hidden cursor-pointer transition-transform duration-200 ${additionalClass}`}
			onClick={handleClick}
		>
			<img
				src={genre.genreUrl}
				alt={genre.genreName}
				className="w-full h-full object-cover brightness-60 hover:scale-105 transition-transform duration-300"
			/>
			<div className="absolute bottom-4 left-4">
				<h3 className="text-white font-semibold text-lg">{genre.genreName}</h3>
			</div>
		</div>
	);
}
