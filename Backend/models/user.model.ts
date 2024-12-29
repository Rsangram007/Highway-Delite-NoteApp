import mongoose from "mongoose";

interface UserDocument extends Document {
  name: string;
  dob: Date;
  email: string;
  otp: string;
}

const userSchema = new mongoose.Schema<UserDocument>({
  name: String,
  dob: Date,
  email: { type: String, unique: true },
  otp: String,
});

const User: mongoose.Model<UserDocument> = mongoose.model("User", userSchema);
export default User;
