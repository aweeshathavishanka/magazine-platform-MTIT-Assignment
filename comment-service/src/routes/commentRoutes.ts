import { Router } from "express";
import {
  createComment,
  getAllComments,
  getCommentById,
  updateComment,
  deleteComment,
  getCommentsByArticle,
  getCommentsByUser
} from "../controllers/commentController";

const router = Router();

/**
 * @swagger
 * /api/v1/comments:
 *   post:
 *     summary: Create Comment
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [article_id, user_id, content]
 *             properties:
 *               article_id: { type: string, format: uuid }
 *               user_id: { type: string, format: uuid }
 *               content: { type: string }
 *               parent_comment_id: { type: string, nullable: true }
 *     responses:
 *       201: { description: "Comment created successfully" }
 *       400: { description: "Invalid comment data" }
 */
router.post("/", createComment);

/**
 * @swagger
 * /api/v1/comments:
 *   get:
 *     summary: Get All Comments
 *     tags: [Comments]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *       - in: query
 *         name: article_id
 *         schema: { type: string, format: uuid }
 */
router.get("/", getAllComments);

/**
 * @swagger
 * /api/v1/comments/{id}:
 *   get:
 *     summary: Get Comment By ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 */
router.get("/:id", getCommentById);

/**
 * @swagger
 * /api/v1/comments/{id}:
 *   put:
 *     summary: Update Comment
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content: { type: string }
 */
router.put("/:id", updateComment);

/**
 * @swagger
 * /api/v1/comments/{id}:
 *   delete:
 *     summary: Delete Comment
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 */
router.delete("/:id", deleteComment);

/**
 * @swagger
 * /api/v1/comments/article/{articleId}:
 *   get:
 *     summary: Get Comments By Article
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: articleId
 *         required: true
 *         schema: { type: string, format: uuid }
 */
router.get("/article/:articleId", getCommentsByArticle);

/**
 * @swagger
 * /api/v1/comments/user/{userId}:
 *   get:
 *     summary: Get Comments By User
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema: { type: string, format: uuid }
 */
router.get("/user/:userId", getCommentsByUser);

export default router;