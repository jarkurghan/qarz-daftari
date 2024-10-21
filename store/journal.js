import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: [], activeJournal: null };

export const journalSlice = createSlice({
    name: "journal",
    initialState,
    reducers: {
        setJournal: (state, action) => {
            state.value = action.payload;
        },
        setActiveJournal: (state, action) => {
            state.activeJournal = action.payload;
        },
    },
});

export const { setJournal, setActiveJournal } = journalSlice.actions;
export const getJournal = (state) => {
    return state.journal.value;
};
export const getActiveJournal = (state) => {
    return state.journal.activeJournal;
};

export default journalSlice.reducer;
