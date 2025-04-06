const express = require("express");
const User = require("../models/User");  // Import the User model
const authMiddleware = require("../middleware/authMiddleware");  // Ensure this verifies JWT

const router = express.Router();

// ✅ GET Logged-in User's Username
router.get("/me", authMiddleware, async (req, res) => {
  try {
    // `req.user.userId` should be extracted from JWT by authMiddleware
    const user = await User.findById(req.user.userId).select("username"); // Get only username

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, username: user.username });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
