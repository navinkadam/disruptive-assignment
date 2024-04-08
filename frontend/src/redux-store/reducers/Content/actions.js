import { createAsyncThunk } from "@reduxjs/toolkit";

import apiAxios from "../apiAxios";

export const getAllContent = createAsyncThunk(
  "GET_ALL_CONTENT",
  async (params, { rejectWithValue }) => {
    try {
      const result = await apiAxios.get("/content", { params: params });
      return result.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const getContentById = createAsyncThunk(
  "GET_CONTENT_BY_ID",
  async (contentId, { rejectWithValue }) => {
    try {
      const result = await apiAxios.get(`/content/${contentId}`);
      return result.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const createContent = createAsyncThunk(
  "CREATE_CONTENT",
  async (params, { rejectWithValue }) => {
    try {
      const result = await apiAxios.post("/content", params);
      return result.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const updateContent = createAsyncThunk(
  "UPDATE_CONTENT",
  async (params, { rejectWithValue }) => {
    try {
      const result = await apiAxios.put(`/content/${params._id}`, params);
      return result.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const deleteContent = createAsyncThunk(
  "DELETE_CONTENT",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const result = await apiAxios.delete(`/content/${id}`);
      dispatch(getAllContent());
      return result.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
