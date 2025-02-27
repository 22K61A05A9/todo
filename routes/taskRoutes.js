const express = require("express");
const {getTasks, createTask, updateTask, deleteTask}= require("../controllers/taskControllers");

const router = express.Router();

router.get("/tasks", getTasks);          // Fetch all tasks
router.post("/tasks",createTask);        // Add a new task
router.patch("/tasks/:id", updateTask);     // Update a task
router.delete("/tasks/:id",deleteTask);  // Delete a task

module.exports = router;