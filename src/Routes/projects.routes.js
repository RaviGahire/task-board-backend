import { Router } from "express";
const router = Router();

// ─────────────────────────────────────────
// Project Controllers
// ─────────────────────────────────────────
import {
    getAllProjects,
    createProject,
    updateProject,
    deleteProject,
    getProjectById,

} from "../Controllers/project.controller.js";

//List all projects with task count per status
router.route('/').get(getAllProjects)
    //Create a new project 
    .post(createProject);

router.route('/:id')
    //Get project details including its tasks
    .get(getProjectById)
    //Update a project
    .put(updateProject)
    //Delete a project and all associated data
    .delete(deleteProject);

export default router;