import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { logout } from "../redux/authSlice";
import { clearPlayer } from "../redux/playerSlice";
import { authService } from "../services/auth";
import SearchBar from "../components/SearchBar";
import HamburgerMenu from "../components/HamburgerMenu";

export default function Header({ onMenuClick, sidebarOpen, onAuthClick }) {
	const dispatch = useDispatch();
	const { isLogin, user, token } = useSelector((state) => state.auth);
	const [showDropdown, setShowDropdown] = useState(false);

	const handleLogout = async () => {
		try {
			await authService.logout(token);
			dispatch(logout());
			dispatch(clearPlayer());
			setShowDropdown(false);
		} catch (error) {
			console.error("Logout error:", error);
			dispatch(logout());
			setShowDropdown(false);
		}
	};

	return (
		<>
			<header className="bg-[#1B2039] flex justify-between items-center px-4 py-2 lg:py-4">
				<div className="flex gap-4 items-center">
					<SearchBar />
					<p className="text-[15px] text-white font-medium hidden lg:block">
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
					{!isLogin ? (
						<>
							<button
								className="flex h-7 w-7 items-center justify-center rounded-full bg-[#3BC8E7] md:h-auto md:w-auto md:rounded-full md:px-6 md:py-1 transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,200,231,0.7)] cursor-pointer"
								onClick={() => onAuthClick("register")}
							>
								<img
									className="md:hidden"
									src="/icons/register.svg"
									alt="Register"
								/>
								<span className="hidden text-sm font-medium text-white md:!inline">
									Register
								</span>
							</button>
							<button
								className="flex h-7 w-7 items-center justify-center rounded-full bg-[#3BC8E7] md:h-auto md:w-auto md:rounded-full md:px-6 md:py-1 transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,200,231,0.7)] cursor-pointer"
								onClick={() => onAuthClick("login")}
							>
								<img className="md:hidden" src="/icons/login.svg" alt="Login" />
								<span className="hidden text-sm font-medium text-white md:!inline">
									Login
								</span>
							</button>
						</>
					) : (
						<div className="relative">
							<button
								className="text-white ms-3 rounded-full px-4 border cursor-pointer hover:bg-gray-700"
								onClick={() => setShowDropdown(!showDropdown)}
							>
								{user?.firstName} {user?.lastName}
							</button>
							{showDropdown && (
								<div className="absolute left-2 bg-black mt-1 rounded-md w-full">
									<button
										className="w-full rounded-md text-start text-white px-4 py-2 cursor-pointer hover:bg-gray-700"
										onClick={handleLogout}
									>
										Logout
									</button>
								</div>
							)}
						</div>
					)}
					<HamburgerMenu onClick={onMenuClick} isOpen={sidebarOpen} />
				</div>
			</header>
		</>
	);
}
