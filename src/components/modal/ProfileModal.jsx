import { useDispatch } from "react-redux";
import { useState, useRef } from "react";

import { closeModal } from "../../redux/modalSlice";
import { authService } from "../../services/auth";
import { setUser } from "../../redux/authSlice";

export default function ProfileModal({ data }) {
	const dispatch = useDispatch();
	const [newProfileData, setNewProfileData] = useState({
		firstName: data.firstName,
		lastName: data.lastName,
	});
	const imageRef = useRef(null);
	const [selectedImage, setSelectedImage] = useState(null);
	const [previewImage, setPreviewImage] = useState(data.profileImage);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [message, setMessage] = useState("");

	const handleChange = (e) => {
		setNewProfileData((prev) => ({
			...prev,
			[e.target.id]: e.target.value,
		}));
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (!file) return;
		if (file.size > 2 * 1024 * 1024) {
			setError("Ảnh vượt quá 2MB");
			return;
		}
		if (!file.type.includes("image")) {
			setError("File không phải ảnh");
			return;
		}
		setError("");

		setSelectedImage(file);
		const url = URL.createObjectURL(file);
		setPreviewImage(url);
	};

	const handleSave = async () => {
		setLoading(true);
		setMessage("");
		setError("");

		try {
			if (selectedImage) {
				await authService.uploadProfileImage(selectedImage);
			}
			const updateRes = await authService.updateProfile({
				firstName: newProfileData.firstName.trim(),
				lastName: newProfileData.lastName.trim(),
			});

			setMessage("Profile updated successfully!");
			if (updateRes.success) {
				dispatch(setUser({ user: updateRes.data }));
				dispatch(closeModal());
			}
		} catch {
			setError("Profile update failed!");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4	">
			<div className=" bg-black shadow-2xl/30 rounded-md p-8 max-w-[45vw]">
				<div className="flex justify-between mb-6">
					<h4 className="text-white font-semibold text-2xl">Profile Details</h4>
					<button
						className="self-center cursor-pointer"
						onClick={() => dispatch(closeModal())}
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
				</div>
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
				<div className="flex gap-10">
					<img
						src={
							previewImage ||
							"https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png"
						}
						alt="profile image"
						className="w-42 h-42 object-cover rounded-full self-center cursor-pointer hover:opacity-80"
						onClick={() => imageRef.current?.click()}
					/>
					<input
						type="file"
						ref={imageRef}
						accept="image/png,image/jpeg,image/jpg"
						className="hidden"
						onChange={handleImageChange}
					/>
					<div className="flex flex-col justify-center">
						<label
							htmlFor="firstName"
							className="text-white font-semibold text-sm mb-2"
						>
							First Name
						</label>
						<input
							type="text"
							id="firstName"
							className="w-full mb-6 ps-4 py-3 rounded-lg bg-white text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
							placeholder={data.firstName}
							value={newProfileData.firstName}
							onChange={handleChange}
						/>
						<label
							htmlFor="lastName"
							className="text-white font-semibold text-sm mb-2"
						>
							Last Name
						</label>
						<input
							type="text"
							id="lastName"
							className="w-full mb-6 ps-4 py-3 rounded-lg bg-white text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
							placeholder={data.lastName}
							value={newProfileData.lastName}
							onChange={handleChange}
						/>
						<button
							className="text-white bg-[#3BC8E7] px-4 py-2 rounded-full cursor-pointer hover:bg-[#3BC8E7]/80"
							onClick={handleSave}
						>
							{loading ? "Saving..." : "Save"}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
