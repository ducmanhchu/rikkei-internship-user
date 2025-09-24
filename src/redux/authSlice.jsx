import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isLogin: false,
	user: null,
	accessToken: undefined,
	roles: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		login: (state, action) => {
			state.isLogin = true;
			state.user = action.payload.user;
			state.accessToken = action.payload.accessToken;
			state.roles = action.payload.roles?.at(0);
		},
		logout: (state) => {
			state.isLogin = false;
			state.user = null;
			state.accessToken = null;
			state.roles = null;
		},
		setAccessToken: (state, action) => {
			state.accessToken = action.payload;
		},
		setUser: (state, action) => {
			state.isLogin = true;
			state.user = action.payload.user;
			state.roles = action.payload.user.roles?.at(0).roleName;
		},
	},
});

export const { login, logout, setUser, setAccessToken } = authSlice.actions;
export default authSlice.reducer;
