const express = require("express");
const Task = require("../models/Task");
const authMiddleware = require("../middleware/authMiddleware");
const { default: mongoose } = require("mongoose");

const router = express.Router();

// ✅ Create a New Task
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, description } = req.body;
    const task = new Task({ title, description, user: new mongoose.Types.ObjectId(req.user.Id) });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get All Tasks for Logged-in User
router.get("/", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ user: new mongoose.Types.ObjectId(req.user.Id) });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Update a Task
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, completed },
      { new: true }
    );
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Delete a Task
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
