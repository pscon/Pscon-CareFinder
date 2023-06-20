"use client";
import { configureStore } from "@reduxjs/toolkit";
import hospitalsReducer from "@/app/GlobalRedux/slice/hospitalSlice";
import findHospitalsNearMeReducer from "@/app/GlobalRedux/slice/locationSlice";

export const store = configureStore({
  reducer: {
    hospitals: hospitalsReducer,
    findHospitalsNearMe: findHospitalsNearMeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
