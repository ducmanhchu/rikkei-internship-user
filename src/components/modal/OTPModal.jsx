import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";

import { authService } from "../../services/auth";
import { openModal, closeModal } from "../../redux/modalSlice";

export default function OTPModal({ data }) {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [message, setMessage] = useState("");
	const [otp, setOtp] = useState(["", "", "", "", "", ""]);
	const [countdown, setCountdown] = useState(60);
	const inputRefs = useRef([]);

	useEffect(() => {
		if (countdown > 0) {
			const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
			return () => clearTimeout(timer);
		}
	}, [countdown]);

	const handleChange = (index, value) => {
		if (!/^\d*$/.test(value)) return;

		const newOtp = [...otp];
		newOtp[index] = value;
		setOtp(newOtp);
		setError("");

		if (value && index < 5) {
			inputRefs.current[index + 1].focus();
		}
	};

	const handleKeyDown = (index, e) => {
		if (e.key === "Backspace" && !otp[index] && index > 0) {
			inputRefs.current[index - 1].focus();
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const otpCode = otp.join("");
		if (otpCode.length !== 6) {
			setError("Please enter all 6 digits");
			return;
		}

		setLoading(true);
		setMessage("");
		setError("");

		try {
			const result = await authService.verifyOTP(data.email, otpCode);
			setMessage("Verification successful!");

			if (result.success) {
				setTimeout(() => {
					dispatch(closeModal());
					setOtp(["", "", "", "", "", ""]);
					dispatch(openModal({ modalName: "LOGIN_MODAL" }));
				}, 2000);
			}
		} catch (error) {
			setError(error.message || "Invalid OTP code");
		} finally {
			setMessage("");
			setLoading(false);
		}
	};

	const handleResend = async () => {
		setError("");

		try {
			await authService.resendOTP(data.email);
			setMessage("OTP resent successfully!");
			setCountdown(60);
			setOtp(["", "", "", "", "", ""]);
			inputRefs.current[0].focus();
		} catch (error) {
			setError(error.message || "Failed to resend OTP");
		} finally {
			setLoading(false);
		}
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

				<h2 className="text-white text-2xl font-bold mb-4 text-center">
					Enter OTP
				</h2>

				<p className="text-white text-sm text-center mb-6">
					We&apos;ve sent a 6-digit code to
					<br />
					<span className="font-semibold">{data.email}</span>
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

				<form onSubmit={handleSubmit}>
					<div className="flex justify-center space-x-3 mb-6">
						{otp.map((digit, index) => (
							<input
								key={index}
								ref={(el) => (inputRefs.current[index] = el)}
								type="text"
								maxLength="1"
								value={digit}
								onChange={(e) => handleChange(index, e.target.value)}
								onKeyDown={(e) => handleKeyDown(index, e)}
								className="w-12 h-12 text-center text-xl font-bold border-2 border-white rounded-lg bg-white text-gray-700 focus:outline-none focus:border-blue-500"
							/>
						))}
					</div>

					<button
						type="submit"
						disabled={loading}
						className="w-full bg-white text-[#3BC8E7] py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{loading ? "Verifying..." : "Verify OTP"}
					</button>
				</form>

				<div className="text-center mt-4">
					<p className="text-white text-sm">
						Didn&apos;t receive the code?{" "}
						{countdown > 0 ? (
							<span className="font-semibold">Resend in {countdown}s</span>
						) : (
							<button
								onClick={handleResend}
								disabled={loading}
								className="font-semibold cursor-pointer hover:underline disabled:opacity-50"
							>
								Resend OTP
							</button>
						)}
					</p>
				</div>
			</div>
		</div>
	);
}
