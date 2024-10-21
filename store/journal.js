import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: [] };

export const journalSlice = createSlice({
    name: "journal",
    initialState,
    reducers: {
        setJournal: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { setJournal } = journalSlice.actions;
export const getJournal = (state) => {
    return state.journal.value;
};

export default journalSlice.reducer;
