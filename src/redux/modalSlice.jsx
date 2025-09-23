import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	activeModal: null,
	modalData: null,
};

const modalSlice = createSlice({
	name: "modal",
	initialState,
	reducers: {
		openModal: (state, action) => {
			state.activeModal = action.payload.modalName;
			state.modalData = action.payload.modalData || null;
		},
		closeModal: (state) => {
			state.activeModal = null;
			state.modalData = null;
		},
	},
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
