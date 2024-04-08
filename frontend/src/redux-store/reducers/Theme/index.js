import { createSlice } from "@reduxjs/toolkit";
import { getAllTheme, createTheme, updateTheme } from "./actions";
import {
  createAndUpdateThemeFulfilled,
  createAndUpdateThemeRejected,
  getAllThemeFulfilled,
  getAllThemeRejected,
  handlePending,
} from "./case";

const initialState = {
  loading: false,
  loaded: true,
  redirect: false,
  ui_error: false,
  themes: [],
};

const SliceObj = createSlice({
  name: "theme",
  initialState: { ...initialState },
  reducers: {
    setProductData: (state, action) => {
      state = { ...state, ...(action.payload || {}) };
    },
  },
  extraReducers: (_) => {
    const addCase = _.addCase;

    addCase(createTheme.pending, handlePending);
    addCase(createTheme.fulfilled, createAndUpdateThemeFulfilled);
    addCase(createTheme.rejected, createAndUpdateThemeRejected);

    addCase(updateTheme.pending, handlePending);
    addCase(updateTheme.fulfilled, createAndUpdateThemeFulfilled);
    addCase(updateTheme.rejected, createAndUpdateThemeRejected);

    addCase(getAllTheme.pending, handlePending);
    addCase(getAllTheme.fulfilled, getAllThemeFulfilled);
    addCase(getAllTheme.rejected, getAllThemeRejected);
  },
});

export { createTheme, updateTheme, getAllTheme };
export const { setProductData } = SliceObj.actions;
export default SliceObj.reducer;
