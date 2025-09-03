export default function HamburgerMenu({ onClick }) {
	return (
		<button
			onClick={onClick}
			className="lg:hidden flex flex-col justify-center content-center items-center w-6 h-6 space-y-1"
		>
			<span className="block w-5 h-0.5 bg-white"></span>
			<span className="block w-5 h-0.5 bg-white"></span>
			<span className="block w-5 h-0.5 bg-white"></span>
		</button>
	);
}
