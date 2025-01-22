import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
  status: false,
  userData: null,
};

// export slice : name, initial state, reducers
export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload.userData;
    },
    logout: (state, action) => {
      state.status = false;
      state.userData = null;
    },
  },
});

// export all reducers
export const { login, logout } = authSlice.actions;

// export reducer
export default authSlice.reducer;
