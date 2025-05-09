const mongoose = require("mongoose");

const TaskGroupSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String},
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

module.exports = mongoose.model("TaskGroup", TaskGroupSchema);