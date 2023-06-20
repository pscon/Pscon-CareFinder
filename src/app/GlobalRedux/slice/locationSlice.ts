import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  city: "",
  country: "",
  searchTerm: "",
};

const findHospitalsNearMeSlice = createSlice({
  name: "findHospitalsNearMeSlice",
  initialState,
  reducers: {
    setCity: (state, action) => {
      state.city = action.payload;
    },
    setCountry: (state, action) => {
      state.country = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { setCity, setCountry, setSearchTerm } =
  findHospitalsNearMeSlice.actions;
export default findHospitalsNearMeSlice.reducer;
