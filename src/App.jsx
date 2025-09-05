import { useState } from "react";

import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import Sidebar from "./components/Sidebar";
import Homepage from "./pages/Homepage";

function App() {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

	return (
		<>
			<Sidebar isOpen={sidebarOpen} handleClick={toggleSidebar} />

			<Header onMenuClick={toggleSidebar} sidebarOpen={sidebarOpen} />
			<main className="lg:px-8">
				<Homepage />
			</main>
			<Footer />
		</>
	);
}

export default App;
