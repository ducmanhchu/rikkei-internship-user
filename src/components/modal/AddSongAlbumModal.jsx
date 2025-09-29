import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { XMarkIcon, PlusIcon } from "@heroicons/react/24/outline";
import { toast } from "react-hot-toast";

import { closeModal } from "../../redux/modalSlice";
import { genreService } from "../../services/genre";
import { songService } from "../../services/song";

export default function AddSongAlbumModal({ data }) {
	const dispatch = useDispatch();
	const [title, setTitle] = useState("");
	const [duration, setDuration] = useState("");
	const [genres, setGenres] = useState([]);
	const [selectedGenreIds, setSelectedGenreIds] = useState([]);
	const [songFile, setSongFile] = useState(null);
	const [loadingGenres, setLoadingGenres] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	console.log("data", data);

	useEffect(() => {
		const fetchGenres = async () => {
			setLoadingGenres(true);
			try {
				const res = await genreService.getAllGenres();
				if (res.success) {
					setGenres(res.data.content || []);
				}
			} catch (error) {
				toast.error(error.message || "Cannot load genres");
			} finally {
				setLoadingGenres(false);
			}
		};
		fetchGenres();
	}, []);

	const handleToggleGenre = (id) => {
		setSelectedGenreIds((prev) =>
			prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
		);
	};

	const parseDurationToSeconds = (value) => {
		if (!value) return null;
		const trimmed = String(value).trim();
		if (/^\d+$/.test(trimmed)) {
			return Number(trimmed);
		}
		const match = trimmed.match(/^(\d{1,2}):(\d{2})$/);
		if (!match) return null;
		const mins = Number(match[1]);
		const secs = Number(match[2]);
		if (secs >= 60) return null;
		return mins * 60 + secs;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!title.trim()) {
			toast.error("Please enter song name");
			return;
		}
		const durationSeconds = parseDurationToSeconds(duration);
		if (durationSeconds == null) {
			toast.error("Invalid duration. Use mm:ss or seconds");
			return;
		}
		if (selectedGenreIds.length === 0) {
			toast.error("Please select at least one genre");
			return;
		}
		if (!songFile) {
			toast.error("Please select audio file");
			return;
		}

		const toastId = toast.loading("Adding song...");
		setSubmitting(true);
		try {
			const res = await songService.createSongToAlbum(
				data?.album?.id,
				title.trim(),
				durationSeconds,
				selectedGenreIds,
				songFile
			);
			if (res.success) {
				toast.success("Song added successfully", { id: toastId });
				if (window.updateAlbumDetail) {
					const updatedSongs = [...data.songs, res.data];
					window.updateAlbumDetail({
						...data,
						songs: updatedSongs,
					});
				}
				dispatch(closeModal());
			}
		} catch (error) {
			toast.error(error.message || "Cannot add song", { id: toastId });
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center p-4">
			<div className="w-[40vw] max-h-[85vh] bg-gradient-to-b from-black to-gray-800 shadow-2xl/30 rounded-md p-8 overflow-auto">
				<div className="flex justify-between items-center mb-6">
					<h4 className="text-white font-semibold text-2xl">
						Add song to album
					</h4>
					<button
						className="self-center cursor-pointer hover:scale-110 transition-transform duration-150"
						onClick={() => dispatch(closeModal())}
					>
						<XMarkIcon className="size-6 text-white" />
					</button>
				</div>

				<form className="space-y-5" onSubmit={handleSubmit}>
					<div className="flex flex-col gap-2">
						<label className="text-gray-300 text-sm">Song Name</label>
						<input
							type="text"
							placeholder="Enter song name"
							className="text-[16px] text-white bg-[#6C757D] focus:outline-none px-4 py-3 rounded-md"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</div>

					<div className="flex flex-col gap-2">
						<label className="text-gray-300 text-sm">Duration</label>
						<input
							type="text"
							placeholder="mm:ss or seconds (e.g. 03:45 or 225)"
							className="text-[16px] text-white bg-[#6C757D] focus:outline-none px-4 py-3 rounded-md"
							value={duration}
							onChange={(e) => setDuration(e.target.value)}
						/>
					</div>

					<div className="flex flex-col gap-2">
						<label className="text-gray-300 text-sm">Genre</label>
						<div className="flex flex-wrap gap-2">
							{loadingGenres ? (
								<span className="text-[#3BC8E7]">Loading genres...</span>
							) : genres.length === 0 ? (
								<span className="text-gray-400">No genres</span>
							) : (
								genres?.map((g) => (
									<button
										key={g.id}
										type="button"
										className={`px-3 py-1 rounded-full text-sm font-medium transition-colors cursor-pointer duration-200 ${
											selectedGenreIds.includes(g.id)
												? "bg-[#3BC8E7] text-black"
												: "bg-gray-700 text-white hover:bg-gray-600"
										}`}
										onClick={() => handleToggleGenre(g.id)}
									>
										{g.genreName}
									</button>
								))
							)}
						</div>
					</div>

					<div className="flex flex-col gap-2">
						<label className="text-gray-300 text-sm">Audio File</label>
						<input
							type="file"
							accept="audio/*"
							className="text-[16px] text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#3BC8E7] file:text-black hover:file:bg-[#3BC8E7]/80"
							onChange={(e) => setSongFile(e.target.files?.[0] || null)}
						/>
						{songFile && (
							<span className="text-gray-300 text-sm">{songFile.name}</span>
						)}
					</div>

					<div className="flex justify-end gap-3 pt-2">
						<button
							type="submit"
							disabled={submitting}
							className="flex items-center gap-2 bg-[#3BC8E7] text-black px-5 py-2 rounded-full font-semibold hover:bg-[#3BC8E7]/80 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{submitting ? (
								<>
									<div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
									Adding...
								</>
							) : (
								<span className="flex items-center gap-2 cursor-pointer">
									<PlusIcon className="w-4 h-4" />
									Add Song
								</span>
							)}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
