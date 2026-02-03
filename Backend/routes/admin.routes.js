import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminOnly } from "../middlewares/admin.middleware.js";
import { getDashboardStats } from "../controllers/admin/dashboard.controller.js";

const router = express.Router();

router.get("/dashboard",authMiddleware,adminOnly,getDashboardStats);

export default router;