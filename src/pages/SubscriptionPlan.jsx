import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { StarIcon, MusicalNoteIcon } from "@heroicons/react/24/outline";
import { toast } from "react-hot-toast";

import { subscriptionService } from "../services/subscription";
import { setSubscription } from "../redux/authSlice";
import { formatCurrency } from "../utils";

export default function SubscriptionPlan() {
	const dispatch = useDispatch();
	const { isLogin, user, subscription } = useSelector((state) => state.auth);
	const [plans, setPlans] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [params] = useSearchParams();
	const apptransid = params.get("apptransid");

	useEffect(() => {
		const fetchPlans = async () => {
			try {
				setLoading(true);
				const response = await subscriptionService.getSubscriptionPlans();
				if (response.success) {
					setPlans(response.data.sort((a, b) => a.price - b.price));
				}
			} catch (error) {
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};
		fetchPlans();
	}, [subscription]);

	useEffect(() => {
		if (!apptransid) return;
		(async () => {
			const toastId = toast.loading("Checking payment status...");
			try {
				const res = await subscriptionService.getZaloPayOrderStatus(apptransid);
				if (res?.data?.returncode === 1) {
					const response = await subscriptionService.getCurrentPlan();
					if (response.success) {
						if (response?.data?.plan?.planName === "Artist Plan") {
							dispatch(
								setSubscription({
									id: response.data.id,
									name: "Artist Plan",
									price: response.data.plan.price,
									startTime: response.data.startTime,
									endTime: response.data.endTime,
								})
							);
						} else if (response?.data?.plan?.planName === "Premium Plan") {
							dispatch(
								setSubscription({
									id: response.data.id,
									name: "Premium Plan",
									price: response.data.plan.price,
									startTime: response.data.startTime,
									endTime: response.data.endTime,
								})
							);
						} else {
							dispatch(setSubscription("Miraculous Free"));
						}
						toast.success("Payment successful", { id: toastId });
					}
				} else {
					toast.error("Payment failed", { id: toastId });
				}
			} catch (e) {
				toast.error(e.message, { id: toastId });
			}
		})();
	}, [apptransid]);

	const handleChoosePlan = async (planId) => {
		try {
			const res = await subscriptionService.createZaloPayOrder({
				userId: user?.id,
				planId,
			});

			const orderUrl =
				res?.data?.orderurl || res?.data?.order_url || res?.data?.orderUrl;
			if (orderUrl) {
				window.location.href = orderUrl;
				return;
			}

			const deeplink = res?.data?.deeplink;
			if (deeplink) {
				window.location.href = deeplink;
				return;
			}
			throw new Error("Unable to get payment URL from ZaloPay response");
		} catch (e) {
			setError(e.message || "Failed to create payment order");
		}
	};

	return (
		<div className="px-12 py-6 min-h-screen">
			<h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-white py-8 px-[12vw]">
				Experience Miraculous to the fullest by exploring all its features.
			</h1>
			<p className="text-gray-300 mb-8 text-center">
				Pick the plan that fits you best. You can upgrade anytime.
			</p>

			{loading && (
				<div className="text-gray-400">Loading subscription plans...</div>
			)}
			{!loading && error && <div className="text-red-400 mb-4">{error}</div>}

			<div className="flex flex-col gap-4 md:flex-row justify-center">
				{plans.map((plan) => (
					<div
						key={plan.id}
						className="w-1/3 rounded-xl bg-[#1B2039] border border-[#2A2F4A] p-6 text-white hover:border-[#3BC8E7] transition-colors"
					>
						<div className="flex gap-3">
							{plan.planName === "Artist Plan" && (
								<MusicalNoteIcon className="size-6 text-[#3BC8E7]" />
							)}
							{plan.planName === "Premium Plan" && (
								<StarIcon className="size-6 text-[#3BC8E7]" />
							)}
							<h2 className="text-2xl font-semibold mb-2">{plan.planName}</h2>
						</div>
						<p className="text-gray-300 mb-4 text-sm">Monthly Package</p>
						<ul className="space-y-2 mb-6 min-h-[80px]">
							<li className="flex items-start gap-2 text-gray-200">
								<span className="mt-1 inline-block h-2 w-2 rounded-full bg-[#3BC8E7]"></span>
								<span>Enjoy ad-free music without restrictions.</span>
							</li>
							{plan.planName === "Artist Plan" && (
								<li className="flex items-start gap-2 pe-6 text-gray-200">
									<span className="mt-1 inline-block h-2 w-2 rounded-full bg-[#3BC8E7]"></span>
									<span>
										Create albums, add new music, and manage your own music.
									</span>
								</li>
							)}
						</ul>
						<p className="text-white mb-4 text-xl">
							{formatCurrency(plan.price)}/month
						</p>
						<button
							disabled={!isLogin || subscription?.name === plan.planName}
							className={`w-full rounded-full cursor-pointer px-4 py-2 font-semibold transition-colors ${
								isLogin && subscription?.name === plan.planName
									? "bg-gray-600 text-gray-300 cursor-not-allowed"
									: isLogin
									? "bg-[#3BC8E7] text-black hover:bg-[#71b9c9]"
									: "bg-gray-600 text-gray-300 cursor-not-allowed"
							}`}
							onClick={() => handleChoosePlan(plan.id)}
						>
							{isLogin
								? subscription?.name === plan.planName
									? "Current Plan"
									: "Choose Plan"
								: "Sign in to choose"}
						</button>
					</div>
				))}
			</div>
		</div>
	);
}
