import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: { debt: 0 } };

export const gettersSlice = createSlice({
    name: "getters",
    initialState,
    reducers: {
        getDebt: (state) => {
            state.value.debt += 1;
        },
    },
});

export const { getDebt } = gettersSlice.actions;
export const getters = (state) => {
    return state.getters.value;
};

export default gettersSlice.reducer;
