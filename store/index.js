import { configureStore } from "@reduxjs/toolkit";
import alert from "./alert";
import token from "./token";
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
        getters,
        journal,
        activeJournal,
        visibleBottomNavigation,
        isAuthenticatedUser,
        journalValidation,
    },
});
