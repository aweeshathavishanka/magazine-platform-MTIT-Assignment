import { NextFunction, Request, Response } from 'express';
import Subscription from '../models/subscription.model';

const buildErrorResponse = (code: number, message: string) => ({
  status: 'error',
  code,
  message,
  service: 'subscription-service',
  timestamp: new Date().toISOString(),
});

export const createSubscription = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId, plan, endDate, status } = req.body;

    if (!userId || !plan || !endDate) {
      res
        .status(400)
        .json(buildErrorResponse(400, 'userId, plan and endDate are required'));
      return;
    }

    if (endDate && isNaN(new Date(endDate).getTime())) {
      res.status(400).json(buildErrorResponse(400, 'Invalid endDate format'));
      return;
    }

    if (new Date(endDate) <= new Date()) {
      res.status(400).json(buildErrorResponse(400, 'endDate must be in the future'));
      return;
    }

    const existingActiveSubscription = await Subscription.findOne({
      userId,
      plan,
      status: 'active',
    });

    if (existingActiveSubscription) {
      res.status(400).json(
        buildErrorResponse(
          400,
          'Active subscription already exists for this user and plan'
        )
      );
      return;
    }

    const subscription = new Subscription({
      userId,
      plan,
      endDate,
      status,
    });

    const savedSubscription = await subscription.save();

    res.status(201).json({
      success: true,
      message: 'Subscription created successfully',
      statusCode: 201,
      data: {
        subscriptionId: savedSubscription.subscriptionId,
        userId: savedSubscription.userId,
        plan: savedSubscription.plan,
        status: savedSubscription.status,
        startDate: savedSubscription.startDate,
        endDate: savedSubscription.endDate,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getAllSubscriptions = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const subscriptions = await Subscription.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: 'Subscriptions fetched successfully',
      statusCode: 200,
      data: subscriptions,
    });
  } catch (error) {
    next(error);
  }
};

export const getSubscriptionById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const subscription = await Subscription.findOne({
      subscriptionId: req.params.id,
    });

    if (!subscription) {
      res.status(404).json(buildErrorResponse(404, 'Subscription not found'));
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Subscription fetched successfully',
      statusCode: 200,
      data: subscription,
    });
  } catch (error) {
    next(error);
  }
};

export const getSubscriptionsByUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const subscriptions = await Subscription.find({ userId: req.params.userId }).sort({
      createdAt: -1,
    });

    if (subscriptions.length === 0) {
      res
        .status(404)
        .json(buildErrorResponse(404, 'No subscriptions found for this user'));
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Subscriptions fetched successfully',
      statusCode: 200,
      data: subscriptions,
    });
  } catch (error) {
    next(error);
  }
};

export const updateSubscription = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { plan, status, endDate } = req.body;

    if (endDate && isNaN(new Date(endDate).getTime())) {
      res.status(400).json(buildErrorResponse(400, 'Invalid endDate format'));
      return;
    }

    if (endDate && new Date(endDate) <= new Date()) {
      res.status(400).json(buildErrorResponse(400, 'endDate must be in the future'));
      return;
    }

    const updateData: {
      plan?: string;
      status?: string;
      endDate?: string | Date;
    } = {};

    if (plan !== undefined) {
      updateData.plan = plan;
    }

    if (status !== undefined) {
      updateData.status = status;
    }

    if (endDate !== undefined) {
      updateData.endDate = endDate;
    }

    if (Object.keys(updateData).length === 0) {
      res.status(400).json(
        buildErrorResponse(400, 'At least one of plan, status or endDate must be provided')
      );
      return;
    }

    const updatedSubscription = await Subscription.findOneAndUpdate(
      { subscriptionId: req.params.id },
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedSubscription) {
      res.status(404).json(buildErrorResponse(404, 'Subscription not found'));
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Subscription updated successfully',
      statusCode: 200,
      data: updatedSubscription,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteSubscription = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const existingSubscription = await Subscription.findOne({
      subscriptionId: req.params.id,
    });

    if (!existingSubscription) {
      res.status(404).json(buildErrorResponse(404, 'Subscription not found'));
      return;
    }

    await Subscription.deleteOne({ subscriptionId: req.params.id });

    res.status(200).json({
      success: true,
      message: 'Subscription deleted successfully',
      statusCode: 200,
      data: { subscriptionId: req.params.id },
    });
  } catch (error) {
    next(error);
  }
};
