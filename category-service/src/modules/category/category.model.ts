import { Schema, model } from "mongoose";
import { Category } from "./category.types";

const categorySchema = new Schema<Category>(
  {
    category_id: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      minlength: 2,
      maxlength: 100,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    parent_id: {
      type: String,
      index: true,
      trim: true,
    },
    is_active: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

categorySchema.index({ createdAt: -1 });
categorySchema.index({ is_active: 1, createdAt: -1 });
categorySchema.index({ parent_id: 1, is_active: 1 });

export const CategoryModel = model<Category>("Category", categorySchema);
