import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import playerReducer from "./playerSlice";
import modalReducer from "./modalSlice";

export const store = configureStore({
	reducer: {
		auth: authReducer,
		player: playerReducer,
		modal: modalReducer,
	},
});
