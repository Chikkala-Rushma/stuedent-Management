const express = require("express");
const dotenv = require("dotenv")
const mongoose = require("mongoose");
const studentRoutes = require("./routes/studentRoutes");

dotenv.config();
const app = express();
// Middleware to parse JSON
app.use(express.json());

const PORT = process.env.PORT || 300;
const mongoURI = process.env.MONGO_URI; 
console.log("MongoDB URI:", mongoURI);
mongoose.connect("mongodb+srv://rushma:Ch%40newton75@studentmangement.uqjde.mongodb.net/StudentManagement?retryWrites=true&w=majority&ssl=true", {
    // directConnection: true
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));
  
app.use("/v1/students", studentRoutes);
// Home Route
app.get("/", (req, res) => {
  res.send("Hello, Node.js Backend!");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

