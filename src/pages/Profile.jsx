import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { authService } from "../services/auth";
import { openModal } from "../redux/modalSlice";
import { setUser } from "../redux/authSlice";
import ItemsCarousel from "../components/util/ItemsCarousel";

export default function Profile() {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);
	const [isArtist, setIsArtist] = useState(false);

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const response = await authService.getMe();
				if (response.success) {
					dispatch(setUser({ user: response.data }));
					if (
						response.data.roles.find((role) => role.roleName === "ROLE_ARTIST")
					) {
						setIsArtist(true);
					}
				}
			} catch (error) {
				console.error("Error fetching profile:", error);
			}
		};

		if (!user) fetchProfile();
	}, [dispatch, user]);

	return (
		<div className="m-8">
			<div className="flex gap-4 mb-8">
				<img
					src={
						user?.profileImage ||
						"https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png"
					}
					className={`w-32 h-32 bg-cover rounded-full lg:w-52 lg:h-52 ${
						isArtist ? "border-4 border-[#3BC8E7]" : ""
					}`}
					alt="Artist Image"
				/>
				<div className="flex flex-col gap-2 justify-center text-white">
					<h5 className="text-md ps-1">Profile</h5>
					<h1
						className="text-xl font-bold pt-1 cursor-pointer md:text-3xl lg:text-5xl"
						onClick={() =>
							dispatch(
								openModal({
									modalName: "PROFILE_MODAL",
									modalData: user,
								})
							)
						}
					>
						{user?.firstName} {user?.lastName}
					</h1>
					{isArtist && (
						<span className="text-sm bg-[#3BC8E7] w-fit px-2 py-1 rounded-full text-black font-semibold md:text-lg">
							Artist
						</span>
					)}
				</div>
			</div>

			<div className="ms-4">
				<h2 className="text-white text-xl font-semibold mb-3 mt-8">
					Playlists
				</h2>
				{user?.playlists.length > 0 ? (
					<ItemsCarousel items={user.playlists} isAlbum />
				) : (
					<p className="text-gray-400 my-4">No playlists available.</p>
				)}
			</div>

			<div className="ms-4">
				<h2 className="text-white text-xl font-semibold mb-3 mt-8">
					Featured Albums
				</h2>
				{user?.albums.length > 0 ? (
					<ItemsCarousel items={user.albums} isAlbum />
				) : (
					<p className="text-gray-400 my-4">No albums available.</p>
				)}
			</div>
		</div>
	);
}
