import express from 'express'
import cors from 'cors'
export const app = express()

// ─────────────────────────────────────────
// MIDDLEWARES
// ─────────────────────────────────────────
app.use(cors({
    origin: process.env.CORS_ORIGIN || "*", 
    credentials: true
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// ─────────────────────────────────────────
// ROUTES IMPORT & DECLARATION
// ─────────────────────────────────────────
import projectsRouter from "./Routes/projects.routes.js";
import tasksRouter from "./Routes/tasks.routes.js";
import commentsRouter from "./Routes/comments.routes.js";
// import dashboardRouter from "./Routes/dashboard.routes.js";

// ─────────────────────────────────────────
// ENDPOINTS
// ─────────────────────────────────────────
app.use("/api/v1/projects", projectsRouter); 
app.use("/api/v1/tasks", tasksRouter);       
app.use("/api/v1/comments", commentsRouter); 
// app.use("/api/dashboard", dashboardRouter); 