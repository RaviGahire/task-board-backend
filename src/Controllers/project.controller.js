import { Project } from "../Models/project.model.js"
import { ApiResponse } from "../Utils/ApiResponse.js"
import { ApiError } from "../Utils/ApiError.js"
import {Task} from "../Models/tasks.model.js";
// ─────────────────────────────────────────
// Project Controllers
// ─────────────────────────────────────────

//get all projects 

export const getAllProjects = async (req, res) => {
    try {
        const projectsWithCounts = await Project.aggregate([
            {
                $lookup: {
                    from: "tasks",
                    localField: "_id",
                    foreignField: "projectId",
                    as: "tasks"
                }
            },
            {
                $project: {
                    name: 1,
                    description: 1,
                    createdAt: 1,

                    statusSummary: {
                        todo: {
                            $size: {
                                $filter: {
                                    input: "$tasks", as: "t",
                                    cond: { $eq: ["$$t.status", "Todo"] }
                                }
                            }
                        },
                        inProgress: {
                            $size: {
                                $filter: {
                                    input: "$tasks", as: "t",
                                    cond: { $eq: ["$$t.status", "InProgress"] }
                                }
                            }
                        },
                        done: {
                            $size: {
                                $filter: {
                                    input: "$tasks", as: "t",
                                    cond: { $eq: ["$$t.status", "Done"] }
                                }
                            }
                        }
                    },
                    totalTasks: { $size: "$tasks" }
                }
            }
        ]);

        return res.status(200).json(
            new ApiResponse(200, projectsWithCounts, "Projects fetched successfully")
        );

    } catch (error) {

        console.error("Fetch Projects Error:", error);
        return res.status(500).json(
            new ApiError(500, "Internal server error")
        );
    }
};

//create project
export const createProject = async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name) {
            throw new ApiError(400, "Project name is required", { name: "Name is required" });
        }

        const existingProject = await Project.findOne({ name });
        if (existingProject) {

            throw new ApiError(409, "A project with this name already exists", { name: "Project name must be unique" });
        }

        const project = await Project.create({
            name,
            description
        });

        return res.status(201).json(
            new ApiResponse(201, project, "Project created successfully")
        );

    } catch (error) {
        const statusCode = error.statusCode || 400;

        return res.status(statusCode).json(
            new ApiError(
                statusCode,
                error.message || "Failed to create project",
                error.errors || {}
            )
        );
    }
};

//get project by id
export const getProjectById = async (req, res) => {
    try {
        const { id } = req.params;

        const project = await Project.findById(id);

        if (!project) {
            throw new ApiError(404, "Project not found");
        }

        const tasks = await Task.find({ projectId: id }).sort({ createdAt: -1 });

          return res.status(200).json(
            new ApiResponse(
                200, 
                { ...project._doc, tasks }, 
                "Project and tasks fetched successfully"
            )
        );

    } catch (error) {
        const statusCode = error.statusCode || 500;
        return res.status(statusCode).json(
            new ApiError(statusCode, error.message || "Failed to fetch project")
        );
    }
};

//delete project by id
export const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;

        const project = await Project.findByIdAndDelete(id);

        if (!project) {
            throw new ApiError(404, "Project not found");
        }

        return res.status(200).json(
            new ApiResponse(200, null, "Project and all associated tasks deleted successfully")
        );

    } catch (error) {
        const statusCode = error.statusCode || 500;
        return res.status(statusCode).json(
            new ApiError(500, error.message || "Failed to delete project")
        );
    }
};

//update projects
export const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        const project = await Project.findById(id);
        if (!project) {
            throw new ApiError(404, "Project not found");
        }


        if (name && name !== project.name) {
            const nameExists = await Project.findOne({ name });
            if (nameExists) {

                throw new ApiError(409, "A project with this name already exists", { name: "Project name must be unique" });
            }
        }

        const updatedProject = await Project.findByIdAndUpdate(
            id,
            { name, description },
            { new: true, runValidators: true }
        );

        return res.status(200).json(
            new ApiResponse(200, updatedProject, "Project updated successfully")
        );

    } catch (error) {
        const statusCode = error.statusCode || 400;
        return res.status(statusCode).json(
            new ApiError(
                statusCode,
                error.message || "Failed to update project",
                error.errors || {}
            )
        );
    }
};