import mongoose from "mongoose";
import { Schema } from "mongoose";

const commentSchema = new mongoose.Schema({
  taskId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Task', 
    required: true 
  },
  author: { 
    type: String, 
    required: true, 
    maxlength: 50 
  },
  body: { 
    type: String, 
    required: true, 
    maxlength: 500 
  }
}, { 
  timestamps: { createdAt: true, updatedAt: false } 
});


export const Comment = mongoose.model("Comment" , commentSchema)