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
	const [showPass, setShowPass] = useState(false);

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
						roles: loginRes.data.roles,
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
			<div className="bg-[#6C757D] rounded-2xl shadow-xl max-w-sm w-full p-6 relative">
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
					Sign In
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
							value={loginData.email}
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

					<div className="relative">
						<label
							htmlFor="password"
							className="text-white font-normal text-sm mb-2"
						>
							Password
						</label>
						<input
							id="password"
							type={showPass ? "text" : "password"}
							name="password"
							placeholder="Enter your password"
							value={loginData.password}
							onChange={handleChange}
							className="w-full ps-4 pr-12 py-3 rounded-md bg-white text-black placeholder:font-light placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3BC8E7]"
							required
						/>
						<button
							type="button"
							className="absolute right-3 top-2/3 transform -translate-y-1/2 cursor-pointer"
							onClick={() => setShowPass(!showPass)}
						>
							{!showPass ? (
								<svg
									className="w-5.5 h-5.5"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M3.17163 5.12988L21.1716 19.1299"
										stroke="#808080"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M14.3653 13.8456C13.8162 14.5483 12.9609 15 12 15C10.3431 15 9 13.6569 9 12C9 11.3256 9.22253 10.7032 9.59817 10.2021"
										stroke="#808080"
										strokeWidth="2"
									/>
									<path
										d="M9 5.62667C11.5803 4.45322 14.7268 4.92775 16.8493 7.05025L19.8511 10.052C20.3477 10.5486 20.5959 10.7969 20.7362 11.0605C21.0487 11.6479 21.0487 12.3521 20.7362 12.9395C20.5959 13.2031 20.3477 13.4514 19.8511 13.948V13.948L19.799 14"
										stroke="#808080"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M7.01596 8.39827C7.40649 8.00774 7.40649 7.37458 7.01596 6.98406C6.62544 6.59353 5.99228 6.59353 5.60175 6.98406L7.01596 8.39827ZM7.65685 16.2427L5.53553 14.1213L4.12132 15.5356L6.24264 17.6569L7.65685 16.2427ZM16.1421 16.2427C13.799 18.5858 10 18.5858 7.65685 16.2427L6.24264 17.6569C9.36684 20.7811 14.4322 20.7811 17.5563 17.6569L16.1421 16.2427ZM5.53553 9.8787L7.01596 8.39827L5.60175 6.98406L4.12132 8.46449L5.53553 9.8787ZM16.7465 15.6383L16.1421 16.2427L17.5563 17.6569L18.1607 17.0526L16.7465 15.6383ZM5.53553 14.1213C4.84888 13.4347 4.40652 12.9893 4.12345 12.6183C3.85798 12.2704 3.82843 12.1077 3.82843 12L1.82843 12C1.82843 12.7208 2.1322 13.3056 2.53341 13.8315C2.917 14.3342 3.47464 14.8889 4.12132 15.5356L5.53553 14.1213ZM4.12132 8.46449C3.47464 9.11116 2.917 9.6658 2.53341 10.1686C2.1322 10.6944 1.82843 11.2792 1.82843 12H3.82843C3.82843 11.8924 3.85798 11.7297 4.12345 11.3817C4.40652 11.0107 4.84888 10.5654 5.53553 9.8787L4.12132 8.46449Z"
										fill="#808080"
									/>
								</svg>
							) : (
								<svg
									className="w-5.5 h-5.5"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										opacity="0.1"
										fillRule="evenodd"
										clipRule="evenodd"
										d="M16.8494 7.05025C14.1158 4.31658 9.6836 4.31658 6.94993 7.05025L4.82861 9.17157C3.49528 10.5049 2.82861 11.1716 2.82861 12C2.82861 12.8284 3.49528 13.4951 4.82861 14.8284L6.94993 16.9497C9.6836 19.6834 14.1158 19.6834 16.8494 16.9497L18.9707 14.8284C20.3041 13.4951 20.9707 12.8284 20.9707 12C20.9707 11.1716 20.3041 10.5049 18.9707 9.17157L16.8494 7.05025ZM12.0002 8.75C10.2053 8.75 8.75019 10.2051 8.75019 12C8.75019 13.7949 10.2053 15.25 12.0002 15.25C13.7951 15.25 15.2502 13.7949 15.2502 12C15.2502 10.2051 13.7951 8.75 12.0002 8.75Z"
										fill="#808080"
									/>
									<path
										d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
										stroke="#808080"
										strokeWidth="2"
									/>
									<path
										d="M6.94975 7.05025C9.68342 4.31658 14.1156 4.31658 16.8492 7.05025L18.9706 9.17157C20.3039 10.5049 20.9706 11.1716 20.9706 12C20.9706 12.8284 20.3039 13.4951 18.9706 14.8284L16.8492 16.9497C14.1156 19.6834 9.68342 19.6834 6.94975 16.9497L4.82843 14.8284C3.49509 13.4951 2.82843 12.8284 2.82843 12C2.82843 11.1716 3.49509 10.5049 4.82843 9.17157L6.94975 7.05025Z"
										stroke="#808080"
										strokeWidth="2"
										strokeLinejoin="round"
									/>
								</svg>
							)}
						</button>
					</div>

					<div className="flex items-center justify-between text-white text-sm">
						<label className="flex items-center cursor-pointer">
							<input type="checkbox" className="mr-2 rounded" />
							<span className="font-light">Keep Me Signed In</span>
						</label>
						<button
							type="button"
							className="cursor-pointer font-light hover:underline"
						>
							Forgot Password?
						</button>
					</div>

					<button
						type="submit"
						disabled={loading}
						className="w-full cursor-pointer bg-[#3BC8E7] text-base text-black py-3 rounded-full font-semibold hover:bg-[#099bbc] transition-colors duration-200 mt-3 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{loading ? "Processing..." : "Sign in"}
					</button>
				</form>

				<div className="flex gap-2 mt-4 text-white font-light justify-center">
					<p className="text-sm">Don&apos;t Have An Account?</p>
					<button
						className="text-sm font-normal cursor-pointer hover:underline"
						onClick={handleRegisterClick}
					>
						Sign up here
					</button>
				</div>
			</div>
		</div>
	);
}
