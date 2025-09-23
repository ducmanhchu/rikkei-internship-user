import { useState } from "react";
import { useDispatch } from "react-redux";

import { openModal, closeModal } from "../../redux/modalSlice";
import { login } from "../../redux/authSlice";
import { authService } from "../../services/auth";

export default function LoginModal() {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [message, setMessage] = useState("");
	const [loginData, setLoginData] = useState({
		email: "",
		password: "",
	});

	const handleChange = (e) => {
		setLoginData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
		setError("");
	};

	const validate = () => {
		if (!loginData.email.trim()) {
			setError("Email is required");
			return false;
		}

		if (!/\S+@\S+\.\S+/.test(loginData.email)) {
			setError("Please enter a valid email");
			return false;
		}

		if (!loginData.password) {
			setError("Password is required");
			return false;
		}

		if (loginData.password.length < 6) {
			setError("Password must be at least 6 characters");
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
			const loginRes = await authService.login(
				loginData.email,
				loginData.password
			);
			setMessage("Login successful!");

			if (loginRes.success) {
				dispatch(
					login({
						user: loginRes.data.user,
						accessToken: loginRes.data.accessToken,
					})
				);
				dispatch(closeModal());
				setLoginData({ email: "", password: "" });
			}
		} catch (err) {
			setError(err.message || "An error occurred during login");
		} finally {
			setMessage("");
			setLoading(false);
		}
	};

	const handleRegisterClick = () => {
		dispatch(closeModal());
		dispatch(openModal({ modalName: "REGISTER_MODAL" }));
	};

	return (
		<div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center overflow-auto p-4">
			<div className="bg-[#3BC8E7] rounded-2xl shadow-xl max-w-sm w-full p-6 relative">
				<button
					onClick={() => dispatch(closeModal())}
					className="absolute top-3 right-6 text-white hover:text-gray-200 text-4xl font-light cursor-pointer"
				>
					×
				</button>

				<h2 className="text-white text-2xl font-bold mb-8 text-center">
					Login
				</h2>

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
						<input
							type="email"
							name="email"
							placeholder="Enter Your Email"
							value={loginData.email}
							onChange={handleChange}
							className="w-full ps-4 pr-12 py-3 rounded-lg bg-white text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
							required
						/>
						<img
							className="absolute right-3 top-1/2 transform -translate-y-1/2"
							src="/icons/email.svg"
							alt="email"
						/>
					</div>

					<div className="relative">
						<input
							type="password"
							name="password"
							placeholder="Enter Password"
							value={loginData.password}
							onChange={handleChange}
							className="w-full ps-4 pr-12 py-3 rounded-lg bg-white text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
							required
						/>
						<img
							className="absolute right-3 top-1/2 transform -translate-y-1/2"
							src="/icons/password.svg"
							alt="password"
						/>
					</div>

					<div className="flex items-center justify-between text-white text-sm">
						<label className="flex items-center cursor-pointer">
							<input type="checkbox" className="mr-2 rounded" />
							<span>Keep Me Signed In</span>
						</label>
						<button type="button" className="cursor-pointer hover:underline">
							Forgot Password?
						</button>
					</div>

					<button
						type="submit"
						disabled={loading}
						className="w-full bg-white text-[#3BC8E7] py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{loading ? "Processing..." : "Login"}
					</button>
				</form>

				<div className="flex gap-2 mt-6 text-white justify-center">
					<p className="">Don&apos;t Have An Account?</p>
					<button
						className="font-semibold cursor-pointer hover:underline"
						onClick={handleRegisterClick}
					>
						Register Here
					</button>
				</div>
			</div>
		</div>
	);
}
