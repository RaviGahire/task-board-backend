import { Comment } from "../Models/comment.model.js";
import { Task } from "../Models/tasks.model.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { ApiError } from "../Utils/ApiError.js";


// ─────────────────────────────────────────
// Comment Controllers
// ─────────────────────────────────────────
//Get comments by task id 
export const getCommentsByTask = async (req, res) => {
    try {
        const { taskId } = req.params;

        const taskExists = await Task.findById(taskId);

        if (!taskExists) {
            throw new ApiError(404, "Task not found");

        }
        const comments = await Comment.find({ taskId })
            .sort({ createdAt: -1 });

            // console.log(comments)

        return res.status(200).json(
            new ApiResponse(200, comments, "Comments fetched successfully")
        );
    } catch (error) {
        const statusCode = error.statusCode || 500;
        return res.status(statusCode).json(
            new ApiError(statusCode,
                error.message || "Failed to fetch comments")
        );
    }
};

//add Comment
export const addComment = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { author, body } = req.body;

        // console.log(taskId)

        const task = await Task.findById(taskId);
        if (!task) {
            throw new ApiError(404, "Task not found. Cannot add comment.");
        }

        const comment = await Comment.create({
            taskId,
            author,
            body
        });

        return res.status(201)
            .json(
                new ApiResponse(201, comment, "Comment added successfully")
            );

    } catch (error) {
        const statusCode = error.statusCode || 400;
        return res.status(statusCode).json(
            new ApiError(
                statusCode,
                error.message || "Failed to add comment",
                error.errors || {}
            )
        );
    }
};

//delete comment
export const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;

        const comment = await Comment.findByIdAndDelete(id);

        if (!comment) {
            throw new ApiError(404, "Comment not found");
        }

        return res.status(200).json(
            new ApiResponse(200, null, "Comment deleted successfully")
        );

    } catch (error) {
        const statusCode = error.statusCode || 500;
        return res.status(statusCode).json(
            new ApiError(statusCode, error.message || "Failed to delete comment")
        );
    }
};