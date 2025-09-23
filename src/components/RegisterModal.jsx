import { useState } from "react";
import { useDispatch } from "react-redux";

import { openModal, closeModal } from "../redux/modalSlice";
import { authService } from "../services/auth";

export default function RegisterModal() {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [message, setMessage] = useState("");
	const [registerData, setRegisterData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const handleChange = (e) => {
		setRegisterData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
		setError("");
	};

	const validate = () => {
		if (!registerData.email.trim()) {
			setError("Email is required");
			return false;
		}

		if (!/\S+@\S+\.\S+/.test(registerData.email)) {
			setError("Please enter a valid email");
			return false;
		}

		if (!registerData.password) {
			setError("Password is required");
			return false;
		}

		if (registerData.password.length < 6) {
			setError("Password must be at least 6 characters");
			return false;
		}

		if (!registerData.firstName.trim()) {
			setError("First name is required");
			return false;
		}

		if (!registerData.lastName.trim()) {
			setError("Last name is required");
			return false;
		}

		if (registerData.password !== registerData.confirmPassword) {
			setError("Passwords do not match");
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
			const registerRes = await authService.register(
				registerData.firstName,
				registerData.lastName,
				registerData.email,
				registerData.password
			);
			setMessage(registerRes.message || "Registration successful!");

			if (registerRes.success) {
				dispatch(closeModal());
				dispatch(
					openModal({
						modalName: "OTP_MODAL",
						modalData: { email: registerData.email },
					})
				);
				setRegisterData({
					firstName: "",
					lastName: "",
					email: "",
					password: "",
					confirmPassword: "",
				});
			}
		} catch (err) {
			setError(err.message || "An error occurred during registration");
		} finally {
			setMessage("");
			setLoading(false);
		}
	};

	const handleLoginClick = () => {
		dispatch(closeModal());
		dispatch(openModal({ modalName: "LOGIN_MODAL" }));
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
					Register
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
					<>
						<div className="relative">
							<input
								type="text"
								name="firstName"
								placeholder="Enter Your First Name"
								value={registerData.firstName}
								onChange={handleChange}
								className="w-full ps-4 pr-12 py-3 rounded-lg bg-white text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
								required
							/>
							<img
								className="absolute right-3 top-1/2 transform -translate-y-1/2"
								src="/icons/user.svg"
								alt="user"
							/>
						</div>

						<div className="relative">
							<input
								type="text"
								name="lastName"
								placeholder="Enter Your Last Name"
								value={registerData.lastName}
								onChange={handleChange}
								className="w-full ps-4 pr-12 py-3 rounded-lg bg-white text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
								required
							/>
							<img
								className="absolute right-3 top-1/2 transform -translate-y-1/2"
								src="/icons/user.svg"
								alt="user"
							/>
						</div>
					</>

					<div className="relative">
						<input
							type="email"
							name="email"
							placeholder="Enter Your Email"
							value={registerData.email}
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
							value={registerData.password}
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

					<div className="relative">
						<input
							type="password"
							name="confirmPassword"
							placeholder="Confirm Password"
							value={registerData.confirmPassword}
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

					<button
						type="submit"
						disabled={loading}
						className="w-full bg-white text-[#3BC8E7] py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{loading ? "Processing..." : "Register"}
					</button>
				</form>

				<div className="flex gap-2 justify-center text-white mt-6">
					<p className="">Already Have An Account?</p>
					<button
						className="font-semibold cursor-pointer hover:underline"
						onClick={handleLoginClick}
					>
						Login here
					</button>
				</div>
			</div>
		</div>
	);
}
