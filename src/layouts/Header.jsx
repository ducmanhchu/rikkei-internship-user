import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { logout } from "../redux/authSlice";
import { clearPlayer } from "../redux/playerSlice";
import { authService } from "../services/auth";
import { openModal } from "../redux/modalSlice";
import SearchBar from "../components/SearchBar";
import HamburgerMenu from "../components/button/HamburgerMenu";

export default function Header({ onMenuClick, sidebarOpen }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { isLogin, user, accessToken } = useSelector((state) => state.auth);
	const [showDropdown, setShowDropdown] = useState(false);

	const handleLogout = async () => {
		try {
			await authService.logout(accessToken);
		} catch (error) {
			console.error("Logout error:", error);
		} finally {
			dispatch(logout());
			dispatch(clearPlayer());
			setShowDropdown(false);
			navigate("/");
		}
	};

	return (
		<>
			<header className="bg-[#1B2039] sticky top-0 z-40 flex justify-between items-center px-4 py-4 h-[65px]">
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
					{isLogin && user ? (
						<div className="relative">
							<button
								className="ms-4 cursor-pointer"
								onClick={() => setShowDropdown(!showDropdown)}
							>
								<img
									src={
										user.profileImage ||
										"https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png"
									}
									alt="Profile Image"
									className="w-10 h-10 rounded-full bg-cover hover:scale-105 transition-transform duration-200"
								/>
							</button>
							{showDropdown && (
								<div className="absolute w-[175px] right-1 p-2 bg-black rounded-md">
									<Link to="/profile">
										<button
											className="w-full rounded-md text-start text-white px-4 py-2 cursor-pointer hover:bg-gray-700"
											onClick={() => setShowDropdown(false)}
										>
											Profile
										</button>
									</Link>
									<Link to="/account">
										<button
											className="w-full rounded-md text-start text-white px-4 py-2 cursor-pointer hover:bg-gray-700"
											onClick={() => {
												setShowDropdown(false);
											}}
										>
											Account
										</button>
									</Link>
									<button
										className="w-full rounded-b-md text-start border-t border-gray-700 text-white px-4 py-2 cursor-pointer hover:bg-gray-700"
										onClick={handleLogout}
									>
										Logout
									</button>
								</div>
							)}
						</div>
					) : (
						<>
							<button
								className="flex h-7 w-7 items-center justify-center rounded-full bg-[#3BC8E7] md:h-auto md:w-auto md:rounded-full md:px-6 md:py-1 transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,200,231,0.7)] cursor-pointer"
								onClick={() =>
									dispatch(openModal({ modalName: "REGISTER_MODAL" }))
								}
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
								onClick={() =>
									dispatch(openModal({ modalName: "LOGIN_MODAL" }))
								}
							>
								<img className="md:hidden" src="/icons/login.svg" alt="Login" />
								<span className="hidden text-sm font-medium text-white md:!inline">
									Login
								</span>
							</button>
						</>
					)}
					<HamburgerMenu onClick={onMenuClick} isOpen={sidebarOpen} />
				</div>
			</header>
		</>
	);
}
