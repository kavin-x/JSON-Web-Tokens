import mongoose, { model } from "mongoose";

const userSchema = new mongoose.Schema({
  userName: { type: String, default: null },
  password: { type: String },
  token: { type: String },
});

export const userModel = new model("user", userSchema);
