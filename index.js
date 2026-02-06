require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const addUserRoutes = require("./routes/user");
const revenueRoutes = require("./routes/revenue");

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/images", express.static(path.join(__dirname, "public/images")));

const port = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas Tribal connected"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

app.use("/api", addUserRoutes);
app.use("/api", revenueRoutes);

app.get("/", (req, res) => {
  res.send("Hello world....");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
