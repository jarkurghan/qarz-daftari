import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: false };

export const isAuthenticatedUserSlice = createSlice({
    name: "isAuthenticatedUser",
    initialState,
    reducers: {
        setIsAuthenticatedUser: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { setIsAuthenticatedUser } = isAuthenticatedUserSlice.actions;
export const getIsAuthenticatedUser = (state) => {
    return state.isAuthenticatedUser.value;
};

export default isAuthenticatedUserSlice.reducer;
