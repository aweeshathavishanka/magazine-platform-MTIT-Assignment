import crypto from 'crypto';
import { Document, Schema, model } from 'mongoose';

export interface ISubscription extends Document {
  subscriptionId: string;
  userId: string;
  plan: 'free' | 'standard' | 'premium';
  status: 'active' | 'expired' | 'cancelled';
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const subscriptionSchema = new Schema<ISubscription>(
  {
    subscriptionId: {
      type: String,
      default: () => crypto.randomUUID(),
      unique: true,
      index: true,
    },
    userId: {
      type: String,
      required: true,
    },
    plan: {
      type: String,
      enum: ['free', 'standard', 'premium'],
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'expired', 'cancelled'],
      default: 'active',
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (
        _doc,
        ret: { _id?: unknown; __v?: unknown; [key: string]: unknown }
      ) => {
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

const Subscription = model<ISubscription>('Subscription', subscriptionSchema);

export default Subscription;
