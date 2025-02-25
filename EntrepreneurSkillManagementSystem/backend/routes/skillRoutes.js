import express from 'express';
import { createOrUpdateSkills, getUserSkills } from '../controllers/skillController.js';

const router = express.Router();

router.get("/", (req, res) => {
    res.json({ message: "User API is working!" });
});
// Create or update user skills
router.post('/assign', createOrUpdateSkills);

// Get user skills
router.get('/assign/:userId', getUserSkills);

export default router;