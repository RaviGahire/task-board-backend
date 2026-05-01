import { Router } from "express";

const router = Router();

// ─────────────────────────────────────────
// Task Controllers
// ─────────────────────────────────────────
import {
    createTask,
    deleteTask,
    getTaskById,
    getTasksByProject,
    updateTask
} from "../Controllers/tasks.controller.js";

router.route('/project/:projectId/tasks')
    .get(getTasksByProject)
    .post(createTask)

router.route("/:id").get(getTaskById)
    .put(updateTask)
    .delete(deleteTask)


export default router;





