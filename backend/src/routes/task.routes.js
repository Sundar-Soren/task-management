const router = require("express").Router();
const { body } = require("express-validator");

const taskController = require("../controllers/task.controller");
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const { validate } = require("../middleware/error.middleware");

// create task
/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management with role-based access
 */

/**
 * @swagger
 * /api/v1/tasks:
 *   post:
 *     summary: Create a new task
 *     description: Logged-in users can create tasks
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Learn JWT
 *     responses:
 *       201:
 *         description: Task created successfully
 */
router.post(
  "/",
  auth,
  body("title").notEmpty(),
  validate,
  taskController.createTask,
);

/**
 * @swagger
 * /api/v1/tasks:
 *   get:
 *     summary: Get tasks
 *     description: |
 *       Role behavior:
 *       - Admin → can see all tasks
 *       - User → can see only own tasks
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of tasks
 */
router.get("/", auth, taskController.getTasks);

/**
 * @swagger
 * /api/v1/tasks/{id}:
 *   put:
 *     summary: Update a task
 *     description: |
 *       Role behavior:
 *       - Admin → can update any task
 *       - User → can update only own task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated task
 *     responses:
 *       200:
 *         description: Task updated
 */
router.put("/:id", auth, taskController.updateTask);

/**
 * @swagger
 * /api/v1/tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     description: Only admin can delete tasks
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task deleted
 */
router.delete("/:id", auth, role("admin"), taskController.deleteTask);

module.exports = router;
