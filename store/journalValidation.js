import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: {} };

export const journalValidationSlice = createSlice({
    name: "journalValidation",
    initialState,
    reducers: {
        setJournalValidation: (state, action) => {
            Object.assign(state.value, action.payload);
        },
    },
});

export const { setJournalValidation } = journalValidationSlice.actions;
export const getJournalValidation = (state) => {
    return state.journalValidation.value;
};

export default journalValidationSlice.reducer;
