import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDb.js";
import { app, server } from "./socket/socket.js";
// const express = require('express'); - to avoid importing in this manner we added "type":"module" in package.json file
// const dotenv = require('dotenv');


const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  // root path - https://localhost:5000/
  res.send("Server running!!");
});

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server running on port ${PORT}.`);
});
