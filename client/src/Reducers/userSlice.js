import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: {},
  error: null,
  loading: false,
  success: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    registerUserRequest: (state) => {
      state.loading = true;
    },
    registerUserSucess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.success = true;
    },
    registerUserFailure: (state, action) => {
      state.error = action.payload;
    },

    signinUserRequest: (state) => {
      state.loading = true;
    },
    signinUserSucess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.success = true;
    },
    signinUserFailure: (state, action) => {
      state.error = action.payload;
    },

    signoutUserSucess: (state, action) => {
      state.loading = false;
      state.currentUser = {};
      state.success = true;
    },
    signoutUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.success = false;
    },
  },
});

export const {
  registerUserRequest,
  registerUserSucess,
  registerUserFailure,
  signinUserRequest,
  signinUserSucess,
  signinUserFailure,
  signoutUserSucess,
  signoutUserFailure,
} = userSlice.actions;

export default userSlice.reducer;
