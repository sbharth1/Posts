import { Request, Response } from "express";
import dbConnect from "../../db/config/connect";
import User from "../../db/models/userSchema";
import bcrypt from "bcryptjs";
import { generateToken } from "../../utils/jwt";

export const login = async (req: Request, res: Response) => {
  try {
    await dbConnect();

    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: "Both fields are required",
      });
      return;
    }

    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    if (!user.password) {
      res.status(401).json({
        success: false,
        message: "Invalid password",
      });
      return;
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      res.status(401).json({
        success: false,
        message: "Invalid password",
      });
      return;
    }

    const token = generateToken(user._id.toString());

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      data: {
        userId: user._id,
        email: user.email,
      },
    });
    return;
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
    return;
  }
};

