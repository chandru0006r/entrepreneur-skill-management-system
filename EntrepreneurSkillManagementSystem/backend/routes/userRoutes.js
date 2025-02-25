import express from "express";
import { registerUser, loginUser, logoutUser, getUserProfile } from "../controllers/userController.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.json({ message: "User API is working!" });
});

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);  // Added Logout Route
router.get("/profile", getUserProfile); // Added Profile Route

export default router;
