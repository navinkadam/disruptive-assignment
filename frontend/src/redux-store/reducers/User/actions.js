import apiAxios from "../apiAxios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const signUp = createAsyncThunk(
  "SIGNUP",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await apiAxios.post("/app/signup", payload);
      return { data };
    } catch (error) {
      rejectWithValue(error);
      // alert(error.message);
    }
  }
);

export const getUserData = createAsyncThunk(
  "GET_USER_DATA",
  async (_, { rejectWithValue }) => {
    try {
      const result = await apiAxios.get("/user/me");
      return result.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk(
  "LOGOUT",
  async (_, { rejectWithValue }) => {
    try {
      await apiAxios.post("/app/logout");
      window.location.replace("/");
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const login = createAsyncThunk(
  "LOGIN",
  async (payload, { rejectWithValue }) => {
    try {
      await apiAxios.post("/app/login", payload);
      window.location.reload();
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
