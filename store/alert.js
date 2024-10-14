import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: { visible: true, spinner: true, close: false, text: "" },
};

export const alertSlice = createSlice({
    name: "alert",
    initialState,
    reducers: {
        openWarning: (state, action) => {
            state.value = { visible: true, spinner: false, close: true, text: action.payload.text };
        },
        openWaiting: (state, action) => {
            state.value = { visible: true, spinner: true, close: false, text: action.payload.text };
        },
        openSpinner: (state) => {
            state.value = { visible: true, spinner: true, close: false, text: "" };
        },
        closeAlert: (state) => {
            state.value = { visible: false, spinner: false, close: false, text: "" };
        },
    },
});

export const { openWarning, openWaiting, openSpinner, closeAlert } = alertSlice.actions;
export const getAlert = (state) => {
    return state.alert.value;
};

export default alertSlice.reducer;
