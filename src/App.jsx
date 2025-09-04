import { useState } from "react";

import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import Sidebar from "./components/Sidebar";
import Homepage from "./pages/Homepage";

function App() {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
	const closeSidebar = () => setSidebarOpen(false);

	return (
		<>
			<Sidebar isOpen={sidebarOpen} handleClick={toggleSidebar} />

			<Header onMenuClick={toggleSidebar} sidebarOpen={sidebarOpen} />
			<main>
				<Homepage />
			</main>
			<Footer />
		</>
	);
}

export default App;
