const Task = require("../models/task.model");

// create task
exports.createTask = async (req, res) => {
  try {
    const task = await Task.create({
      title: req.body.title,
      description: req.body.description,

      createdBy: req.user.id,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// get all tasks
exports.getTasks = async (req, res) => {
  try {
    let tasks;

    // admin sees all tasks
    if (req.user.role === "admin") {
      tasks = await Task.find().populate("createdBy", "name email");
    }

    // normal user sees own tasks
    else {
      tasks = await Task.find({
        createdBy: req.user.id,
      });
    }

    res.json(tasks);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// update task
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    // permission check
    const isOwner = task.createdBy.toString() === req.user.id;

    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        message: "Not allowed",
      });
    }

    // update fields
    task.title = req.body.title || task.title;

    task.description = req.body.description || task.description;

    await task.save();

    res.json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// delete task (admin only)
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    await task.deleteOne();

    res.json({
      message: "Task deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
