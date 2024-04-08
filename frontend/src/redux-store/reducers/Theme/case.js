export function handlePending(state) {
  state.loaded = false;
  state.loading = true;
}

export function createAndUpdateThemeFulfilled(state, action) {
  state.loaded = true;
  state.loading = false;
  state.ui_error = true;
  state.ui_error_msg = "";
}

export function createAndUpdateThemeRejected(state, action) {
  state.loaded = true;
  state.loading = false;
  state.ui_error = false;
  state.ui_error_msg = action.payload.message;
}

export function getAllThemeFulfilled(state, action) {
  state.loaded = true;
  state.loading = false;
  state.themes = action?.payload?.data || [];
}

export function getAllThemeRejected(state, action) {
  state.loaded = true;
  state.loading = false;
  state.themes = [];
}
