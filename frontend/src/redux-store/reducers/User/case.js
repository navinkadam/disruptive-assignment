export function handlePending(state) {
  state.loaded = false;
  state.loading = true;
}

export function logoutFulfilled(state, action) {
  state.loaded = true;
  state.loading = false;
}

export function logoutRejected(state, action) {
  state.loaded = true;
  state.loading = false;
}

export function loginSignupFulfilled(state, action) {
  state.loaded = true;
  state.loading = false;
  state.redirect = true;
  state.ui_error = false;
  state.ui_error_msg = "";
}

export function loginSignupRejected(state, action) {
  state.loaded = true;
  state.loading = false;
  state.redirect = true;
  state.ui_error = false;
  state.ui_error_msg = action.payload.message;
}

export function getUserDataFulfilled(state, action) {
  state.loaded = true;
  state.loading = false;
  state.profile = action?.payload?.data;
  state.appInitialized = true;
}

export function getUserDataRejected(state, action) {
  state.loaded = true;
  state.loading = false;
  state.profile = {};
  state.appInitialized = true;
}
