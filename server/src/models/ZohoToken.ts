import mongoose from "mongoose";

const zohoTokenSchema = new mongoose.Schema({
  access_token: { type: String, required: true },
  refresh_token: { type: String, required: true },
  expires_in: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("ZohoToken", zohoTokenSchema);
