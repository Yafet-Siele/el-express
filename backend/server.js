import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import contactRoute from "./routes/contact.js";

const app = express();

app.use(cors({
  origin: [
    "https://main.d3ke6u6bu2iadw.amplifyapp.com",
    "http://localhost:3000",
  ]
}));

app.use(express.json());

app.use("/api/contact", contactRoute);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  });