import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    number: '',
    category: [],
    status: [],
    priceRange: [],
    min: 0,
    max: Infinity,
};

const mySlice = createSlice({
    name: 'prevFilter',
    initialState,
    reducers: {
        updatePrevFilter: (state, action) => {
            return { ...state, ...action.payload };
        },
    },
});

export const { updatePrevFilter } = mySlice.actions;
export default mySlice.reducer;
