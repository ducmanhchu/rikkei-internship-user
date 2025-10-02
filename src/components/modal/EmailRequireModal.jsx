import { useState } from "react";
import { useDispatch } from "react-redux";

import { openModal, closeModal } from "../../redux/modalSlice";
import { authService } from "../../services/auth";

export default function EmailRequireModal() {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [message, setMessage] = useState("");
	const [email, setEmail] = useState("");

	const handleChange = (e) => {
		setEmail(e.target.value);
		setError("");
	};

	const validate = () => {
		if (!email.trim()) {
			setError("Email is required");
			return false;
		}

		if (!/\S+@\S+\.\S+/.test(email)) {
			setError("Please enter a valid email");
			return false;
		}

		return true;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validate()) return;

		setLoading(true);
		setMessage("");
		setError("");

		try {
			await authService.forgotPassword(email);
			setMessage("OTP has been sent to your email!");

			setTimeout(() => {
				dispatch(closeModal());
				dispatch(
					openModal({
						modalName: "OTP_MODAL",
						modalData: { email, type: "resetPassword" },
					})
				);
			}, 1500);
		} catch (err) {
			setError(err.message || "Failed to send OTP");
		} finally {
			setLoading(false);
		}
	};

	const handleBackToLogin = () => {
		dispatch(closeModal());
		dispatch(openModal({ modalName: "LOGIN_MODAL" }));
	};

	return (
		<div className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center overflow-auto p-4">
			<div className="bg-linear-to-b from-black to-gray-800 rounded-2xl shadow-xl max-w-sm w-full p-6 relative">
				<button
					onClick={() => dispatch(closeModal())}
					className="absolute top-7 right-6 text-white hover:text-gray-200 text-4xl font-light cursor-pointer"
				>
					<svg
						className="w-5 h-5"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z"
							fill="#ffffff"
						/>
					</svg>
				</button>

				<h2 className="text-white text-2xl font-bold mb-2 text-center">
					Reset Password
				</h2>

				<p className="text-white text-sm text-center mb-6">
					Enter your email address and we&apos;ll send you a code to reset your
					password
				</p>

				{message && (
					<div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-sm">
						{message}
					</div>
				)}

				{error && (
					<div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
						{error}
					</div>
				)}

				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="relative">
						<label
							htmlFor="email"
							className="text-white font-normal text-sm mb-2"
						>
							Email
						</label>
						<input
							type="email"
							name="email"
							placeholder="Enter your email"
							value={email}
							onChange={handleChange}
							className="w-full ps-4 pr-12 py-3 rounded-md bg-white text-black placeholder:font-light placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3BC8E7]"
							required
						/>
						<img
							className="absolute right-3 top-2/3 transform -translate-y-1/2"
							src="/icons/email.svg"
							alt="email"
						/>
					</div>

					<button
						type="submit"
						disabled={loading}
						className="w-full cursor-pointer bg-[#3BC8E7] text-base text-black py-3 rounded-full font-semibold hover:bg-[#099bbc] transition-colors duration-200 mt-3 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{loading ? "Sending..." : "Send Reset Code"}
					</button>
				</form>

				<div className="flex gap-2 mt-4 text-white font-light justify-center">
					<p className="text-sm">Remember your password?</p>
					<button
						className="text-sm font-normal cursor-pointer hover:underline"
						onClick={handleBackToLogin}
					>
						Sign in
					</button>
				</div>
			</div>
		</div>
	);
}
