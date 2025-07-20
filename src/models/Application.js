import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  applicantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  coverLetter: { type: String },
  resumeURL: { type: String },
  appliedAt: { type: Date, default: Date.now },
  applicantScore: { type: Number },
  status: { type: String, enum: ['Pending', 'Reviewed', 'Accepted', 'Rejected'], default: 'Pending' }
});

export default mongoose.models.Application || mongoose.model('Application', ApplicationSchema);
