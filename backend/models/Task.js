const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true},
    description: { type: String },
    completed: { type: Boolean, default: false},
    priority: {
        type: String,
        enum: ["High", "Medium", "Low"],
        default: "Medium"
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    groupId : { type: mongoose.Schema.Types.ObjectId, ref: "TaskGroup" },
}, { timestamps: true });

module.exports = mongoose.model("Task", TaskSchema);