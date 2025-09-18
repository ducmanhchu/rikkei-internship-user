export default function SearchBar() {
	return (
		<div className="flex rounded-full overflow-hidden focus-within:shadow-[0_0_20px_rgba(59,200,231,0.7)] transition-shadow duration-300 ">
			<input
				type="text"
				placeholder="Search Music Here.."
				className="flex-1 px-4 text-[14px] text-[#6C757D] font-medium bg-white focus:outline-none"
			/>
			<button className="bg-[#3BC8E7] py-2 px-3 flex items-center justify-center cursor-pointer">
				<img className="w-4" src="/icons/search.svg" alt="Search" />
			</button>
		</div>
	);
}
