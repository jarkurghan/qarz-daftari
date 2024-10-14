import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: { status: null, work: 0, break: 0 },
    lastgetting: null,
};

export const timeClockSlice = createSlice({
    name: "timeClock",
    initialState,
    reducers: {
        setTimeClock: (state, action) => {
            state.value = action.payload;
        },
        setLastGetting: (state) => {
            state.lastgetting = new Date().getTime();
        },
    },
});

export const { setTimeClock, setLastGetting } = timeClockSlice.actions;
export const getTimeClock = (state) => {
    return state.timeClock.value;
};
export const getLastGetting = (state) => {
    return state.timeClock.lastgetting;
};

export default timeClockSlice.reducer;
