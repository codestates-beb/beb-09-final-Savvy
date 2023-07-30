import { createSlice } from "@reduxjs/toolkit";

export const contractSlice = createSlice({
  name: "contract",
  initialState: {
    contractData: null,
  },
  reducers: {
    setContractData: (state, action) => {
      state.contractData = action.payload;
    },
  },
});

export const { setContractData } = contractSlice.actions;

export default contractSlice.reducer;
