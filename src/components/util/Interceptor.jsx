import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import apiClient from "../../services/http";
import { authService } from "../../services/auth";
import { setAccessToken } from "../../redux/authSlice";

export default function Interceptor() {
	const accessToken = useSelector((state) => state.auth.accessToken);
	const dispatch = useDispatch();

	useEffect(() => {
		const requestInterceptor = apiClient.interceptors.request.use((config) => {
			config.headers.Authorization =
				!config._retry && accessToken
					? `Bearer ${accessToken}`
					: config.headers.Authorization;
			return config;
		});

		return () => {
			apiClient.interceptors.request.eject(requestInterceptor);
		};
	}, [accessToken]);

	useEffect(() => {
		const responseInterceptor = apiClient.interceptors.response.use(
			(response) => response,
			async (error) => {
				const originalRequest = error.config;
				const isAuthEndpoint =
					originalRequest.url.includes("/auth/refresh") ||
					originalRequest.url.includes("/auth/login") ||
					originalRequest.url.includes("/auth/logout");

				if (
					error.response.status === 401 &&
					!isAuthEndpoint &&
					!originalRequest._retry
				) {
					try {
						const response = await authService.refreshToken();
						if (response.success && response.data?.accessToken) {
							dispatch(setAccessToken(response.data.accessToken));
							originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
							error.config._retry = true;
							return apiClient(originalRequest);
						}
					} catch {
						dispatch(setAccessToken(null));
					}
				}

				return Promise.reject(error);
			}
		);

		return () => {
			apiClient.interceptors.response.eject(responseInterceptor);
		};
	}, []);
}
