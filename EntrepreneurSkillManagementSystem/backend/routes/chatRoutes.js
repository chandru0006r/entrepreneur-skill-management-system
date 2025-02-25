import express from "express";

const router = express.Router();

router.post("/", async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ message: "Prompt is required" });
    }

    const aiReply = `AI Response: ${prompt.split("").reverse().join("")}`;

    res.json({ reply: aiReply });
});

export default router;
