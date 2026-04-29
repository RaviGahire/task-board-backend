import { Project } from "../Models/project.model.js";
import { Task } from "../Models/tasks.model.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { ApiError } from "../Utils/ApiError.js";

// ─────────────────────────────────────────
// Dashboard Controller
// ─────────────────────────────────────────

export const getDashboardSummary = async (req, res) => {
    try {
        const now = new Date();
        const next7Days = new Date();
        next7Days.setDate(now.getDate() + 7);

        //count projects 
        const totalProjects = await Project.countDocuments();

        //count tasks by status 
        const statusCounts = await Task.aggregate([
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 }
                }
            }
        ])

        const tasksByStatus = {
            Todo: 0,
            InProgress: 0,
            Review: 0,
            Done: 0
        }

        //looping 
        statusCounts.forEach(item => {
            if (tasksByStatus.hasOwnProperty(item._id)) {
                tasksByStatus[item._id] = item.count;
            }
        })

        const overdueCount = await Task.countDocuments({
            dueDate: { $lt: now },
            status: { $ne: "Done" }
        });

        //Due within 7 days

        const upcomingTasks = await Task.find({
            dueDate: {
                $gte: now,
                $lte: next7Days
            },
            status: { $ne: "Done" }
        })
            .sort({ dueDate: 1 })
            .limit(5); // Limit to top 5 for dashboard efficiency

        return res.status(200).json(
            new ApiResponse(200, {
                totalProjects,
                tasksByStatus,
                overdueCount,
                upcomingTasks
            }, "Dashboard summary retrieved successfully")
        );


    } catch (error) {
        return res.status(500).json(
            new ApiError(500, error.message || "Failed to fetch dashboard data")
        );
    }
}