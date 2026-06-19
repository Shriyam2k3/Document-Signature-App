const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const fs = require("fs");

const authRoutes = require("./routes/auth");
const documentRoutes = require("./routes/document");
const signatureRoutes = require("./routes/signature");
const auditRoutes = require("./routes/audit");
const dashboardRoutes = require("./routes/dashboard");

const app = express();
app.use(cors());
app.use(express.json());
const uploadDir = path.join(__dirname, "uploads");
const signatureDir = path.join(uploadDir, "signatures");
const signedDir = path.join(uploadDir, "signed");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

if (!fs.existsSync(signatureDir)) {
  fs.mkdirSync(signatureDir);
}

if (!fs.existsSync(signedDir)) {
  fs.mkdirSync(signedDir);
}
app.use("/uploads",express.static(path.join(__dirname, "uploads")));
app.use("/api/auth", authRoutes);
app.use("/api/document",documentRoutes);
app.use("/api/signature",signatureRoutes);
app.use("/api/audit",auditRoutes);
app.use("/api/dashboard",dashboardRoutes);


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

app.listen(process.env.PORT , () => {
    console.log(`Server running`);
});


