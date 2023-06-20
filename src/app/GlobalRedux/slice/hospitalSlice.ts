import {
  fetchHospitalsFromFirestore,
  updateHospitalInFirestore,
  deleteHospitalFromFirestore,
} from "@/app/lib/firestore";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface HospitalState {
  hospitals: Hospital[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: HospitalState = {
  hospitals: [],
  status: "idle",
  error: null,
};

export const deleteHospital = createAsyncThunk(
  "hospitals/deleteHospital",
  async (hospitalId: string) => {
    await deleteHospitalFromFirestore(hospitalId);
  }
);

export const updateHospital = createAsyncThunk(
  "hospitals/updateHospital",
  async ({
    hospitalId,
    updates,
  }: {
    hospitalId: string;
    updates: Partial<Hospital>;
  }) => {
    await updateHospitalInFirestore(hospitalId, updates);
  }
);

export const fetchHospitals = createAsyncThunk<Hospital[]>(
  "hospitals/fetchHospitals",
  async () => {
    const hospitals = await fetchHospitalsFromFirestore();
    return hospitals.map((hospital) => ({
      id: hospital.id,
      phoneNumber: hospital.phoneNumber,
      name: hospital.name,
      address: hospital.address,
      city: hospital.city,
      state: hospital.state,
      website: hospital.website,
      description: hospital.description,
      nickname: hospital.nickname,
    }));
  }
);

const hospitalsSlice = createSlice({
  name: "hospitals",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHospitals.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchHospitals.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.hospitals = action.payload as Hospital[];
      })
      .addCase(fetchHospitals.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string;
      })
      .addCase(deleteHospital.fulfilled, (state, action) => {
        state.hospitals = state.hospitals.filter(
          (hospital) => hospital.id !== action.meta.arg
        );
      })
      .addCase(updateHospital.fulfilled, (state, action) => {
        const index = state.hospitals.findIndex(
          (hospital) => hospital.id === action.meta.arg.hospitalId
        );
        if (index !== -1) {
          state.hospitals[index] = {
            ...state.hospitals[index],
            ...action.meta.arg.updates,
          };
        }
      });
  },
});

export default hospitalsSlice.reducer;
