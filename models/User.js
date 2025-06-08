import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  profilePic: { type: String },
  coverPic: { type: String },
  phoneNo: { type: String },
  razorpayID: { type: String },
  razorpaySecret: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});


//                                                      👇 this is the collection name
export default mongoose.models.User || mongoose.model("User", userSchema);
