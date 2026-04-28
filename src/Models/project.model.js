import mongoose from "mongoose";
import { Schema } from "mongoose";

const projectSchema = new Schema({
  name: { 
    type: String, 
    required: true, 
    maxlength: 100, 
    unique: true, 
    trim: true 
  },
  description: { 
    type: String, 
    maxlength: 300 
  }
}, { 
  timestamps: true 
});

// ─────────────────────────────────────────
// Delete Tasks and their Comments when Project is deleted
// ─────────────────────────────────────────
projectSchema.pre('findOneAndDelete', async function(next) {
  const doc = await this.model.findOne(this.getQuery());
  if (doc) {
    await mongoose.model('Task').deleteMany({ projectId: doc._id });
  }
  next();
});




export const Project = mongoose.model("Project",projectSchema)