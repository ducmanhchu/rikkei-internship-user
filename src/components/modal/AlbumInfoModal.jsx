import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { XMarkIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { closeModal } from "../../redux/modalSlice";
import { albumService } from "../../services/album";

export default function AlbumInfoModal({ data }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const fileInputRef = useRef(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [message, setMessage] = useState("");
	const [previewImage, setPreviewImage] = useState(
		data?.album?.coverImage || ""
	);
	const [newAlbumData, setNewAlbumData] = useState({
		title: data?.album?.title || "",
		releaseDate: data?.album?.releaseDate
			? data.album.releaseDate.split("T")[0]
			: "",
		type: data?.album?.type || "FREE",
		coverImage: data?.album?.coverImage || "",
	});
	const [selectedImage, setSelectedImage] = useState(null);

	const handleImageUpload = (event) => {
		const file = event.target.files[0];
		if (file) {
			if (!file.type.startsWith("image/")) {
				toast.error("Please select an image file");
				return;
			}

			if (file.size > 5 * 1024 * 1024) {
				toast.error("File size cannot be greater than 5MB");
				return;
			}
			setSelectedImage(file);
			const reader = new FileReader();
			reader.onload = (e) => {
				setPreviewImage(e.target.result);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleSave = async () => {
		setLoading(true);
		setMessage("");
		setError("");
		const toastId = toast.loading("Updating album...");

		try {
			const response = await albumService.updateAlbum(
				data.album.id,
				newAlbumData.title,
				selectedImage
			);

			if (response.success) {
				const updatedAlbum = {
					...data.album,
					title: newAlbumData.title,
					coverImage: response.data.coverImage,
					songs: data.songs,
				};

				if (window.updateAlbumDetail) {
					window.updateAlbumDetail({
						...data,
						album: updatedAlbum,
					});
				}

				dispatch(closeModal());
				toast.success("Update album successfully", { id: toastId });
			}
		} catch (error) {
			toast.error("Cannot update album", { id: toastId });
			setError("There is an error");
			console.error("Error updating album:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleImageClick = () => {
		fileInputRef.current?.click();
	};

	const handleRemove = async (albumId) => {
		setLoading(true);
		setMessage("");
		setError("");
		const toastId = toast.loading("Removing album...");
		try {
			const response = await albumService.removeAlbum(albumId);
			if (response.success) {
				toast.success("Album removed successfully", { id: toastId });
				dispatch(closeModal());
				navigate("/");
			}
		} catch (error) {
			toast.error("Failed to remove album", { id: toastId });
			console.error("Error removing album:", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center p-4">
			<div className="w-[30vw] bg-gradient-to-b from-black to-gray-800 shadow-2xl/30 rounded-md p-8">
				<div className="flex justify-between items-center mb-6">
					<h4 className="text-white font-semibold text-2xl">Album Details</h4>
					<button
						className="self-center cursor-pointer hover:scale-110 transition-transform"
						onClick={() => dispatch(closeModal())}
					>
						<XMarkIcon className="size-6 text-white" />
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

				<div className="flex flex-col justify-center">
					<label className="text-white font-semibold text-sm mb-2">
						Album Image
					</label>
					<div className="mb-6">
						<div
							className="w-full h-32 bg-gray-700 rounded-md border-2 border-dashed border-gray-500 flex items-center justify-center cursor-pointer hover:border-[#3BC8E7] transition-colors"
							onClick={handleImageClick}
						>
							{previewImage ? (
								<img
									src={previewImage}
									alt="Album cover preview"
									className="w-full h-full object-cover rounded-md"
								/>
							) : (
								<div className="flex flex-col items-center text-gray-400">
									<PhotoIcon className="size-8 mb-2" />
									<span className="text-sm">Click to upload image</span>
								</div>
							)}
						</div>
						<input
							ref={fileInputRef}
							type="file"
							accept="image/*"
							onChange={handleImageUpload}
							className="hidden"
						/>
						<p className="text-xs text-gray-400 mt-2">
							Supported: JPG, PNG, GIF. Max size: 5MB
						</p>
					</div>

					<label
						htmlFor="title"
						className="text-white font-semibold text-sm mb-2"
					>
						Album Name
					</label>
					<input
						type="text"
						id="title"
						className="w-full mb-6 ps-4 py-3 rounded-md bg-white text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3BC8E7]"
						placeholder="Enter album name"
						value={newAlbumData.title}
						onChange={(e) =>
							setNewAlbumData((prev) => ({ ...prev, title: e.target.value }))
						}
					/>
					<div className="flex gap-2">
						<button
							className="flex-1 text-black font-semibold bg-[#3BC8E7] px-4 py-2 rounded-full cursor-pointer hover:bg-[#3BC8E7]/80 disabled:opacity-50 disabled:cursor-not-allowed"
							onClick={handleSave}
							disabled={loading || !newAlbumData.title.trim()}
						>
							{loading ? "Saving..." : "Save"}
						</button>
						<button
							className="text-black font-semibold bg-red-500 px-4 py-2 rounded-full cursor-pointer hover:bg-red-500/80"
							onClick={() => handleRemove(data.album.id)}
						>
							Remove
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
