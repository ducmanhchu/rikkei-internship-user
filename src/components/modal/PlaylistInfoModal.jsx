import { useState } from "react";
import { useDispatch } from "react-redux";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { closeModal } from "../../redux/modalSlice";
import { playlistService } from "../../services/playlist";

export default function PlaylistInfoModal({ data }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [message, setMessage] = useState("");
	const [newPlaylistData, setNewPlaylistData] = useState({
		name: data.name,
		isPublic: data.isPublic,
	});

	const handleSave = async () => {
		setLoading(true);
		setMessage("");
		setError("");
		const toastId = toast.loading("Saving playlist...");
		try {
			const response = await playlistService.updatePlaylist(
				data.id,
				newPlaylistData.name,
				newPlaylistData.isPublic
			);
			if (response.success) {
				const updatedPlaylist = {
					...data,
					name: newPlaylistData.name,
					isPublic: newPlaylistData.isPublic,
				};

				if (window.updatePlaylistDetail) {
					window.updatePlaylistDetail(updatedPlaylist);
				}

				dispatch(closeModal());
				toast.success("Playlist updated successfully", { id: toastId });
			}
		} catch (error) {
			toast.error("Failed to update playlist", { id: toastId });
			console.error("Error updating playlist:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleRemove = async (playlistId) => {
		setLoading(true);
		setMessage("");
		setError("");
		const toastId = toast.loading("Removing playlist...");
		try {
			const response = await playlistService.removePlaylist(playlistId);
			if (response.success) {
				toast.success("Playlist removed successfully", { id: toastId });
				dispatch(closeModal());
				navigate("/");
			}
		} catch (error) {
			toast.error("Failed to remove playlist", { id: toastId });
			console.error("Error removing playlist:", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center p-4	">
			<div className="w-[25vw] bg-linear-to-b from-black to-gray-800 shadow-2xl/30 rounded-md p-8">
				<div className="flex justify-between items-center mb-6">
					<h4 className="text-white font-semibold text-2xl">
						Playlist Details
					</h4>
					<button
						className="self-center cursor-pointer"
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
					<label
						htmlFor="name"
						className="text-white font-semibold text-sm mb-2"
					>
						Playlist Name
					</label>
					<input
						type="text"
						id="name"
						className="w-full mb-6 ps-4 py-3 rounded-md bg-white text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3BC8E7]"
						placeholder={data.name}
						value={newPlaylistData.name}
						onChange={(e) =>
							setNewPlaylistData((prev) => ({ ...prev, name: e.target.value }))
						}
					/>
					<label className="text-white font-semibold text-sm mb-2">
						Playlist Type
					</label>
					<div className="flex gap-6 mb-6">
						<label className="flex items-center gap-2 text-white">
							<input
								type="radio"
								name="isPublic"
								value={true}
								checked={newPlaylistData.isPublic === true}
								onChange={() =>
									setNewPlaylistData((prev) => ({
										...prev,
										isPublic: true,
									}))
								}
							/>
							Public
						</label>
						<label className="flex items-center gap-2 text-white">
							<input
								type="radio"
								name="isPublic"
								value={false}
								checked={newPlaylistData.isPublic === false}
								onChange={() =>
									setNewPlaylistData((prev) => ({
										...prev,
										isPublic: false,
									}))
								}
							/>
							Private
						</label>
					</div>
					<div className="flex gap-2">
						<button
							className="flex-1 text-black font-semibold bg-[#3BC8E7] px-4 py-2 rounded-full cursor-pointer hover:bg-[#3BC8E7]/80"
							onClick={handleSave}
						>
							{loading ? "Saving..." : "Save"}
						</button>
						<button
							className="text-black font-semibold bg-red-500 px-4 py-2 rounded-full cursor-pointer hover:bg-red-500/80"
							onClick={() => handleRemove(data.id)}
						>
							Remove
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
