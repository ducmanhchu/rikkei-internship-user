import axios from "axios";

const apiClient = axios.create({
	baseURL: "http://localhost:8080/api/v1",
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
	},
});

apiClient.interceptors.request.use(
	(config) => {
		const publicEndpoints = [
			{ path: "auth/login", methods: ["POST"] },
			{ path: "auth/register", methods: ["POST"] },
			{ path: "auth/logout", methods: ["POST"] },
			{ path: "otp/resend-otp", methods: ["POST"] },
			{ path: "otp/verify-otp", methods: ["POST"] },
			{ path: "song/:id/view", methods: ["POST"] },
		];

		const isPublicEndpoint = publicEndpoints.some((endpoint) => {
			const urlMatches = config.url.includes(endpoint.path);
			const methodMatches = endpoint.methods.includes(
				config.method.toUpperCase()
			);
			return urlMatches && methodMatches;
		});

		if (!isPublicEndpoint) {
			const token = localStorage.getItem("token");
			if (token) {
				config.headers["Authorization"] = `Bearer ${token}`;
			}
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default apiClient;
