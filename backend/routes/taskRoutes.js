const express = require("express");
const Task = require("../models/Task");
const authMiddleware = require("../middleware/authMiddleware");
const { default: mongoose } = require("mongoose");

const router = express.Router();

// Create a New Task
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, description, priority } = req.body;
    
    console.log("Extracted User ID from Token:", req.user.userId); // Debug User ID

    if (!req.user.userId) {
      return res.status(401).json({ success: false, message: "Unauthorized: No user ID found." });
    }

    const task = new Task({
      title,
      description,
      priority: priority || "Medium",
      user: new mongoose.Types.ObjectId(req.user.userId) // Ensure correct ID
    });

    await task.save();
    res.status(201).json({ success: true, task });

  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});


// Get All Tasks for Logged-in User
router.get("/", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ user: new mongoose.Types.ObjectId(req.user.userId) });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE a Task
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId; // Extracted from JWT

    // Find the task and ensure it belongs to the logged-in user
    const task = await Task.findOneAndDelete({ _id: id, user: userId });

    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    res.json({ success: true, message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

//  Toggle Task Completion
router.patch("/:id/toggle-complete", authMiddleware, async (req, res) => {
  try {
      const { id } = req.params;
      const userId = req.user.userId;

      // Find the task that belongs to the user
      const task = await Task.findOne({ _id: id, user: userId });

      if (!task) {
          return res.status(404).json({ success: false, message: "Task not found" });
      }

      // Toggle completed status
      task.completed = !task.completed;
      await task.save();

      res.json({ success: true, message: "Task updated successfully", completed: task.completed });
  } catch (err) {
      res.status(500).json({ success: false, error: err.message });
  }
});


// Task priority
router.patch("/:taskId/priority", authMiddleware, async (req, res) => {
  try {
      const { priority } = req.body;
      const task = await Task.findById(req.params.taskId);

      if (!task) {
          return res.status(404).json({ error: "Task not found" });
      }

      if (!["High", "Medium", "Low"].includes(priority)) {
          return res.status(400).json({ error: "Invalid priority value" });
      }

      task.priority = priority;
      await task.save();

      res.json(task);
  } catch (error) {
      res.status(500).json({ error: "Error updating task priority" });
  }
});


router.post("/group", authMiddleware, async (req, res) => {
  try {
    const { name, description } = req.body;
    const group = new TaskGroup({ name, description });
    await group.save();
    res.status(201).json(group);
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router;
