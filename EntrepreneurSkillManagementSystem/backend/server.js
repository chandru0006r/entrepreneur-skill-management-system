import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo"; // Store sessions in MongoDB
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import skillRoutes from "./routes/skillRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";


dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use("/api/chat", chatRoutes);
// CORS Configuration (Allow frontend to send cookies)
app.use(
  cors({
      origin: "http://localhost:5173", // Update this to match your frontend URL
      credentials: true, // Allow cookies (session-based auth)
      methods: "GET,POST,PUT,DELETE",
      allowedHeaders: "Content-Type,Authorization",
    })
  );
  

// Configure session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || "yourSecretKey",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI, // Store session in MongoDB
      collectionName: "sessions",
    }),
    cookie: {
      secure: process.env.NODE_ENV === "production", // Set to true in HTTPS
      httpOnly: true,
      maxAge: 1000 * 60 * 60, // 1 hour session
    },
  })
);

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/skills", skillRoutes);

// Global Error Handling
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ message: "Server Error" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
