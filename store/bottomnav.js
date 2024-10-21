import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: { visible: true },
};

export const visibleBottomNavigationSlice = createSlice({
    name: "visibleBottomNavigation",
    initialState,
    reducers: {
        hideNav: (state) => {
            state.value = { visible: false };
        },
        showNav: (state) => {
            state.value = { visible: true };
        },
    },
});

export const { showNav, hideNav } = visibleBottomNavigationSlice.actions;
export const getVisibleNav = (state) => {
    return state.visibleBottomNavigation.value.visible;
};

export default visibleBottomNavigationSlice.reducer;
