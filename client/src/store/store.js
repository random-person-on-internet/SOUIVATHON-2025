import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";

const store = configureStore({
  // reducers here later
  reducer: {
    auth: authReducer,
  },
});

export default store;
