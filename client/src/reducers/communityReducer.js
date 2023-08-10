import { createSlice } from "@reduxjs/toolkit";

export const communitySlice = createSlice({
  name: "community",
  initialState: {
    communityData: null,
  },
  reducers: {
    setCommunityData: (state, action) => {
      state.communityData = action.payload;
    },
  },
});

export const { setCommunityData } = communitySlice.actions;

export default communitySlice.reducer;
