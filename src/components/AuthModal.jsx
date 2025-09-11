export default function AuthModal({
	isOpen,
	onClose,
	type = "login",
	toggleType,
}) {
	if (!isOpen) return null;

	const handleToggleType = () => {
		toggleType(type === "login" ? "register" : "login");
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(`${type} form submitted`);
	};

	return (
		<div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
			<div className="bg-[#3BC8E7] rounded-2xl shadow-xl max-w-sm w-full p-6 relative">
				<button
					onClick={onClose}
					className="absolute top-3 right-6 text-white hover:text-gray-200 text-4xl font-light cursor-pointer"
				>
					×
				</button>

				<h2 className="text-white text-2xl font-bold mb-8 text-center">
					{type === "login" ? "Login" : "Register"}
				</h2>

				<form onSubmit={handleSubmit} className="space-y-4">
					{type === "register" && (
						<div className="relative">
							<input
								type="text"
								placeholder="Enter Your Name"
								className="w-full px-4 py-3 rounded-lg bg-white text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
								required
							/>
							<img
								className="absolute right-3 top-1/2 transform -translate-y-1/2"
								src="/icons/user.svg"
								alt="Enter your name"
							/>
						</div>
					)}

					<div className="relative">
						<input
							type="email"
							placeholder="Enter Your Email"
							className="w-full px-4 py-3 rounded-lg bg-white text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
							required
						/>
						<img
							className="absolute right-3 top-1/2 transform -translate-y-1/2"
							src="/icons/email.svg"
							alt="Enter your email"
						/>
					</div>

					<div className="relative">
						<input
							type="password"
							placeholder="Enter Password"
							className="w-full px-4 py-3 rounded-lg bg-white text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
							required
						/>
						<img
							className="absolute right-3 top-1/2 transform -translate-y-1/2"
							src="/icons/password.svg"
							alt="Enter your password"
						/>
					</div>

					{type === "register" && (
						<div className="relative">
							<input
								type="password"
								placeholder="Confirm Password"
								className="w-full px-4 py-3 rounded-lg bg-white text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
								required
							/>
							<img
								className="absolute right-3 top-1/2 transform -translate-y-1/2"
								src="/icons/password.svg"
								alt="Confirm password"
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
						className="w-full bg-white text-[#3BC8E7] py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200 mt-6"
					>
						{type === "login" ? "Login" : "Register"}
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
