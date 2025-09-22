import { useState } from "react";
import { authService } from "../services/auth";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import OTPModal from "./OTPModal";

export default function AuthModal({
	isOpen,
	onClose,
	type = "login",
	toggleType,
}) {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [message, setMessage] = useState("");
	const [showOTPModal, setShowOTPModal] = useState(false);

	if (!isOpen) return null;

	const handleToggleType = () => {
		toggleType(type === "login" ? "register" : "login");
		setFormData({
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			confirmPassword: "",
		});
		setError("");
		setMessage("");
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
		setError("");
	};

	const handleClose = () => {
		setError("");
		setMessage("");
		setFormData({
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			confirmPassword: "",
		});
		onClose();
	};

	const validateForm = () => {
		if (!formData.email.trim()) {
			setError("Email is required");
			return false;
		}

		if (!/\S+@\S+\.\S+/.test(formData.email)) {
			setError("Please enter a valid email");
			return false;
		}

		if (!formData.password) {
			setError("Password is required");
			return false;
		}

		if (formData.password.length < 6) {
			setError("Password must be at least 6 characters");
			return false;
		}

		if (type === "register") {
			if (!formData.firstName.trim()) {
				setError("First name is required");
				return false;
			}

			if (!formData.lastName.trim()) {
				setError("Last name is required");
				return false;
			}

			if (formData.password !== formData.confirmPassword) {
				setError("Passwords do not match");
				return false;
			}
		}

		return true;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		setLoading(true);
		setError("");

		try {
			if (type === "login") {
				const result = await authService.login(
					formData.email,
					formData.password
				);

				setMessage("Login successful!");
				if (result.success) {
					dispatch(
						login({
							user: result.data.user,
							accessToken: result.data.accessToken,
						})
					);
				}

				if (!loading) {
					onClose();
					setMessage("");
					setFormData({
						email: "",
						password: "",
					});
				}
			} else {
				const result = await authService.register(
					formData.firstName,
					formData.lastName,
					formData.email,
					formData.password
				);

				setMessage(result.message);

				setTimeout(() => {
					setShowOTPModal(true);
				}, 1500);
			}
		} catch (error) {
			setError(error.message);
			console.error("Auth error:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleOTPSuccess = () => {
		setShowOTPModal(false);
		setMessage("Account verified successfully!");
		setFormData({
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			confirmPassword: "",
		});

		toggleType("login");
		setMessage("");
	};

	if (showOTPModal) {
		return (
			<OTPModal
				isOpen={showOTPModal}
				onClose={() => setShowOTPModal(false)}
				email={formData.email}
				onSuccess={handleOTPSuccess}
			/>
		);
	}

	return (
		<div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center overflow-auto p-4">
			<div className="bg-[#3BC8E7] rounded-2xl shadow-xl max-w-sm w-full p-6 relative">
				<button
					onClick={handleClose}
					className="absolute top-3 right-6 text-white hover:text-gray-200 text-4xl font-light cursor-pointer"
				>
					×
				</button>

				<h2 className="text-white text-2xl font-bold mb-8 text-center">
					{type === "login" ? "Login" : "Register"}
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
					{type === "register" && (
						<>
							<div className="relative">
								<input
									type="text"
									name="firstName"
									placeholder="Enter Your First Name"
									value={formData.firstName}
									onChange={handleInputChange}
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
									value={formData.lastName}
									onChange={handleInputChange}
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
					)}

					<div className="relative">
						<input
							type="email"
							name="email"
							placeholder="Enter Your Email"
							value={formData.email}
							onChange={handleInputChange}
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
							value={formData.password}
							onChange={handleInputChange}
							className="w-full ps-4 pr-12 py-3 rounded-lg bg-white text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
							required
						/>
						<img
							className="absolute right-3 top-1/2 transform -translate-y-1/2"
							src="/icons/password.svg"
							alt="password"
						/>
					</div>

					{type === "register" && (
						<div className="relative">
							<input
								type="password"
								name="confirmPassword"
								placeholder="Confirm Password"
								value={formData.confirmPassword}
								onChange={handleInputChange}
								className="w-full ps-4 pr-12 py-3 rounded-lg bg-white text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
								required
							/>
							<img
								className="absolute right-3 top-1/2 transform -translate-y-1/2"
								src="/icons/password.svg"
								alt="password"
							/>
						</div>
					)}

					{type === "login" && (
						<div className="flex items-center justify-between text-white text-sm">
							<label className="flex items-center cursor-pointer">
								<input type="checkbox" className="mr-2 rounded" />
								<span>Keep Me Signed In</span>
							</label>
							<button type="button" className="cursor-pointer hover:underline">
								Forgot Password?
							</button>
						</div>
					)}

					<button
						type="submit"
						disabled={loading}
						className="w-full bg-white text-[#3BC8E7] py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{loading
							? "Processing..."
							: type === "login"
							? "Login"
							: "Register"}
					</button>
				</form>

				<div className="text-center mt-6">
					<p className="text-white">
						{type === "login"
							? "Don't Have An Account? "
							: "Already Have An Account? "}
						<button
							onClick={handleToggleType}
							className="font-semibold cursor-pointer hover:underline"
						>
							{type === "login" ? "Register Here" : "Login Here"}
						</button>
					</p>
				</div>
			</div>
		</div>
	);
}
