import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import jwt from "jsonwebtoken";
import { ApiResponse } from "../utils/apiResponse.js";
import { uploadOnCloudinary } from "../utils/fileUpload.js";

const generateAccessAndRefreshToken = async (userId) => {
  //Generate tokens
  const user = await User.findById(userId);
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  //save token in database.
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  // return for user for cookies and method.
  return { accessToken, refreshToken };
};

//register user
const registerUser = asyncHandler(async (req, res) => {
  //get user details
  const { firstName, lastName, email, password } = req.body;
  // console.log(firstName, lastName, email, password)
  //validate user details
  if (
    [firstName, lastName, email, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "Please fill all the required fields.");
  }

  //check exist user
  const existUser = await User.findOne({ email });

  if (existUser) {
    throw new ApiError(409, "User is already exist.");
  }

  //get avatar form local storage

  const getAvatarFromLocal = req.files?.avatar[0]?.path;

  if (!getAvatarFromLocal) {
    throw new ApiError(400, "Please upload avatar file.");
  }

  //upload avatar file on Cloudinary
  const uploadAvatar = await uploadOnCloudinary(getAvatarFromLocal);

  if (!uploadAvatar) {
    throw new ApiError(404, "File not upload on Cloudinary");
  }

  //creating user
  const newUser = await User.create({
    firstName,
    lastName,
    email,
    password,
    avatar: uploadAvatar.url,
  });

  if (!newUser) {
    throw new ApiError(500, "Something went wrong while create user.");
  }

  // Removing password and refresh token for response.
  const createUser = await User.findById(newUser._id).select(
    "-password -refreshToken"
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user: createUser },
        "User registered successfully!!!"
      )
    );
});

const googleAuth = asyncHandler(async (req, res) => {
  const { userName, email, avatar, fullName } = req.body;

  const ExistingUser = req.user;

  if (ExistingUser) {
    throw new ApiError(400, "User already logged in from different user");
  }

  //verify user details
  const user = await User.findOne({ email: req.body.email });

  if (user) {
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id
    );

    const loggedUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    //return response
    const option = {
      httpOnly: true,
      secure: true,
    };

    //return response
    return res
      .status(200)
      .cookie("accessToken", accessToken, option)
      .cookie("refreshToken", refreshToken, option)
      .json(
        new ApiResponse(
          200,
          { user: loggedUser },
          "User logged successfully!!!"
        )
      );
  } else {
    const generatedPassword = Math.random().toString(36).slice(-8);
    const generatedUserName =
      userName.split(" ").join("").toLowerCase() +
      Math.random().toString(36).slice(-4);

    const user = await User.create({
      userName: generatedUserName,
      email: email,
      password: generatedPassword,
      mobile: " ",
      avatar: avatar,
      fullName: fullName,
    });

    const createUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    if (!createUser) {
      throw new ApiError(500, "Something went wrong while create user.");
    }

    //return response
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { user: createUser },
          "User registered successfully!!!"
        )
      );
  }
});

//Login User
const signinUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // console.log(email, password )
  const ExistingUser = req.user;
  // console.log(req.body)

  if (ExistingUser) {
    throw new ApiError(400, "User already logged in from different user");
  }

  if (!email) {
    throw new ApiError(
      400,
      "User details invalid, please fill correct user name or email."
    );
  }

  if (!password) {
    throw new ApiError(400, "Please fill a valid password.");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(401, "User not register with us, please sign up user.");
  }

  const isPasswordIsValid = await user.isPasswordCorrect(password);

  if (!isPasswordIsValid) {
    throw new ApiError(401, "Wrong crediential");
  }
  console.log(user?._id, user);
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user?._id
  );
  console.log("access", accessToken);
  const loggedUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const option = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, option)
    .cookie("refreshToken", refreshToken, option)
    .json(
      new ApiResponse(
        200,
        { user: loggedUser, accessToken: accessToken },
        "User logged successfully!!!"
      )
    );
});

//Logout user
const signoutUser = asyncHandler(async (req, res) => {
  const existingUser = req.user;

  if (!existingUser) {
    throw new ApiError(
      402,
      "User not logged in, Please log in with valid user first."
    );
  }
  await User.findByIdAndUpdate(
    existingUser._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  const option = {
    httpOnly: true,
    secure: true,
  };

  //return response

  return res
    .status(200)
    .clearCookie("accessToken", option)
    .clearCookie("refreshToken", option)
    .json(new ApiResponse(200, {}, "User logout successfully!!!"));
});

//refresh access token
const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized request");
  }

  const decodedToken = jwt.verify(
    incomingRefreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );

  const user = await User.findById(decodedToken?._id);

  if (!user) {
    throw new ApiError(401, "Invalid refresh token.");
  }

  if (incomingRefreshToken !== user?.refreshToken) {
    throw new ApiError(401, "Refresh token is expired or used.");
  }

  const option = {
    httpOnly: true,
    secure: true,
  };

  const { accessToken, newRefreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  return res
    .status(200)
    .cookie("accessToken", accessToken, option)
    .cookie("refreshToken", newRefreshToken, option)
    .json(
      new ApiResponse(
        200,
        { accessToken, refreshToken: newRefreshToken },
        "Access token refreshed successfully!!!"
      )
    );
});

//get current user
const getCurrentUser = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user) {
    throw new ApiError(400, "Please login with correct user details.");
  }

  const loggedUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user: loggedUser },
        "Current user details fetched successfully"
      )
    );
});

//modify account details
const updateUserDetails = asyncHandler(async (req, res) => {
  const { fullName, email, mobile } = req.body;

  if (req.user._id === req.params.id) {
    throw new ApiError(401, "Sorry, You can only view your own listings");
  }

  const getAvatarFromLocal = !req.files.avatar ? "" : req.files.avatar[0].path;
  const getCoverFromLocal = !req.files.avatar ? "" : req.files.cover[0].path;

  //upload avatar file on Cloudinary
  const uploadAvatar = await uploadOnCloudinary(getAvatarFromLocal);
  const uploadCover = await uploadOnCloudinary(getCoverFromLocal);

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        fullName: fullName,
        email: email,
        mobile: mobile,
        avatar: uploadAvatar !== null ? uploadAvatar.url : "",
        cover: uploadCover !== null ? uploadCover.url : "",
      },
    },
    { new: true }
  ).select("-password -refreshToken");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User details updated successfully."));
});

const getUserListing = asyncHandler(async (req, res) => {
  if (req.user._id === req.params.id) {
    throw new ApiError(401, "Sorry, You can only view your own listings");
  }

  const userListing = await Listing.find({ userRef: req.params.id }).populate({
    path: "userRef",
    select: "-password -refreshToken",
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { listings: userListing },
        "Current user listings fetched successfully"
      )
    );
});

export {
  registerUser,
  signinUser,
  signoutUser,
  refreshAccessToken,
  getCurrentUser,
  updateUserDetails,
  googleAuth,
  getUserListing,
};
