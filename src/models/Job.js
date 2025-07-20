
import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true },
  companyName: { type: String, required: true },
  companyLogo: { type: String },
  jobDescription: { type: String, required: true },
  jobType: { type: String, required: true },
  experienceLevel: { type: String, required: true },
  category: { type: String, required: true },
  requiredSkills: [{ type: String }],
  location: { type: String, required: true },
  salaryMin: { type: Number, required: true },
  salaryMax: { type: Number, required: true },
  deadline: { type: Date },
  isTestRequired: { type: Boolean, default: false },
  openings: { type: Number },
  contactEmail: { type: String, required: true },
  recruiter: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  applications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Application' }],
  createdAt: { type: Date, default: Date.now },
  jobTitle: { type: String, required: true },
  companyName: { type: String, required: true },
  companyLogo: { type: String }, // URL from Cloudinary or UploadThing
  jobDescription: { type: String, required: true },
  jobType: { type: String, required: true }, // "Full-time", "Part-time", etc.
  experienceLevel: { type: String, required: true }, // "Junior", "Mid", "Senior"
  requiredSkills: [{ type: String }], // e.g., ["React", "Node.js"]
  salaryMin: { type: Number, required: true },
  salaryMax: { type: Number, required: true },
  deadline: { type: Date },
  isTestRequired: { type: Boolean, default: false },
  openings: { type: Number },
  contactEmail: { type: String, required: true },
  recruiter: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  applications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Application' }],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Job || mongoose.model('Job', JobSchema);
