import { configureStore } from "@reduxjs/toolkit";
import managerReducer from "../reducers/managerReducer";
import contractReducer from "../reducers/contractReducer";
import tbaReducer from "../reducers/tbaReducer";
import communityReducer from "../reducers/communityReducer";
import dashboardReducer from "../reducers/dashboardReducer";

export default configureStore({
  reducer: {
    manager: managerReducer,
    contract: contractReducer,
    tba: tbaReducer,
    community: communityReducer,
    dashboard: dashboardReducer,
  },
});
