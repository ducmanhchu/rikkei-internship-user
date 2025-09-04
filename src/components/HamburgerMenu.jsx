export default function HamburgerMenu({ onClick, isOpen }) {
	return (
		<button
			onClick={onClick}
			className="lg:hidden flex flex-col justify-center content-center items-center w-6 h-6 space-y-1"
		>
			{isOpen ? (
				<img src="/icons/closesidebar.svg" alt="Close sidebar" />
			) : (
				<>
					<span className="block w-5 h-0.5 bg-white"></span>
					<span className="block w-5 h-0.5 bg-white"></span>
					<span className="block w-5 h-0.5 bg-white"></span>
				</>
			)}
		</button>
	);
}
