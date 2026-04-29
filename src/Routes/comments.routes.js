import { Router } from "express";

const router = Router();
import {
    addComment,
    deleteComment,
    getCommentsByTask
} from "../Controllers/comment.controller.js";

router.route("/tasks/:taskId/comments").post(addComment)
.get(getCommentsByTask)
router.route("/:id").delete(deleteComment)



export default router;