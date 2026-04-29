import mongoose from "mongoose";
import { Schema } from "mongoose";

const commentSchema = new mongoose.Schema({
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
    required: [true, "TaskId is required"]
  },
  author: {
    type: String,
    required: [true, "Author is required"],
    maxlength: 50,
    trim: true
  },
  body: {
    type: String,
    required: [true, "Comment body is required"],
    maxlength: 300,
    trim: true
  }
}, {
  timestamps: { createdAt: true, updatedAt: false }
});


export const Comment = mongoose.model("Comment", commentSchema)