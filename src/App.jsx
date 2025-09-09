import { useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import Sidebar from "./components/Sidebar";

function App() {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

	return (
		<>
			<Sidebar isOpen={sidebarOpen} handleClick={toggleSidebar} />

			<Header onMenuClick={toggleSidebar} sidebarOpen={sidebarOpen} />
			<main className="lg:px-8">
				<Outlet />
			</main>
			<Footer />
		</>
	);
}

export default App;
