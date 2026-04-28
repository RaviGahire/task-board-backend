import {Project} from "../Models/project.model.js"


// ─────────────────────────────────────────
// Project Controllers
// ─────────────────────────────────────────

export const createProject = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            message: "Working..."
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Working..."
        })
    }
}