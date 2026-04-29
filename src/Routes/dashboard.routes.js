import { Router } from "express";

const router = Router();

// ─────────────────────────────────────────
// Dashboard Controllers
// ─────────────────────────────────────────
import { getDashboardSummary } from "../Controllers/dashboard.controller.js";

router.route("/").get(getDashboardSummary)


export default router;