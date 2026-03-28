import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import studentRoutes from "./routes/studentRoutes.js";   // ⭐ IMPORTANT

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors());

// ⭐ THIS LINE CREATES /students API
app.use("/students", studentRoutes);

app.get("/", (req,res)=>{
  res.send("API Working 🚀")
})

app.listen(5000, () => console.log("Server running 🚀"));