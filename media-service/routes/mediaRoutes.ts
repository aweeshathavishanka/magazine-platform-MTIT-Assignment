import express from 'express';
const router = express.Router();
import * as mediaController from '../controllers/mediaController';

/**
 * @swagger
 * tags:
 *   name: Media
 *   description: Media upload and management
 */

/**
 * @swagger
 * /api/v1/media:
 *   post:
 *     summary: Upload new media
 *     tags: [Media]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               file_name:
 *                 type: string
 *               file_type:
 *                 type: string
 *               file_size:
 *                 type: integer
 *               uploaded_by:
 *                 type: string
 *               url:
 *                 type: string
 *     responses:
 *       201:
 *         description: Media uploaded successfully
 */
router.post('/', mediaController.uploadMedia as any);

/**
 * @swagger
 * /api/v1/media:
 *   get:
 *     summary: Get all media with pagination
 *     tags: [Media]
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
 *         name: uploaded_by
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Media fetched successfully
 */
router.get('/', mediaController.getAllMedia as any);

/**
 * @swagger
 * /api/v1/media/{id}:
 *   get:
 *     summary: Get media by Media ID
 *     tags: [Media]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Media fetched successfully
 */
router.get('/:id', mediaController.getMediaById as any);

/**
 * @swagger
 * /api/v1/media/{id}:
 *   put:
 *     summary: Update media by Media ID
 *     tags: [Media]
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
 *               file_name:
 *                 type: string
 *               file_type:
 *                 type: string
 *               title:
 *                 type: string
 *     responses:
 *       200:
 *         description: Media updated successfully
 */
router.put('/:id', mediaController.updateMedia as any);

/**
 * @swagger
 * /api/v1/media/{id}:
 *   delete:
 *     summary: Delete media by Media ID
 *     tags: [Media]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Media deleted successfully
 */
router.delete('/:id', mediaController.deleteMedia as any);

export default router;