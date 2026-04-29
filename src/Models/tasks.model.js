import mongoose from "mongoose";
import { Schema } from "mongoose";

const taskSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  title: {
    type: String,
    required: true,
    maxlength: 150
  },
  description: {
    type: String,
    maxlength: 1000
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Critical'],
    default: 'Medium'
  },
  status: {
    type: String,
    enum: ['Todo', 'InProgress', 'Review', 'Done'],
    default: 'Todo'
  },
  dueDate: {
    type: Date,
    validate: {
      validator: function (value) {
        if (!this.isNew) return true;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return value >= today;
      },
      message: 'Due date must be today or in the future.'
    }
  }
}, {
  timestamps: true
});


// ─────────────────────────────────────────
// Delete comments when Task is deleted
// ─────────────────────────────────────────
taskSchema.pre('deleteMany', { document: false, query: true }, 
  async function (next) {
  const tasks = await this.model.find(this.getFilter());
  const ids = tasks.map(t => t._id);
  await mongoose.model('Comment').deleteMany({ taskId: { $in: ids } });
  next();
});

export const Task = mongoose.model("Task", taskSchema)