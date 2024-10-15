import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    number: "",
    category: [],
    status: [],
    priceRange: [],
    min: 0,
    max: Infinity,
};

const mySlice = createSlice({
    name: "mySlice",
    initialState,
    reducers: {
        updateFilter: (state, action) => {
            return { ...state, ...action.payload };
        },
    },
});

export const { updateFilter } = mySlice.actions;
export default mySlice.reducer;
