import { createSlice } from "@reduxjs/toolkit";
import {
  createContent,
  getAllContent,
  getContentById,
  updateContent,
  deleteContent,
} from "./actions";
import {
  createAndUpdateContentFulfilled,
  createAndUpdateContentRejected,
  getAllContentFulfilled,
  getAllContentRejected,
  getContentByIdFulfilled,
  getContentByIdRejected,
  handlePending,
} from "./case";

const initialState = {
  loading: false,
  loaded: true,
  redirect: false,
  ui_error: false,
  singleContent: {},
  lists: [],
};

const SliceObj = createSlice({
  name: "content",
  initialState: { ...initialState },
  reducers: {
    setContentData: (state, action) => {
      state = { ...state, ...(action.payload || {}) };
    },
  },
  extraReducers: (_) => {
    const addCase = _.addCase;

    addCase(createContent.pending, handlePending);
    addCase(createContent.fulfilled, createAndUpdateContentFulfilled);
    addCase(createContent.rejected, createAndUpdateContentRejected);

    addCase(updateContent.pending, handlePending);
    addCase(updateContent.fulfilled, createAndUpdateContentFulfilled);
    addCase(updateContent.rejected, createAndUpdateContentRejected);

    addCase(deleteContent.pending, handlePending);
    addCase(deleteContent.fulfilled, createAndUpdateContentFulfilled);
    addCase(deleteContent.rejected, createAndUpdateContentRejected);

    addCase(getAllContent.pending, handlePending);
    addCase(getAllContent.fulfilled, getAllContentFulfilled);
    addCase(getAllContent.rejected, getAllContentRejected);

    addCase(getContentById.pending, handlePending);
    addCase(getContentById.fulfilled, getContentByIdFulfilled);
    addCase(getContentById.rejected, getContentByIdRejected);
  },
});

export {
  createContent,
  getAllContent,
  getContentById,
  updateContent,
  deleteContent,
};
export const { setContentData } = SliceObj.actions;
export default SliceObj.reducer;
