import { StatusCodes } from "http-status-codes";
import userModel from "../models/user.js";
import jwt from "jsonwebtoken";

export async function register(req, res) {
  const user = req.body;
  try {
    const createdUser = await userModel.create(user);

    const userInfo = {
      _id: createdUser._id,
      createdAt: new Date(),
    };
    const token = jwt.sign(userInfo, process.env.AUTH_SECRET);
    createdUser.password = undefined;

    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "You have registered",
      data: createdUser,
      token,
    });
  } catch (err) {
    if (err instanceof Error && "code" in err) {
      if (err.code === 11000) {
        res.status(400).json({
          success: false,
          message: "user already exist",
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Invalid user validation",
          error: err,
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: "Unknown error",
        error: err,
      });
    }
  }
}
