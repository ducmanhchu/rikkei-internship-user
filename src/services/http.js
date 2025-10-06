import axios from "axios";

const apiClient = axios.create({
	baseURL: "http://localhost:8080/api/v1",
	timeout: 60000,
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
	},
});

export default apiClient;
