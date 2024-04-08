import { createSlice } from "@reduxjs/toolkit";
import { getUserData, login, logout, signUp } from "./actions";
import {
  getUserDataFulfilled,
  handlePending,
  loginSignupFulfilled,
  loginSignupRejected,
  logoutFulfilled,
  logoutRejected,
  getUserDataRejected,
} from "./case";

const initialState = {
  loading: false,
  loaded: true,
  redirect: false,
  ui_error: false,
  profile: {},
  appInitialized: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: { ...initialState },
  reducers: {
    setUserData: (state, action) => {
      state = { ...state, ...(action.payload || {}) };
    },
  },
  extraReducers: (_) => {
    const addCase = _.addCase;

    addCase(signUp.pending, handlePending);
    addCase(signUp.fulfilled, loginSignupFulfilled);
    addCase(signUp.rejected, loginSignupRejected);

    addCase(login.pending, handlePending);
    addCase(login.fulfilled, loginSignupFulfilled);
    addCase(login.rejected, loginSignupRejected);

    addCase(logout.pending, handlePending);
    addCase(logout.fulfilled, logoutFulfilled);
    addCase(logout.rejected, logoutRejected);

    addCase(getUserData.pending, handlePending);
    addCase(getUserData.fulfilled, getUserDataFulfilled);
    addCase(getUserData.rejected, getUserDataRejected);
  },
});

export { getUserData, login, logout, signUp };
export const { setUserData } = userSlice.actions;
export default userSlice.reducer;
