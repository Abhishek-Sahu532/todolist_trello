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
    registerUserSuccess: (state, action) => {
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
    signinUserSuccess: (state, action) => {
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


    currentUserRequest: (state) => {
      state.loading = true;
    },
    currentUserSucess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.success = true;
    },
    currentUserFailure: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  registerUserRequest,
  registerUserSuccess,
  registerUserFailure,
  signinUserRequest,
  signinUserSuccess,
  signinUserFailure,
  signoutUserSucess,
  signoutUserFailure,
  currentUserRequest,
  currentUserSucess,
  currentUserFailure
} = userSlice.actions;

export default userSlice.reducer;
