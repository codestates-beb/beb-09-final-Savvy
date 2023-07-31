import { createSlice } from "@reduxjs/toolkit";

export const managerSlice = createSlice({
  name: "manager",
  initialState: {
    managerData: null,
  },
  reducers: {
    setManagerData: (state, action) => {
      state.managerData = action.payload;
    },
  },
});

export const { setManagerData } = managerSlice.actions;

export default managerSlice.reducer;
