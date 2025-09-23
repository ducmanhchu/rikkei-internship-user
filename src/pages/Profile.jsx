import { useEffect, useState } from "react";

import { authService } from "../services/auth";
import ItemsCarousel from "../components/ItemsCarousel";

export default function Profile() {
	const [profileData, setProfileData] = useState(null);
	const [isArtist, setIsArtist] = useState(false);

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const response = await authService.getMe();
				if (response.success) {
					setProfileData(response.data);
					if (
						response.data.roles.find((role) => role.roleName === "ROLE_ARTIST")
					) {
						setIsArtist(true);
					}
					console.log("Fetched profile data:", response.data);
				}
			} catch (error) {
				console.error("Error fetching profile:", error);
			}
		};

		fetchProfile();
	}, []);

	return (
		<div className="m-8">
			<div className="flex gap-4 mb-8">
				<img
					src={profileData?.profileImage}
					className={`w-32 h-32 bg-cover rounded-full lg:w-52 lg:h-52 ${
						isArtist ? "border-4 border-[#3BC8E7]" : ""
					}`}
					alt="Artist Image"
				/>
				<div className="flex flex-col gap-2 justify-center text-white">
					<h5 className="text-md ps-1">Profile</h5>
					<h1 className="text-xl font-bold pt-1 md:text-3xl lg:text-5xl">
						{profileData?.firstName} {profileData?.lastName}
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
				{profileData?.playlists.length > 0 ? (
					<ItemsCarousel items={profileData.playlists} isAlbum />
				) : (
					<p className="text-gray-400 my-4">No playlists available.</p>
				)}
			</div>

			<div className="ms-4">
				<h2 className="text-white text-xl font-semibold mb-3 mt-8">
					Featured Albums
				</h2>
				{profileData?.albums.length > 0 ? (
					<ItemsCarousel items={profileData.albums} isAlbum />
				) : (
					<p className="text-gray-400 my-4">No albums available.</p>
				)}
			</div>
		</div>
	);
}
