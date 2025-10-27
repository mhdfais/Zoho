import { configureStore } from "@reduxjs/toolkit";
import zohoReducer from "./zohoSlice";

export const store = configureStore({
  reducer: {
    zoho: zohoReducer,
  },
});
