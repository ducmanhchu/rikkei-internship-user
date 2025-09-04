import { useState } from "react";
import MiraculousLogo from "../assets/miraculous.svg";

export default function Sidebar({ isOpen, handleClick }) {
	const [activeIndex, setActiveIndex] = useState(0);

	const menuItems = [
		{ icon: "/icons/home.svg", label: "Discover" },
		{ icon: "/icons/albums.svg", label: "Albums" },
		{ icon: "/icons/artists.svg", label: "Artists" },
		{ icon: "/icons/genres.svg", label: "Genres" },
		{ icon: "/icons/toptracks.svg", label: "Top Tracks" },
		{ icon: "/icons/download.svg", label: "Downloads" },
		{ icon: "/icons/favourite.svg", label: "Favourites" },
		{ icon: "/icons/history.svg", label: "History" },
	];

	const handleMenuClick = (index) => {
		setActiveIndex(index);
	};

	return (
		<>
			<aside
				className={`
                    fixed top-0 left-0 h-screen w-48 z-10 bg-[#1B2039] transform transition-transform duration-300 ease-in-out
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}
                `}
			>
				<div className="flex flex-col items-center py-6">
					<img src={MiraculousLogo} alt="Miraculous" className="w-24" />
				</div>

				<nav className="py-4">
					{menuItems.map((item, index) => (
						<button
							key={index}
							className={`
                                w-full flex items-center gap-4 px-6 py-3 text-left transition-colors duration-200
                                ${
																	activeIndex === index
																		? "bg-[#3BC8E7] text-white"
																		: "text-gray-300 hover:bg-gray-700 hover:text-white"
																}
                            `}
							onClick={() => handleMenuClick(index)}
						>
							<img
								className="w-5 h-5 flex-shrink-0"
								src={item.icon}
								alt={item.label}
							/>
							<span className="font-medium leading-5">{item.label}</span>
						</button>
					))}
				</nav>

				<button
					onClick={handleClick}
					className={`hidden absolute rounded-full bg-[#1B2039] pe-3 w-12 h-10 -right-8 -z-10 top-[50vh] lg:inline-flex lg:justify-end lg:items-center`}
				>
					<img
						src="/icons/arrow.svg"
						alt="Close sidebar"
						className={`${!isOpen && "lg:rotate-180"}`}
					/>
				</button>
			</aside>
		</>
	);
}
