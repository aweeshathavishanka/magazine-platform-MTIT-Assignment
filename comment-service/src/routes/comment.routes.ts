import { Router } from "express";
import {
  createComment,
  deleteComment,
  getAllComments,
  getCommentById,
  getCommentsByArticle,
  getCommentsByUser,
  updateComment
} from "../controllers/comment.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Comment Service APIs
 */

/**
 * @swagger
 * /api/v1/comments:
 *   post:
 *     summary: Create a comment
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - article_id
 *               - user_id
 *               - content
 *             properties:
 *               article_id:
 *                 type: string
 *               user_id:
 *                 type: string
 *               content:
 *                 type: string
 *               parent_comment_id:
 *                 type: string
 *                 nullable: true
 *     responses:
 *       201:
 *         description: Comment created successfully
 */
router.post("/", createComment);

/**
 * @swagger
 * /api/v1/comments:
 *   get:
 *     summary: Get all comments
 *     tags: [Comments]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: article_id
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comments fetched successfully
 */
router.get("/", getAllComments);

/**
 * @swagger
 * /api/v1/comments/article/{articleId}:
 *   get:
 *     summary: Get comments by article
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: articleId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comments fetched successfully
 */
router.get("/article/:articleId", getCommentsByArticle);

/**
 * @swagger
 * /api/v1/comments/user/{userId}:
 *   get:
 *     summary: Get comments by user
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User comments fetched successfully
 */
router.get("/user/:userId", getCommentsByUser);

/**
 * @swagger
 * /api/v1/comments/{id}:
 *   get:
 *     summary: Get comment by ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comment fetched successfully
 */
router.get("/:id", getCommentById);

/**
 * @swagger
 * /api/v1/comments/{id}:
 *   put:
 *     summary: Update comment
 *     tags: [Comments]
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
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comment updated successfully
 */
router.put("/:id", updateComment);

/**
 * @swagger
 * /api/v1/comments/{id}:
 *   delete:
 *     summary: Delete comment
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 */
router.delete("/:id", deleteComment);

export default router;