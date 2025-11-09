import mongoose from "mongoose";

const formSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dob: { type: Date, required: true },
  message: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model("FormData", formSchema);
