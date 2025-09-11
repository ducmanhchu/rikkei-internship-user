import { useState, useEffect } from "react";
import AlbumCard from "./AlbumCard";
import NewSongCard from "./NewSongCard";

export default function ItemsCarousel({ items, isNewSongs }) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [itemsPerView, setItemsPerView] = useState(1);

	useEffect(() => {
		const updateItemsPerView = () => {
			const width = window.innerWidth;
			if (width >= 1024) {
				if (isNewSongs) setItemsPerView(4);
				else setItemsPerView(6);
			} else if (width >= 768) setItemsPerView(2);
			else setItemsPerView(1);
		};
		updateItemsPerView();
		window.addEventListener("resize", updateItemsPerView);

		return () => window.removeEventListener("resize", updateItemsPerView);
	}, []);

	const translateX = -(currentIndex * (100 / itemsPerView));

	const handlePrev = () => {
		setCurrentIndex((prev) => prev - 1);
	};

	const handleNext = () => {
		setCurrentIndex((prev) => prev + 1);
	};

	return (
		<div className="relative mx-8">
			<button
				className={`absolute left-0 top-1/2 z-20 rounded-full bg-transparent cursor-pointer transition-all hover:scale-150 ${
					currentIndex === 0 ? "invisible" : "visible"
				}`}
				onClick={handlePrev}
			>
				<img className="w-4" src="/icons/arrow.svg" alt="Previous" />
			</button>

			<div className="overflow-hidden mx-8">
				<div
					className="flex transition-transform duration-500 ease-in-out"
					style={{
						transform: `translateX(${translateX}%)`,
					}}
				>
					{!isNewSongs
						? items.map((album) => (
								<div
									key={album.id}
									className="flex-shrink-0"
									style={{ width: `${100 / itemsPerView}%` }}
								>
									<AlbumCard album={album} />
								</div>
						  ))
						: items.map((song) => (
								<div
									key={song.id}
									className="flex-shrink-0"
									style={{ width: `${100 / itemsPerView}%` }}
								>
									<NewSongCard song={song} />
								</div>
						  ))}
				</div>
			</div>

			<button
				className={`absolute right-0 top-1/2 z-20 rounded-full bg-transparent cursor-pointer transition-all hover:scale-150 ${
					currentIndex === items.length - itemsPerView ? "invisible" : "visible"
				}`}
				onClick={handleNext}
			>
				<img className="w-4 rotate-180" src="/icons/arrow.svg" alt="Next" />
			</button>
		</div>
	);
}
