import { createSlice } from "@reduxjs/toolkit";

export const tbaSlice = createSlice({
  name: "tba",
  initialState: {
    tbaData: null,
  },
  reducers: {
    setTbaData: (state, action) => {
      state.tbaData = action.payload;
    },
  },
});

export const { setTbaData } = tbaSlice.actions;

export default tbaSlice.reducer;
