import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: null };

export const activeJournalSlice = createSlice({
    name: "activeJournal",
    initialState,
    reducers: {
        setActiveJournal: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { setActiveJournal } = activeJournalSlice.actions;
export const getActiveJournal = (state) => {
    return state.activeJournal.value;
};

export default activeJournalSlice.reducer;
