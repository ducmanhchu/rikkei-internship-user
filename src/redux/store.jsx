import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import playerReducer from "./playerSlice";

export const store = configureStore({
	reducer: {
		auth: authReducer,
		player: playerReducer,
	},
});
