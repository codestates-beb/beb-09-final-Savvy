import { configureStore } from "@reduxjs/toolkit";
import managerReducer from "../reducers/managerReducer";

export default configureStore({
  reducer: {
    manager: managerReducer,
  },
});
