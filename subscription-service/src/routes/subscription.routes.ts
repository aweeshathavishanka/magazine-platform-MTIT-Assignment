import { Router } from 'express';
import {
  createSubscription,
  deleteSubscription,
  getAllSubscriptions,
  getSubscriptionById,
  getSubscriptionsByUser,
  updateSubscription,
} from '../controllers/subscription.controller';

const router = Router();

/**
 * @swagger
 * /api/v1/subscriptions/user/{userId}:
 *   get:
 *     tags: [Subscriptions]
 *     summary: Get all subscriptions by user ID
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User identifier
 *     responses:
 *       200:
 *         description: Subscriptions fetched successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: No subscriptions found for this user
 *       500:
 *         description: Internal server error
 */
router.get('/user/:userId', getSubscriptionsByUser);

/**
 * @swagger
 * /api/v1/subscriptions:
 *   get:
 *     tags: [Subscriptions]
 *     summary: Get all subscriptions
 *     responses:
 *       200:
 *         description: Subscriptions fetched successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */
router.get('/', getAllSubscriptions);

/**
 * @swagger
 * /api/v1/subscriptions:
 *   post:
 *     tags: [Subscriptions]
 *     summary: Create a new subscription
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               plan:
 *                 type: string
 *                 enum: [free, standard, premium]
 *               endDate:
 *                 type: string
 *                 format: date
 *               status:
 *                 type: string
 *                 enum: [active, expired, cancelled]
 *             required:
 *               - userId
 *               - plan
 *               - endDate
 *           example:
 *             userId: abc-123
 *             plan: premium
 *             endDate: '2026-04-24'
 *             status: active
 *     responses:
 *       201:
 *         description: Subscription created successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */
router.post('/', createSubscription);

/**
 * @swagger
 * /api/v1/subscriptions/{id}:
 *   get:
 *     tags: [Subscriptions]
 *     summary: Get subscription by subscription ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Subscription identifier
 *     responses:
 *       200:
 *         description: Subscription fetched successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Subscription not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', getSubscriptionById);

/**
 * @swagger
 * /api/v1/subscriptions/{id}:
 *   put:
 *     tags: [Subscriptions]
 *     summary: Update a subscription
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Subscription identifier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               plan:
 *                 type: string
 *                 enum: [free, standard, premium]
 *               status:
 *                 type: string
 *                 enum: [active, expired, cancelled]
 *               endDate:
 *                 type: string
 *                 format: date
 *           example:
 *             plan: standard
 *             status: active
 *             endDate: '2026-05-24'
 *     responses:
 *       200:
 *         description: Subscription updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Subscription not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', updateSubscription);

/**
 * @swagger
 * /api/v1/subscriptions/{id}:
 *   delete:
 *     tags: [Subscriptions]
 *     summary: Delete a subscription
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Subscription identifier
 *     responses:
 *       200:
 *         description: Subscription deleted successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Subscription not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', deleteSubscription);

export default router;
