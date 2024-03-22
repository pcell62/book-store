import express from "express";

import {
  getUserById,
  loginUser,
  signupUser,
} from "../controllers/userControllers.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/signup", signupUser);
router.get("/:id", getUserById);

export default router;
