import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminOnly } from "../middlewares/admin.middleware.js";
import { 
  dashboardStats, 
  updateUserRole, 
  updateUserStatus 
} from "../controllers/admin/admin.controller.js";

const router = express.Router();

//creatig dashboard and it will go throught different middlewares
router.get("/dashboard", authMiddleware, adminOnly, dashboardStats);

//to update the role
//when frontend call: .../api/admin/users/${user._id}/role
router.patch("/users/:id/role", authMiddleware, adminOnly, updateUserRole);

//to make the status updating
//when frontend call: .../api/admin/users/${user._id}/status
router.patch("/users/:id/status", authMiddleware, adminOnly, updateUserStatus);

export default router;