import apiClient from "./http";

export const subscriptionService = {
	getSubscriptionPlans: async () => {
		try {
			const response = await apiClient.get("/subscription-plans");
			return {
				success: true,
				data: response.data.data,
			};
		} catch (error) {
			throw new Error(
				error.response?.data?.message || "Failed to fetch subscription plans"
			);
		}
	},

	createZaloPayOrder: async ({ userId, planId }) => {
		try {
			const res = await apiClient.post("/payment/zalopay", { userId, planId });
			return { success: true, data: res.data };
		} catch (error) {
			const message =
				error.response?.data?.message ||
				error.message ||
				"Failed to create order";
			throw new Error(message);
		}
	},

	getZaloPayOrderStatus: async (apptransid) => {
		try {
			const res = await apiClient.get(`/payment/${apptransid}/order-status`);
			return { success: true, data: res.data };
		} catch (error) {
			throw new Error(
				error.response?.data?.message || "Failed to fetch order status"
			);
		}
	},

	getCurrentPlan: async () => {
		try {
			const res = await apiClient.get("/subscription");
			return { success: true, data: res.data.data };
		} catch (error) {
			throw new Error(
				error.response?.data?.message || "Failed to fetch current plan"
			);
		}
	},
};
