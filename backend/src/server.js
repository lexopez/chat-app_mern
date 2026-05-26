import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import dns from "node:dns/promises";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { io, server, app } from "./lib/socket.js";

dotenv.config();

if (process.env.NODE_ENV === "development") {
  dns.setServers(["1.1.1.1", "1.0.0.1"]);
}

const PORT = process.env.PORT || 5001;

// app.use(express.json());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);
// app.use(cors());

app.get("/api/health", (req, res) => res.send("OK"));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/messages", messageRoutes);

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../frontend/dist")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
//   });
// }

server.listen(PORT, () => {
  connectDB();
  console.log("Server is running on port: ", PORT);
});
