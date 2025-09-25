import { useState } from "react";
import { useDispatch } from "react-redux";

import { openModal, closeModal } from "../../redux/modalSlice";
import { authService } from "../../services/auth";

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
			<div className="bg-[#6C757D] rounded-2xl shadow-xl max-w-sm w-full p-6 relative">
				<button
					onClick={() => dispatch(closeModal())}
					className="absolute top-3 right-6 text-white hover:text-gray-200 text-4xl font-light cursor-pointer"
				>
					×
				</button>

				<h2 className="text-white text-2xl font-bold mb-4 text-center">
					Sign Up
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

				<form onSubmit={handleSubmit} className="space-y-3.5">
					<div className="flex gap-2.5">
						<div className="relative">
							<label
								htmlFor="firstName"
								className="text-white font-normal text-sm mb-2"
							>
								First Name
							</label>
							<input
								type="text"
								name="firstName"
								placeholder="Your first name"
								value={registerData.firstName}
								onChange={handleChange}
								className="w-full placeholder:font-light px-4 py-3 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#3BC8E7]"
								required
							/>
						</div>

						<div className="relative">
							<label
								htmlFor="lastName"
								className="text-white font-normal text-sm mb-2"
							>
								Last Name
							</label>
							<input
								type="text"
								name="lastName"
								placeholder="Your last name"
								value={registerData.lastName}
								onChange={handleChange}
								className="w-full placeholder:font-light px-4 py-3 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#3BC8E7]"
								required
							/>
						</div>
					</div>

					<div className="relative">
						<label htmlFor="email" className="text-white font-normal text-sm">
							Email
						</label>
						<input
							type="email"
							name="email"
							placeholder="Enter your email"
							value={registerData.email}
							onChange={handleChange}
							className="w-full ps-4 pr-12 py-3 rounded-lg bg-white text-black placeholder:font-light placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3BC8E7]"
							required
						/>
						<img
							className="absolute right-3 top-2/3 transform -translate-y-1/2"
							src="/icons/email.svg"
							alt="email"
						/>
					</div>

					<div className="relative">
						<label
							htmlFor="password"
							className="text-white font-normal text-sm"
						>
							Password
						</label>
						<input
							type="password"
							name="password"
							placeholder="Enter your password"
							value={registerData.password}
							onChange={handleChange}
							className="w-full ps-4 pr-12 py-3 rounded-lg bg-white text-black placeholder:font-light placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3BC8E7]"
							required
						/>
						<img
							className="absolute right-3 top-2/3 transform -translate-y-1/2"
							src="/icons/password.svg"
							alt="password"
						/>
					</div>

					<div className="relative">
						<label
							htmlFor="confirmPassword"
							className="text-white font-normal text-sm"
						>
							Confirm Password
						</label>
						<input
							type="password"
							name="confirmPassword"
							placeholder="Confirm your password"
							value={registerData.confirmPassword}
							onChange={handleChange}
							className="w-full ps-4 pr-12 py-3 rounded-md bg-white text-black placeholder:font-light placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3BC8E7]"
							required
						/>
						<img
							className="absolute right-3 top-2/3 transform -translate-y-1/2"
							src="/icons/password.svg"
							alt="password"
						/>
					</div>

					<button
						type="submit"
						disabled={loading}
						className="w-full cursor-pointer bg-[#3BC8E7] text-black py-3 rounded-full font-semibold hover:bg-[#099bbc] transition-colors duration-200 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{loading ? "Processing..." : "Sign up"}
					</button>
				</form>

				<div className="flex gap-2 justify-center text-white mt-4">
					<p className="text-sm font-light">Already Have An Account?</p>
					<button
						className="text-sm font-normal cursor-pointer hover:underline"
						onClick={handleLoginClick}
					>
						Sign in here
					</button>
				</div>
			</div>
		</div>
	);
}
