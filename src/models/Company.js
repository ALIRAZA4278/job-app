import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
  name: String,
  industry: String,
  location: String,
  logo: String,
  size: String,
  openPositions: Number,
  description: String,
  website: String,
});

export default mongoose.models.Company || mongoose.model('Company', companySchema);
