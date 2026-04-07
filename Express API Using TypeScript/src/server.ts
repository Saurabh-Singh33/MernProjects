import express from "express";
import employeesRouter from "./routes/employees";
import { connectDB } from "./db";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use("/employees", employeesRouter);

// Health check
app.get("/", (req, res) => {
  res.send("Express API with TypeScript is running!");
});

// Start server after database connects
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start server:", error);
  });
