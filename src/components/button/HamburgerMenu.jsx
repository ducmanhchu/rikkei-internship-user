import { Bars3Icon, XCircleIcon } from "@heroicons/react/24/outline";

export default function HamburgerMenu({ onClick, isOpen }) {
	return (
		<button
			onClick={onClick}
			className="lg:hidden flex flex-col justify-center content-center items-center w-6 h-6 space-y-1"
		>
			{isOpen ? (
				<XCircleIcon className="w-6 h-6 text-white" />
			) : (
				<Bars3Icon className="w-6 h-6 text-white" />
			)}
		</button>
	);
}
