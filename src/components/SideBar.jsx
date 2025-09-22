import { useLocation, Link } from "react-router-dom";

import MiraculousLogo from "../assets/miraculous.svg";
import MiniMiraculouseLogo from "../assets/mini-miraculous.svg";

export default function Sidebar({ isOpen, handleClick }) {
	const location = useLocation();

	const menuItems = [
		{ id: 0, icon: "/icons/home.svg", label: "Discover", path: "/" },
		{ id: 1, icon: "/icons/albums.svg", label: "Albums", path: "/albums" },
		{ id: 2, icon: "/icons/artists.svg", label: "Artists", path: "/artists" },
		{ id: 3, icon: "/icons/genres.svg", label: "Genres", path: "/genres" },
		{
			id: 4,
			icon: "/icons/toptracks.svg",
			label: "Top Tracks",
			path: "/top-tracks",
		},
	];

	const additionalMenuItems = [
		{
			id: 5,
			icon: "/icons/download.svg",
			label: "Downloads",
			path: "/downloads",
		},
		{
			id: 6,
			icon: "/icons/favourite.svg",
			label: "Favourites",
			path: "/favourites",
		},
		{ id: 7, icon: "/icons/history.svg", label: "History", path: "/history" },
	];

	return (
		<>
			<aside
				className={`
                    fixed top-0 left-0 h-screen z-50 bg-[#1B2039] transform transition-all duration-300 ease-out
                    ${isOpen ? "translate-x-0 w-48" : "w-16"}
                `}
			>
				<div className="flex flex-col items-center">
					{!isOpen ? (
						<img
							src={MiniMiraculouseLogo}
							alt="Miraculous"
							className="w-12 py-6"
						/>
					) : (
						<img src={MiraculousLogo} alt="Miraculous" className="w-24 py-6" />
					)}
				</div>

				<nav>
					<div className="px-2 mb-10">
						{menuItems.map((item) => (
							<Link
								key={item.path}
								to={item.path}
								className={`
									w-full flex items-center gap-4 text-left transition-all duration-300 ease-in-out border-b border-gray-700 rounded
									${
										location.pathname === item.path
											? "bg-[#3BC8E7] text-white"
											: "text-gray-300 hover:bg-gray-700 hover:text-white"
									}
									${isOpen ? "px-6 py-3" : "p-3"}
								`}
							>
								<img
									className="w-5 h-5 shrink-0"
									src={item.icon}
									alt={item.label}
								/>
								{isOpen && (
									<span className="pt-2 leading-5 transition whitespace-nowrap">
										{item.label}
									</span>
								)}
							</Link>
						))}
					</div>
					<div className="px-2 mb-8">
						{additionalMenuItems.map((item) => (
							<Link
								key={item.path}
								to={item.path}
								className={`
									w-full flex items-center gap-4 text-left transition-all duration-300 ease-in-out border-b border-gray-700 rounded
									${
										location.pathname === item.path
											? "bg-[#3BC8E7] text-white"
											: "text-gray-300 hover:bg-gray-700 hover:text-white"
									}
									${isOpen ? "px-6 py-3" : "p-3"}
								`}
							>
								<img
									className="w-5 h-5 shrink-0"
									src={item.icon}
									alt={item.label}
								/>
								{isOpen && (
									<span className="pt-2 leading-5 transition whitespace-nowrap">
										{item.label}
									</span>
								)}
							</Link>
						))}
					</div>
				</nav>

				<button
					onClick={handleClick}
					className={`hidden absolute rounded-full bg-[#1B2039] pe-3 w-12 h-10 -right-8 -z-10 top-[50vh] lg:inline-flex lg:justify-end lg:items-center`}
				>
					<img
						src="/icons/arrow.svg"
						alt="Close sidebar"
						className={`${
							!isOpen &&
							"lg:rotate-180 lg:transition-transform lg:ease-in-out lg:duration-300"
						}`}
					/>
				</button>
			</aside>
		</>
	);
}
