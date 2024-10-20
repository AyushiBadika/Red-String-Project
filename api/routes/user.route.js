import express from "express";
import { deleteUser, getUser, updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/:id", verifyToken, getUser);
router.post("/update", verifyToken, updateUser);
router.delete("/delete", verifyToken, deleteUser);

export default router;
