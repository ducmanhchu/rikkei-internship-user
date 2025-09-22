import { useEffect, useState } from "react";

import { authService } from "../services/auth";

export default function Profile() {
	const [profileData, setProfileData] = useState(null);

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const response = await authService.getMe();
				if (response.success) {
					setProfileData(response.data);
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
					className="w-32 h-32 bg-cover rounded-full lg:w-52 lg:h-52"
					alt="Artist Image"
				/>
				<div className="flex flex-col gap-2 justify-center text-white">
					<h5 className="text-md ps-1">Profile</h5>
					<h1 className="text-xl font-bold pt-1 md:text-3xl lg:text-5xl">
						{profileData?.firstName} {profileData?.lastName}
					</h1>
				</div>
			</div>
			{/* <div className="mb-8">
				<h2 className="text-white text-xl font-bold">Popular</h2>
				{songs.length > 0 ? (
					<SongTable songs={songs} />
				) : (
					<p className="text-gray-400 my-4">
						No songs available for this artist.
					</p>
				)}
			</div>
			<div className="">
				<h2 className="text-white text-xl font-bold mb-4">Discography</h2>
				{albums.length > 0 ? (
					<ItemsCarousel items={albums} isAlbum />
				) : (
					<p className="text-gray-400 my-4">
						No albums available for this artist.
					</p>
				)}
			</div> */}
		</div>
	);
}
