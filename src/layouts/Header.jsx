import SearchBar from "../components/SearchBar";
import HamburgerMenu from "../components/HamburgerMenu";
import RegisterIcon from "../assets/register.svg";
import LoginIcon from "../assets/login.svg";
import LanguagesIcon from "../assets/languages.svg";

export default function Header() {
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
						src={LanguagesIcon}
						alt="Languages"
					/>
					<button className="flex h-7 w-7 items-center justify-center rounded-full bg-[#3BC8E7] md:h-auto md:w-auto md:rounded-full md:px-6 md:py-1">
						<img className="md:hidden" src={RegisterIcon} alt="Register" />
						<span className="hidden text-sm font-medium text-white md:!inline">
							Register
						</span>
					</button>
					<button className="flex h-7 w-7 items-center justify-center rounded-full bg-[#3BC8E7] md:h-auto md:w-auto md:rounded-full md:px-6 md:py-1">
						<img className="md:hidden" src={LoginIcon} alt="Login" />
						<span className="hidden text-sm font-medium text-white md:!inline">
							Login
						</span>
					</button>
					<HamburgerMenu />
				</div>
			</header>
		</>
	);
}
