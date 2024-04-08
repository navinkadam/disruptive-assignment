export function handlePending(state) {
  state.loaded = false;
  state.loading = true;
}

export function getContentByIdFulfilled(state, action) {
  state.loaded = true;
  state.loading = false;
  state.singleContent = action?.payload?.data;
}

export function getContentByIdRejected(state, action) {
  state.loaded = true;
  state.loading = false;
  state.singleContent = {};
}

export function createAndUpdateContentFulfilled(state, action) {
  state.loaded = true;
  state.loading = false;
  state.ui_error = true;
  state.ui_error_msg = "";
}

export function createAndUpdateContentRejected(state, action) {
  state.loaded = true;
  state.loading = false;
  state.ui_error = false;
  state.ui_error_msg = action.payload.message;
}

export function getAllContentFulfilled(state, action) {
  console.log("getAllContent action.payload", action);
  state.loaded = true;
  state.loading = false;
  state.lists = action?.payload?.data || [];
}

export function getAllContentRejected(state, action) {
  state.loaded = true;
  state.loading = false;
  state.lists = [];
}
