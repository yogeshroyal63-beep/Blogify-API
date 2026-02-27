import express from "express";
import cors from "cors";

import mainRouter from "./routes/main.routes.js";
import errorHandler from "./middleware/error.middleware.js";

const app = express();

// Global Middleware
app.use(cors());
app.use(express.json());

// Versioned Routing
app.use("/api/v1", mainRouter);

// Centralized Error Handler (MUST be last)
app.use(errorHandler);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});