import express from "express";
import { createEvent, getUserEvent, deleteEvent, updateEvent, getEvents, getEvent, registerUser } from "../controllers/event.controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/create", verifyToken, createEvent);
router.get("/events", verifyToken, getUserEvent);
router.delete("/delete/:id", verifyToken, deleteEvent);
router.post("/update/:id", verifyToken, updateEvent);
router.get("/get", getEvents);
router.get("/get/:id", getEvent);
router.post("/register/:id", verifyToken, registerUser);

export default router;
