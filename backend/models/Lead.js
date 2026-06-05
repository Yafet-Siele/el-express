import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema({
  name:      { type: String, required: true },
  email:     { type: String, required: true },
  phone:     { type: String },
  service:   { type: String },
  message:   { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Lead || mongoose.model("Lead", LeadSchema);