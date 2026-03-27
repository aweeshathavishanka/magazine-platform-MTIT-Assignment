import mongoose, { Document, Schema } from "mongoose";

export interface IComment extends Document {
  comment_id: string;
  article_id: string;
  user_id: string;
  content: string;
  parent_comment_id?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema = new Schema<IComment>(
  {
    comment_id: {
      type: String,
      required: true,
      unique: true
    },
    article_id: {
      type: String,
      required: true,
      trim: true
    },
    user_id: {
      type: String,
      required: true,
      trim: true
    },
    content: {
      type: String,
      required: true,
      trim: true
    },
    parent_comment_id: {
      type: String,
      default: null
    }
  },
  {
    timestamps: true
  }
);

export const Comment = mongoose.model<IComment>("Comment", CommentSchema);