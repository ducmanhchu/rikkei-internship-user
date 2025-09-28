import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
	QueueListIcon,
	HeartIcon,
	ArrowDownTrayIcon,
	InformationCircleIcon,
	UserCircleIcon,
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

import { songService } from "../../services/song";
import { addToPlaylist } from "../../redux/playerSlice";

export default function SongOptionsMenu({
	anchorRect,
	anchorRef,
	song,
	onClose,
}) {
	const menuRef = useRef(null);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [position, setPosition] = useState({
		top: 0,
		left: 0,
		transformOrigin: "top left",
	});

	useLayoutEffect(() => {
		if (!anchorRect) return;
		const menuWidth = 200;
		const menuHeight = menuRef.current.offsetHeight;
		let top = anchorRect.bottom + window.scrollY;
		let left = anchorRect.left + window.scrollX;
		let transformOrigin = "top left";

		if (left + menuWidth > window.scrollX + window.innerWidth) {
			left = anchorRect.right - menuWidth + window.scrollX;
			transformOrigin = "top right";
		}

		if (top + menuHeight > window.scrollY + window.innerHeight - 100) {
			top = anchorRect.top - menuHeight + window.scrollY;
			transformOrigin = transformOrigin.replace("top", "bottom");
		}

		setPosition({ top, left, transformOrigin });
	}, [anchorRect]);

	useEffect(() => {
		const handleClickOutside = (e) => {
			if (
				menuRef.current &&
				!menuRef.current.contains(e.target) &&
				anchorRef &&
				!anchorRef.current.contains(e.target)
			)
				onClose?.();
		};
		const handleEsc = (e) => {
			if (e.key === "Escape") onClose?.();
		};
		const handleScroll = () => onClose?.();

		document.addEventListener("mousedown", handleClickOutside);
		document.addEventListener("keydown", handleEsc);
		window.addEventListener("scroll", handleScroll, true);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("keydown", handleEsc);
			window.removeEventListener("scroll", handleScroll, true);
		};
	}, [onClose]);

	const handleAddToFavourite = async (song) => {
		const toastId = toast.loading("Adding to favourite...");
		try {
			const response = await songService.addFavouriteSong(song.id);
			if (response.success) {
				toast.success(`${song.title} added to favourite`, { id: toastId });
			}
		} catch (error) {
			toast.error(`${error.message}`, { id: toastId });
		} finally {
			onClose?.();
		}
	};

	const handleDownload = async (song) => {
		const toastId = toast.loading("Downloading song...");
		try {
			const response = await fetch(song.songUrl);
			const blob = await response.blob();
			const url = window.URL.createObjectURL(blob);
			const link = document.createElement("a");
			link.href = url;
			link.download = `${song.title}.mp3`;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			window.URL.revokeObjectURL(url);

			const downloadRes = await songService.downloadSong(song.id);
			if (downloadRes.success) {
				toast.success("Song downloaded", { id: toastId });
			}
		} catch (error) {
			console.error("Failed to download song:", error);
			toast.error("Failed to download song", { id: toastId });
		} finally {
			onClose?.();
		}
	};

	return createPortal(
		<div
			style={{
				position: "absolute",
				top: position.top,
				left: position.left,
				zIndex: 100,
			}}
		>
			<div
				ref={menuRef}
				className="min-w-[220px] rounded-md bg-[#2B2B2B] text-white shadow-xl border border-black/20 py-1"
				style={{ transformOrigin: position.transformOrigin }}
				onClick={(e) => e.stopPropagation()}
			>
				<MenuItem
					Icon={QueueListIcon}
					label="Add to queue"
					onClick={() => {
						dispatch(addToPlaylist(song));
						onClose?.();
					}}
				/>
				<MenuItem
					Icon={HeartIcon}
					label="Add to favourites"
					onClick={() => handleAddToFavourite(song)}
				/>
				<MenuItem
					Icon={ArrowDownTrayIcon}
					label="Download"
					onClick={() => handleDownload(song)}
				/>
				<MenuItem
					Icon={InformationCircleIcon}
					label="Go to album"
					onClick={() => navigate(`/albums/${song.albumId}`)}
				/>
				<MenuItem
					Icon={UserCircleIcon}
					label="Go to artist"
					onClick={() => navigate(`/artists/${song.artistId}`)}
				/>
			</div>
		</div>,
		document.body
	);
}

function MenuItem({ Icon, label, onClick }) {
	return (
		<button
			type="button"
			className="w-full flex items-center gap-3 px-3 py-2 hover:bg-white/10 cursor-pointer text-left"
			onClick={onClick}
		>
			{Icon && <Icon className="size-5 text-gray-400" />}
			<span className="text-base self-center">{label}</span>
		</button>
	);
}
