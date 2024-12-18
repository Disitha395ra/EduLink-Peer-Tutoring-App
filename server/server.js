const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const morgan = require("morgan");

// Load environment variables
dotenv.config();

// Import routes
const userRoutes = require("./routes/authRoute");
const courseRoutes = require("./routes/courseRoute"); // Import course routes
const enrollmentRoutes = require("./routes/enrollmentRoute");
const instructorRoutes = require("./routes/instructorRoute");
// Import database configuration
const database = require("./config/db");

// Import custom middleware (if required)
const authMiddleware = require("./middlewares/authMiddleware"); // Example authentication middleware

// Initialize Express app
const app = express();

// Define the port
const PORT = process.env.PORT || 4000;

// Connect to the database
database.connect();

// Middleware setup
app.use(express.json()); 
app.use(cookieParser()); 
app.use(cors()); 
app.use(morgan("dev")); 

// File upload configuration
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

// Define routes

// Public routes
app.use("/api/v1/courses", courseRoutes); // Course routes are accessible without auth

// Protected routes
app.use("/api/v1/auth", userRoutes); // Authentication required (if implemented in middleware)

app.use("/api/v1/enrollment", enrollmentRoutes);
app.use("/api/v1/instructor", instructorRoutes);

// Default route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running successfully",
  });
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`App is running at http://localhost:${PORT}`);
});
