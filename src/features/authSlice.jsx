import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: "",
  loading: false,
  error: false,
  token: "",
};

const authSlice = createSlice({
  name: "auth",

  initialState: {},
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user.username;
      state.token = action.payload.token;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.data.username;
      state.token = action.payload.token;
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
    logoutSuccess: (state) => {
      state.user = "";
      state.loading = false;
      state.token = "";
    },
  },
});

export const {
  fetchStart,
  loginSuccess,
  fetchFail,
  registerSuccess,
  logoutSuccess,
} = authSlice.actions;
export default authSlice.reducer;
