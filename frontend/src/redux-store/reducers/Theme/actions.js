import { createAsyncThunk } from "@reduxjs/toolkit";

import apiAxios from "../apiAxios";

export const getAllTheme = createAsyncThunk(
  "GET_ALL_THEME",
  async (params, { rejectWithValue }) => {
    try {
      const result = await apiAxios.get("/theme", params);
      return result.data;
    } catch (error) {
      rejectWithValue(error);
      // alert(error.message);
    }
  }
);

export const createTheme = createAsyncThunk(
  "CREATE_THEME",
  async (params, { rejectWithValue, dispatch }) => {
    try {
      const result = await apiAxios.post("/theme", params);
      dispatch(getAllTheme());
      return result.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const updateTheme = createAsyncThunk(
  "UPDATE_THEME",
  async (params, { rejectWithValue, dispatch }) => {
    try {
      const result = await apiAxios.put(`/theme/${params._id}`, params);
      dispatch(getAllTheme());
      return result.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
