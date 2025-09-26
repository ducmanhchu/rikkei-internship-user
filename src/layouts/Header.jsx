import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { logout } from "../redux/authSlice";
import { clearPlayer } from "../redux/playerSlice";
import { authService } from "../services/auth";
import { openModal } from "../redux/modalSlice";
import SearchBar from "../components/SearchBar";
import HamburgerMenu from "../components/button/HamburgerMenu";
import {
	UserIcon,
	LockClosedIcon,
	ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/outline";

export default function Header({ onMenuClick, sidebarOpen }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { isLogin, user, accessToken, roles } = useSelector(
		(state) => state.auth
	);
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
				<div></div>
				<SearchBar />
				<div className="flex gap-2 items-center">
					{/* <p className="hidden md:block text-[15px] text-white font-medium">
						Languages
					</p>
					<img
						className="hidden md:block"
						src="/icons/languages.svg"
						alt="Languages"
					/> */}
					{isLogin && user ? (
						<div className="relative flex">
							<button
								className="ms-4 cursor-pointer self-center"
								onClick={() => setShowDropdown(!showDropdown)}
							>
								<img
									src={
										user.profileImage ||
										"https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png"
									}
									alt="Profile Image"
									className={`w-12 h-12 rounded-full object-cover border-5  hover:scale-105 transition-transform duration-200 ${
										roles === "ROLE_ARTIST"
											? "border-[#3BC8E7]/40"
											: "border-[#6C757D]/40"
									}`}
								/>
							</button>
							{showDropdown && (
								<div className="absolute w-[250px] right-1 top-14 p-2 bg-black rounded-md">
									<Link to="/profile">
										<button
											className="w-full flex gap-3 rounded-md text-start text-white px-4 py-2 cursor-pointer hover:bg-gray-700"
											onClick={() => setShowDropdown(false)}
										>
											<UserIcon className="w-5 h-5 text-white" />
											<p>Profile</p>
										</button>
									</Link>
									<button
										className="w-full flex gap-3 rounded-md text-start text-white px-4 py-2 cursor-pointer hover:bg-gray-700"
										onClick={() => {
											setShowDropdown(false);
											dispatch(openModal({ modalName: "CHANGE_PASS_MODAL" }));
										}}
									>
										<LockClosedIcon className="w-5 h-5 text-white" />
										<p>Change Password</p>
									</button>
									<button
										className="w-full flex gap-3 rounded-b-md text-start border-t border-gray-700 text-white px-4 py-2 cursor-pointer hover:bg-gray-700"
										onClick={handleLogout}
									>
										<ArrowLeftStartOnRectangleIcon className="w-5 h-5 text-white" />
										<p>Logout</p>
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
								<span className="hidden py-0.5 text-sm font-medium text-white md:!inline">
									Sign Up
								</span>
							</button>
							<button
								className="flex h-7 w-7 items-center justify-center rounded-full bg-[#3BC8E7] md:h-auto md:w-auto md:rounded-full md:px-6 md:py-1 transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,200,231,0.7)] cursor-pointer"
								onClick={() =>
									dispatch(openModal({ modalName: "LOGIN_MODAL" }))
								}
							>
								<img className="md:hidden" src="/icons/login.svg" alt="Login" />
								<span className="hidden py-0.5 text-sm font-medium text-white md:!inline">
									Sign In
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
