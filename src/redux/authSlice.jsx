import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isLogin: localStorage.getItem("token") ? true : false,
	user: JSON.parse(localStorage.getItem("user")) || null,
	token: localStorage.getItem("token") || null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		login: (state, action) => {
			state.isLogin = true;
			state.user = action.payload.user;
			state.token = action.payload.token;
		},
		logout: (state) => {
			state.isLogin = false;
			state.user = null;
			state.token = null;
		},
	},
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
