import express from "express";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers";

const router = express.Router();

/**
 * @swagger
<<<<<<< Updated upstream
 * tags:
 *   name: Users
 *   description: User management APIs
=======
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         name:
 *           type: string
 *           description: The name of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *       example:
 *         id: 60d5ecb74b24c72b8c8b4567
 *         name: John Doe
 *         email: john@example.com
>>>>>>> Stashed changes
 */

/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
<<<<<<< Updated upstream
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john@gmail.com
 *               bio:
 *                 type: string
 *               country:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
=======
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Email already exists
>>>>>>> Stashed changes
 */
router.post("/", createUser);

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
<<<<<<< Updated upstream
 *         description: List of users
=======
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
>>>>>>> Stashed changes
 */
router.get("/", getUsers);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
<<<<<<< Updated upstream
 *     summary: Get user by ID
=======
 *     summary: Get a user by ID
>>>>>>> Stashed changes
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
<<<<<<< Updated upstream
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User found
=======
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
>>>>>>> Stashed changes
 *       404:
 *         description: User not found
 */
router.get("/:id", getUserById);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   put:
<<<<<<< Updated upstream
 *     summary: Update user
=======
 *     summary: Update a user by ID
>>>>>>> Stashed changes
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
<<<<<<< Updated upstream
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User updated successfully
=======
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
>>>>>>> Stashed changes
 */
router.put("/:id", updateUser);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   delete:
<<<<<<< Updated upstream
 *     summary: Delete user
=======
 *     summary: Delete a user by ID
>>>>>>> Stashed changes
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
<<<<<<< Updated upstream
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
=======
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
>>>>>>> Stashed changes
 */
router.delete("/:id", deleteUser);

export default router;
