import express from "express";
import {
  signup,
  signin,
  verifyotp,
  GetUser,
} from "../controllers/user.controller";
import  auth  from '../middleware/authorization'
const router = express.Router();

router.post("/register", signup);
router.post("/login", signin);
router.post("/verify-otp", verifyotp);
router.get("/Getuser", auth, GetUser);

export default router;
