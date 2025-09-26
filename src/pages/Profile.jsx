import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import useColorThief from "use-color-thief";

import { authService } from "../services/auth";
import { openModal } from "../redux/modalSlice";
import { setUser } from "../redux/authSlice";
import ItemsCarousel from "../components/util/ItemsCarousel";

export default function Profile() {
	const dispatch = useDispatch();
	const { user, roles } = useSelector((state) => state.auth);
	const imageRef = useRef();
	const { color } = useColorThief(imageRef, {
		format: "hex",
	});

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const response = await authService.getMe();
				if (response.success) {
					dispatch(setUser({ user: response.data }));
				}
			} catch (error) {
				console.error("Error fetching profile:", error);
			}
		};

		fetchProfile();
	}, []);

	return (
		<div>
			<div
				className="flex gap-4 mb-8 py-8 px-12"
				style={{
					background: color
						? `linear-gradient(180deg, ${color} 0%, transparent 100%)`
						: undefined,
				}}
			>
				<img
					src={
						user?.profileImage ||
						"https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png"
					}
					ref={imageRef}
					className="w-32 h-32 object-cover rounded-full lg:w-52 lg:h-52 shadow-xl/30"
					alt="Artist Image"
				/>
				<div className="flex flex-col gap-2 justify-center text-white">
					<h5 className="text-md ps-1">Profile</h5>
					<h1 className="text-xl font-bold pt-1 md:text-4xl lg:text-5xl">
						{user?.firstName} {user?.lastName}
					</h1>
					{roles === "ROLE_ARTIST" && (
						<span className="text-sm bg-[#3BC8E7] w-fit px-2 py-1 rounded-full text-black font-semibold md:text-lg">
							Artist
						</span>
					)}
				</div>
				<div className="flex-1 flex justify-end">
					<button
						className="cursor-pointer self-end mb-4 hover:scale-110 transition-transform duration-200"
						onClick={() =>
							dispatch(
								openModal({
									modalName: "PROFILE_MODAL",
									modalData: user,
								})
							)
						}
					>
						<svg
							className="w-6 h-6"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M20.1498 7.93997L8.27978 19.81C7.21978 20.88 4.04977 21.3699 3.32977 20.6599C2.60977 19.9499 3.11978 16.78 4.17978 15.71L16.0498 3.84C16.5979 3.31801 17.3283 3.03097 18.0851 3.04019C18.842 3.04942 19.5652 3.35418 20.1004 3.88938C20.6356 4.42457 20.9403 5.14781 20.9496 5.90463C20.9588 6.66146 20.6718 7.39189 20.1498 7.93997V7.93997Z"
								stroke="#ffffff"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</button>
				</div>
			</div>

			<div className="px-12 pb-8">
				<h2 className="text-white text-xl font-semibold mb-3 mt-8">
					Playlists
				</h2>
				{user?.playlists?.length > 0 ? (
					<ItemsCarousel items={user.playlists ?? []} isAlbum />
				) : (
					<p className="text-gray-400 my-4">No playlists available.</p>
				)}
			</div>

			<div className="px-12 pb-8 mb-8">
				<h2 className="text-white text-xl font-semibold mb-3 mt-8">
					Featured Albums
				</h2>
				{user?.albums?.length > 0 ? (
					<ItemsCarousel items={user.albums ?? []} isAlbum />
				) : (
					<p className="text-gray-400 my-4">No albums available.</p>
				)}
			</div>
		</div>
	);
}
