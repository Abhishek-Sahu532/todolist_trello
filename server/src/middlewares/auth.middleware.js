import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization").replace("Bearer ", "");
    if (token === null) {
      throw new ApiError(401, "UNAUTHORIZED REQUEST");
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken?._id).select(
      "-password,-refreshToken"
    );
    if (!user) {
      throw new ApiError(401, "INVALID ACCESS TOKEN");
    }
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError("401", "INVALID ACCESS TOKEN" || error?.message);
  }
});
