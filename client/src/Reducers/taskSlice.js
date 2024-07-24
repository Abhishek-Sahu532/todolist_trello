import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  task: {},
  error: null,
  loading: false,
  success: false,
};

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addATaskRequest: (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    },
    addATaskSuccess: (state, action) => {
      state.task = action.payload;
      state.loading = false;
      state.success = true;
      state.error = null;
    },
    addATaskFailure: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },
    editATaskRequest: (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    },
    editATaskSuccess: (state, action) => {
      state.task = action.payload;
      state.loading = false;
      state.success = true;
      state.error = null;
    },
    editATaskFailure: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },
    deleteATaskRequest: (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    },
    deleteATaskSuccess: (state, action) => {
      state.task = action.payload;
      state.loading = false;
      state.success = true;
      state.error = null;
    },
    deleteATaskFailure: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },
  },
});

export const {
  addATaskRequest,
  addATaskSuccess,
  addATaskFailure,
  editATaskRequest,
  editATaskSuccess,
  editATaskFailure,
  deleteATaskRequest,
  deleteATaskSuccess,
  deleteATaskFailure,
} = taskSlice.actions;

export default taskSlice.reducer;
