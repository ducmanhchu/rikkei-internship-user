import SearchIcon from "../assets/search.svg";

export default function SearchBar() {
	return (
		<div className="flex rounded-md overflow-hidden">
			<input
				type="text"
				placeholder="Search Music Here.."
				className="flex-1 px-4 py-1 text-[10px] text-[#6C757D] font-medium bg-white focus:outline-none"
			/>
			<button className="bg-[#3BC8E7] py-2 px-3 flex items-center justify-center">
				<img className="w-4" src={SearchIcon} alt="Search" />
			</button>
		</div>
	);
}
