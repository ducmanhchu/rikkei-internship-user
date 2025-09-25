import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function SearchBar() {
	const [query, setQuery] = useState("");
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		const t = setTimeout(() => {
			const q = query.trim();
			if (q.length > 0) {
				const url = `/search?q=${encodeURIComponent(q)}`;
				const isOnSearch = location.pathname.startsWith("/search");
				navigate(url, { replace: isOnSearch });
			}
		}, 400);

		return () => clearTimeout(t);
	}, [query, navigate]);

	useEffect(() => {
		const isOnSearch = location.pathname.startsWith("/search");
		if (!isOnSearch) {
			setQuery("");
		}
	}, [location.pathname]);

	return (
		<div className="flex rounded-full w-96 overflow-hidden focus-within:shadow-[0_0_20px_rgba(59,200,231,0.7)] transition-shadow duration-300">
			<button className="bg-[#6C757D] py-3 px-4 self-center cursor-pointer">
				<svg
					className="w-5 h-5"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M17.0392 15.6244C18.2714 14.084 19.0082 12.1301 19.0082 10.0041C19.0082 5.03127 14.9769 1 10.0041 1C5.03127 1 1 5.03127 1 10.0041C1 14.9769 5.03127 19.0082 10.0041 19.0082C12.1301 19.0082 14.084 18.2714 15.6244 17.0392L21.2921 22.707C21.6828 23.0977 22.3163 23.0977 22.707 22.707C23.0977 22.3163 23.0977 21.6828 22.707 21.2921L17.0392 15.6244ZM10.0041 17.0173C6.1308 17.0173 2.99087 13.8774 2.99087 10.0041C2.99087 6.1308 6.1308 2.99087 10.0041 2.99087C13.8774 2.99087 17.0173 6.1308 17.0173 10.0041C17.0173 13.8774 13.8774 17.0173 10.0041 17.0173Z"
						fill="#fbf9ff"
					/>
				</svg>
			</button>
			<input
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				type="text"
				placeholder="What do you want to play?"
				className="flex-1 text-[16px] text-[#fbf9ff] bg-[#6C757D] focus:outline-none"
			/>
		</div>
	);
}
