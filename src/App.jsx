import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import { authService } from "./services/auth";
import { useDispatch } from "react-redux";
import { setAccessToken, setUser } from "./redux/authSlice";
import Player from "./components/Player";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import Sidebar from "./components/SideBar";
import ScrollToTop from "./components/util/ScrollToTop";
import ModalManager from "./components/modal/ModalManager";

function App() {
	const dispatch = useDispatch();
	const [sidebarOpen, setSidebarOpen] = useState(false);

	useEffect(() => {
		const fetchMe = async () => {
			try {
				const response = await authService.getMe();

				if (response.success && response.data) {
					dispatch(setUser({ user: response.data }));
				}
			} catch {
				dispatch(setAccessToken(null));
			}
		};

		fetchMe();
	}, []);

	const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

	return (
		<>
			<Sidebar isOpen={sidebarOpen} handleClick={toggleSidebar} />

			<div
				className={`transition-all duration-300 ${
					sidebarOpen ? "lg:ml-48" : "lg:ml-16"
				}`}
			>
				<Header onMenuClick={toggleSidebar} sidebarOpen={sidebarOpen} />
				<main>
					<Outlet />
					<ScrollToTop />
				</main>
				<Footer />
			</div>

			<Player />
			<ModalManager />
		</>
	);
}

export default App;
