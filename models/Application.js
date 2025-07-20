import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  applicant: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, default: "pending" },
  appliedAt: { type: Date, default: Date.now },
  // Add other fields as needed
});

export default mongoose.models.Application || mongoose.model("Application", ApplicationSchema);
