import SearchBar from "../components/SearchBar";
import HamburgerMenu from "../components/HamburgerMenu";

export default function Header({ onMenuClick, sidebarOpen }) {
	return (
		<>
			<header className="bg-[#1B2039] flex justify-between items-center px-4 py-2 lg:py-4">
				<div className="flex gap-4 items-center">
					<SearchBar />
					<p className="text-[15px] text-white font-medium hidden lg:inline">
						<span className="text-[#3BC8E7] text-[15px] font-medium">
							Trending Songs:&nbsp;
						</span>
						Dream your moments, Until I Met You, Gim
					</p>
				</div>
				<div className="flex gap-2 items-center">
					<p className="hidden md:block text-[15px] text-white font-medium">
						Languages
					</p>
					<img
						className="hidden md:block"
						src="/icons/languages.svg"
						alt="Languages"
					/>
					<button className="flex h-7 w-7 items-center justify-center rounded-full bg-[#3BC8E7] md:h-auto md:w-auto md:rounded-full md:px-6 md:py-1 transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,200,231,0.7)]">
						<img
							className="md:hidden"
							src="/icons/register.svg"
							alt="Register"
						/>
						<span className="hidden text-sm font-medium text-white md:!inline">
							Register
						</span>
					</button>
					<button className="flex h-7 w-7 items-center justify-center rounded-full bg-[#3BC8E7] md:h-auto md:w-auto md:rounded-full md:px-6 md:py-1 transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,200,231,0.7)]">
						<img className="md:hidden" src="/icons/login.svg" alt="Login" />
						<span className="hidden text-sm font-medium text-white md:!inline">
							Login
						</span>
					</button>
					<HamburgerMenu onClick={onMenuClick} isOpen={sidebarOpen} />
				</div>
			</header>
		</>
	);
}
