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
      unique: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

categorySchema.index({ createdAt: -1 });

export const CategoryModel = model<Category>("Category", categorySchema);
