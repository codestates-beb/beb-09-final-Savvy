import { createSlice } from "@reduxjs/toolkit";

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    dashboardData: null,
  },
  reducers: {
    setDashboardData: (state, action) => {
      state.dashboardData = action.payload;
    },
  },
});

export const { setDashboardData } = dashboardSlice.actions;

export default dashboardSlice.reducer;
