import { Schema, model } from "mongoose";
import { ARTICLE_STATUSES, Article } from "./article.types";

const articleSchema = new Schema<Article>(
  {
    article_id: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 200,
    },
    content: {
      type: String,
      required: true,
      minlength: 20,
    },
    author_id: {
      type: String,
      required: true,
      index: true,
      trim: true,
    },
    category_id: {
      type: String,
      required: true,
      index: true,
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ARTICLE_STATUSES,
      default: "draft",
      index: true,
    },
    thumbnail_url: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

articleSchema.index({ createdAt: -1 });
articleSchema.index({ category_id: 1, status: 1, createdAt: -1 });
articleSchema.index({ author_id: 1, status: 1, createdAt: -1 });

export const ArticleModel = model<Article>("Article", articleSchema);
