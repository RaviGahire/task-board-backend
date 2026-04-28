import dotenv from "dotenv";
import { app } from './app.js';
import { connectDB } from './Config/db/connectDB.js'; 

// ─────────────────────────────────────────
//  Loaded Environment Variables 
// ─────────────────────────────────────────
dotenv.config({path: './.env'});

// ─────────────────────────────────────────
// fallback port
// ─────────────────────────────────────────
const PORT = process.env.PORT || 8000;

// ─────────────────────────────────────────
// Start Server
// ─────────────────────────────────────────
connectDB()
    .then(() => {
        app.on("error", (error) => {
            console.error("Express App Error: ", error);
            throw error;
        });

        app.listen(PORT, () => {
            console.log(`Server is running at port : ${PORT}`);
        });
    })
    .catch((err) => {
        console.log("MongoDB connection failed !!! ", err);
    });