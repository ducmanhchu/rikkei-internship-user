import apiClient from "./http";

export const bannerService = {
	getBanners: async () => {
		try {
			const response = await apiClient.get("/banner");
			return {
				success: true,
				data: response.data.data,
			};
		} catch (error) {
			const errorMessage =
				error.response?.data?.message || "Failed to fetch banners";
			throw new Error(errorMessage);
		}
	},
};
