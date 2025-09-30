import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
	StarIcon,
	MusicalNoteIcon,
	CheckIcon,
} from "@heroicons/react/24/outline";
import { toast } from "react-hot-toast";

import { formatDate, formatCurrency } from "../utils";
import { subscriptionService } from "../services/subscription";
import { setSubscription } from "../redux/authSlice";

export default function ManageSubscription() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { subscription } = useSelector((state) => state.auth);

	const handleCancelSubscription = async () => {
		const toastId = toast.loading("Cancelling subscription...");
		try {
			const res = await subscriptionService.cancelSubscription(subscription.id);
			if (res.success) {
				dispatch(setSubscription("Miraculous Free"));
				toast.success("Subscription cancelled successfully", { id: toastId });
			}
		} catch (error) {
			toast.error(error.message, { id: toastId });
		}
	};

	return (
		<div className="px-16 py-6 min-h-screen">
			<h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-start text-white py-8">
				Manage Your Subscription
			</h1>
			{subscription === "Miraculous Free" && (
				<div className="w-1/2 shadow-2xl rounded-lg bg-gray-800 overflow-hidden">
					<div className="bg-gray-300 px-6 py-8">
						<h2 className="text-black text-2xl font-bold text-left">
							Miraculous Free
						</h2>
					</div>

					<div className="bg-gray-800 px-6 py-6">
						<button
							className="w-full cursor-pointer bg-gray-700 text-white font-medium py-3 px-4 rounded-full border border-gray-500 transition-transform duration-200 hover:scale-102"
							onClick={() => navigate("/subscription-plan")}
						>
							Join Premium
						</button>
					</div>
				</div>
			)}
			{subscription && subscription.name && (
				<div className="min-w-1/2 rounded-md flex">
					<div className="w-1/2 shadow-2xl rounded-lg bg-gray-800 overflow-hidden">
						<div className="bg-[#3BC8E7] px-6 py-8">
							<div className="flex items-center gap-2 mb-2">
								{subscription?.name === "Artist Plan" && (
									<MusicalNoteIcon className="size-6 text-black" />
								)}
								{subscription?.name === "Premium Plan" && (
									<StarIcon className="size-6 text-black" />
								)}
								<h2 className="text-black text-2xl font-bold text-left">
									{subscription?.name}
								</h2>
							</div>
							<p className="text-black text-base">
								Price: {formatCurrency(subscription?.price)}/month
							</p>
							<p className="text-black text-base">
								Start Date: {formatDate(subscription?.startTime)}
							</p>
							<p className="text-black text-base">
								End Date: {formatDate(subscription?.endTime)}
							</p>
						</div>

						<div className="bg-gray-800 px-6 py-6">
							<div className="flex items-center gap-2">
								<CheckIcon className="size-6 text-green-500" />
								<p className="text-white text-sm">
									Enjoy ad-free music without restrictions.
								</p>
							</div>
							{subscription?.name === "Artist Plan" && (
								<div className="flex items-center gap-2">
									<CheckIcon className="size-6 text-green-500" />
									<p className="text-white text-sm">
										Create albums, add new music, and manage your own music.
									</p>
								</div>
							)}
							<button
								className="w-full cursor-pointer bg-gray-700 text-red-400 font-medium mt-6 py-3 px-4 rounded-full border border-red-400 transition-transform duration-200 hover:scale-102"
								onClick={handleCancelSubscription}
							>
								Cancel Subscription
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
