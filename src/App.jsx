import { useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import Sidebar from "./components/SideBar";
import AuthModal from "./components/AuthModal";
import Player from "./components/Player";

function App() {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [authModalOpen, setAuthModalOpen] = useState(false);
	const [authType, setAuthType] = useState("login");

	const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

	const handleAuthClick = (type) => {
		setAuthType(type);
		setAuthModalOpen(true);
	};

	const handleAuthSwitch = (newType) => {
		setAuthType(newType);
	};

	return (
		<>
			<Sidebar isOpen={sidebarOpen} handleClick={toggleSidebar} />

			<Header
				onMenuClick={toggleSidebar}
				sidebarOpen={sidebarOpen}
				onAuthClick={handleAuthClick}
			/>
			<main className="lg:px-8 pb-20">
				<Outlet />
			</main>
			<Footer />
			<Player />

			<AuthModal
				isOpen={authModalOpen}
				onClose={() => setAuthModalOpen(false)}
				type={authType}
				toggleType={handleAuthSwitch}
			/>
		</>
	);
}

export default App;
