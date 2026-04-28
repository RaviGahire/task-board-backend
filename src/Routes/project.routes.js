import { Router } from "express";
const router = Router();


// ─────────────────────────────────────────
// Project Controllers
// ─────────────────────────────────────────
import { 
    createProject
 } from "../Controllers/project.controller.js";


router.route('/').get(createProject)



export default router;