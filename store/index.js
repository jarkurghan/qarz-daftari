import { configureStore } from "@reduxjs/toolkit";
import alert from "./alert";
import token from "./token";
import filter from "./filter";
import prevFilter from "./prevFilter";
import timeClock from "./timeClock";
import journal from "./journal";
import visibleBottomNavigation from "./bottomnav";
import activeJournal from "./activeJournal";

export const store = configureStore({ reducer: { alert, token, filter, prevFilter, journal, activeJournal, timeClock, visibleBottomNavigation } });
