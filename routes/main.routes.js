import express from "express";
import postRouter from "./posts.routes.js";

const router = express.Router();

// Delegate to resource routers
router.use("/posts", postRouter);

export default router;