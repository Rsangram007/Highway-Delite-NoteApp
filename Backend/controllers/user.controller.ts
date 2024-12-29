import User from "../models/user.model";
import { Request, Response } from "express";
import {sendOTP} from '../utils/sendotp'
import jwt from "jsonwebtoken";


interface CustomRequest extends Request {
  user?: { userId: string };
}
// Signup Controller
export const signup = async (req: Request, res: Response) => {
  try {
    const { name, dob, email } = req.body;
    const generateOTP = () => {
      return Math.floor(100000 + Math.random() * 900000).toString(); //  
    };

    const otp = generateOTP();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({ name, dob, email, otp });
    await user.save();
    await sendOTP(email, otp);

    res.status(201).json({ success: true, message: "OTP sent to your email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const verifyotp = async (req: Request, res: Response) => {
  const { email, otp } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || user.otp !== otp)
      return res.status(400).json({ error: "Invalid OTP" });
    // console.log("user", user);
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        name: user.name,
      },

      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Signin Controller
export const signin = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    user.otp = otp;
    await user.save();
    await sendOTP(email, otp);
    res.status(200).json({ message: "OTP sent for login." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
export const GetUser = async (req: CustomRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    let user = req.user.userId;
    console.log("GEt user", req.user.userId);
    let data = await User.findById({ _id:user });
    console.log("data", data);
    if (!data) return res.status(404).json({ message: "user Not found" });

    res.status(200).json({ message: "USER sent Sucessfully",  data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
