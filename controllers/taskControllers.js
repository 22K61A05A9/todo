//implementing CRUD operations
// get all tasks
const Task=require("../models/Task"); //import task from models to interact sith mongodb.



exports.getTasks = async (req, res) => {
    try {
      const tasks = await Task.find();
      res.json(tasks);
    } catch (err) {
      res.status(500).json({error: err.message });
    }
  };
  
  // Add a new todo
  exports.createTask = async (req, res) => {
    try {
      const { text } = req.body;
      const newTask = new Task({ text });
      await newTask.save();
      res.status(201).json(newTask);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  // Delete a todo
  exports.deleteTask = async (req, res) => {
    try {
      await Task.findByIdAndDelete(req.params.id);
      res.json({ message: "Task deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  
  // Update a todo (toggle completed status)
  exports.updateTask = async (req, res) => {
    try {
      const { text, completed } = req.body;
      const updatedTask = await Task.findByIdAndUpdate(
        req.params.id,
        { text, completed },
        { new: true }
      );
      res.json(updatedTask);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };




