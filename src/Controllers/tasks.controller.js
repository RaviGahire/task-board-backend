import {Task} from "../Models/tasks.model.js"
import {Comment} from "../Models/comment.model.js"
import { ApiResponse } from "../Utils/ApiResponse.js"
import { ApiError } from "../Utils/ApiError.js"


// ─────────────────────────────────────────
// Tasks Controllers
// ─────────────────────────────────────────

//get task by project id
export const getTasksByProject = async (req, res) => {
    try {
        const { projectId } = req.params;

        // console.log("project",projectId)

        // console.log(projectId)
        const {
            status,
            priority,
            sortBy = 'createdAt',
            sortDir = 'desc',
            page = 1,
            pageSize = 10
        } = req.query;

        // Filter
        const filter = { projectId }
        if (status) {
           return filter.status = status
        }
        if (priority){
            return filter.priority = priority
        }


        //Pagination
        const limit = Math.min(parseInt(pageSize), 50);
        const skip = (parseInt(page) - 1) * limit;

        //Database ops
        const totalCount = await Task.countDocuments(filter);
        const tasks = await Task.find(filter)
            .sort({ [sortBy]: sortDir === 'asc' ? 1 : -1 })
            .skip(skip)
            .limit(limit);

        //Structured res
        return res.status(200).json(new ApiResponse(200, {
            tasks,
            pagination: {
                page: parseInt(page),
                pageSize: limit,
                totalCount,
                totalPages: Math.ceil(totalCount / limit)
            }
        }, "Tasks retrieved successfully"));


    } catch (error) {
        return res.status(500)
            .json(new ApiError(500, error.message));
    }

}

//create task 
export const createTask = async (req, res) => {
    try {
        const { projectId } = req.params;
        console.log("Project Id" , projectId)
        console.log("task data",req.body)
        if (!projectId) {
            throw new ApiError(401, "Please provide project Id")
        }

        const task = await Task.create({ ...req.body, projectId });
``
        return res.status(201)
            .json(new ApiResponse(201, task, "Task created successfully"));
    } catch (error) {
        return res.status(400)
            .json(new ApiError(400, " Task careation failed", error.errors));
    }
};

//get task by id 
export const getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) throw new ApiError(404, "Task not found");

        const comments = await Comment.find({ taskId: task._id }).sort({ createdAt: -1 });

        return res.status(200).json(new ApiResponse(200, { ...task._doc, comments }, "Task details fetched"));
    } catch (error) {
        const statusCode = error.statusCode || 500;
        return res.status(statusCode).json(new ApiError(statusCode, error.message));
    }
};

// update task
export const updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!task) throw new ApiError(404, "Task not found");

        return res.status(200).json(new ApiResponse(200, task, "Task updated successfully"));
    } catch (error) {
        return res.status(400).json(new ApiError(400, "Update failed", error.errors));
    }
};

//delete task by id 
export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            throw new ApiError(404, "Task not found");
        }

        return res.status(200)
            .json(new ApiResponse(200, null, "Task deleted successfully"));
    } catch (error) {
        return res.status(500)
            .json(new ApiError(500, error.message));
    }
};