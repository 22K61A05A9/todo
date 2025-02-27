const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");
const errorHandler = require("./middleware/errorHandler");

dotenv.config(); // Load environment variables
const app = express();

app.use(express.json()); // Middleware to handle JSON data
app.use(cors());         // Allow frontend requests

// Connect to MongoDB
connectDB();

// Add a default route for the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the To-Do API');
});

// Routes for tasks
app.use("/api", taskRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
app.use(cors({ origin: "http://localhost:5500" })); // Change port if needed

