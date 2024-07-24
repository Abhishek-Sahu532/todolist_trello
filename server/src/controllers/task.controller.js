import { User } from "../models/user.model.js";
import { Task } from "../models/task.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";

import { ApiResponse } from "../utils/apiResponse.js";
import { uploadOnCloudinary } from "../utils/fileUpload.js";

//check authentication
export const createATask = asyncHandler(async (req, res) => {
  //get user details
  const { title, description } = req.body;
  const user = await User.findById(req.user._id);
  if (!user) {
    throw new ApiError(400, "User not found.");
  }

  //validate user details
  if ([title, description].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "Please fill all the required fields.");
  }

  //get task image form local storage

  const getTaskImageFromLocal = req.files?.taskimage[0]?.path;

  if (!getTaskImageFromLocal) {
    throw new ApiError(400, "Please upload avatar file.");
  }

  //upload task image file on Cloudinary
  const uploadTaskImage = await uploadOnCloudinary(getTaskImageFromLocal);

  if (!uploadTaskImage) {
    throw new ApiError(404, "File not upload on Cloudinary");
  }

  const newTask = await Task.create({
    title,
    description,
    taskImage: uploadTaskImage.url,
    createdBy: user._id,
  });

  if (!newTask) {
    throw new ApiError(400, "Error while creating task.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, newTask, "Task created successfully!!!"));
});

export const editUserTask = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  const { taskId } = req.params;
  const user = await User.findById(req.user._id);
  if (!user) {
    throw new ApiError(400, "User not found.");
  }
  const updatedTask = await Task.findByIdAndUpdate(
    taskId,
    {
      $set: {
        title,
        description,
      },
    },
    { new: true }
  );

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedTask, "Task details updated successfully.")
    );
});

export const deleteUserTask = asyncHandler(async (req, res) => {
  const { taskId } = req.params;
  const user = await User.findById(req.user._id);
  if (!user) {
    throw new ApiError(400, "User not found.");
  }
  const deleteTask = await Task.findByIdAndDelete(taskId);

  if (!deleteTask) {
    throw new ApiError(400, "Error while deleting task.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Task deleted successfully."));
});
