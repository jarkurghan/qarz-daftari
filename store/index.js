import { configureStore } from "@reduxjs/toolkit";
import alert from "./alert";
import token from "./token";
import filter from "./filter";
import prevFilter from "./prevFilter";
import timeClock from "./timeClock";
import journal from "./journal";
import visibleBottomNavigation from "./bottomnav";
import activeJournal from "./activeJournal";
import isAuthenticatedUser from "./isAuthenticatedUser";
import journalValidation from "./journalValidation";
import getters from "./gettersForAPI";

export const store = configureStore({
    reducer: {
        alert,
        token,
        filter,
        getters,
        prevFilter,
        journal,
        activeJournal,
        timeClock,
        visibleBottomNavigation,
        isAuthenticatedUser,
        journalValidation,
    },
});
