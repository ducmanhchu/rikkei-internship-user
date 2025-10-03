import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import { authService } from "./services/auth";
import { setAccessToken, setUser, setSubscription } from "./redux/authSlice";
import { subscriptionService } from "./services/subscription";
import Player from "./components/Player";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import Sidebar from "./components/SideBar";
import ScrollToTop from "./components/util/ScrollToTop";
import ModalManager from "./components/modal/ModalManager";

function App() {
	const dispatch = useDispatch();
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const { isLogin } = useSelector((state) => state.auth);

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

	useEffect(() => {
		const fetchSubscription = async () => {
			const subscriptionResponse = await subscriptionService.getCurrentPlan();
			if (subscriptionResponse.success) {
				if (subscriptionResponse?.data?.plan.planName === "Artist Plan") {
					dispatch(
						setSubscription({
							id: subscriptionResponse.data.id,
							name: "Artist Plan",
							price: subscriptionResponse.data.plan.price,
							startTime: subscriptionResponse.data.startTime,
							endTime: subscriptionResponse.data.endTime,
						})
					);
				} else if (
					subscriptionResponse?.data?.plan.planName === "Premium Plan"
				) {
					dispatch(
						setSubscription({
							id: subscriptionResponse.data.id,
							name: "Premium Plan",
							price: subscriptionResponse.data.plan.price,
							startTime: subscriptionResponse.data.startTime,
							endTime: subscriptionResponse.data.endTime,
						})
					);
				} else {
					dispatch(setSubscription("Miraculous Free"));
				}
			}
		};
		if (isLogin) fetchSubscription();
	}, [isLogin]);

	const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

	return (
		<>
			<Toaster position="bottom-center" reverseOrder={true} />
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
