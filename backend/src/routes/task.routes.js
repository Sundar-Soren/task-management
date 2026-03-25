const router = require("express").Router();

const taskController = require("../controllers/task.controller");

const auth = require("../middleware/auth.middleware");

const role = require("../middleware/role.middleware");

const { body } = require("express-validator");

const { validate } = require("../middleware/error.middleware");

// create task

/**
 * @swagger
 * /api/v1/tasks:
 *   post:
 *     summary: Create task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: task created
 */
router.post(
  "/",

  auth,

  body("title").notEmpty(),

  validate,

  taskController.createTask,
);

// get tasks

/**
 * @swagger
 * /api/v1/tasks:
 *   get:
 *     summary: Get tasks
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: list of tasks
 */
router.get("/", auth, taskController.getTasks);

// update task

/**
 * @swagger
 * /api/v1/tasks/{id}:
 *   put:
 *     summary: Update task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: updated
 */
router.put("/:id", auth, taskController.updateTask);

// delete task (admin)

/**
 * @swagger
 * /api/v1/tasks/{id}:
 *   delete:
 *     summary: Delete task (admin)
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: deleted
 */
router.delete("/:id", auth, role("admin"), taskController.deleteTask);

module.exports = router;
