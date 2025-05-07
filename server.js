const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();
const port = 3000;

// Enable CORS for your frontend
app.use(cors());

// Serve static files (your HTML, CSS, JS)
app.use(express.static("public"));

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Files will be saved in the "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Use the original filename
  },
});

const upload = multer({ storage });

// Handle CSV upload
app.post("/upload", upload.single("csvFile"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  res.send("File uploaded successfully!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});