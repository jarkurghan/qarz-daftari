import { configureStore } from "@reduxjs/toolkit";
import alert from "./alert";
import token from "./token";
import filter from "./filter";
import prevFilter from "./prevFilter";
import timeClock from "./timeClock";

export const store = configureStore({ reducer: { alert: alert, token: token, filter, prevFilter, timeClock } });
