import { Router } from "express";
import { validateRequest } from "../../common/middlewares/validateRequest";
import { asyncHandler } from "../../common/utils/asyncHandler";
import { categoryController } from "./category.controller";
import {
  categoryIdParamSchema,
  createCategorySchema,
  listCategoriesQuerySchema,
  updateCategorySchema,
} from "./category.validation";

export const categoryRouter = Router();

categoryRouter.post(
  "/categories",
  validateRequest(createCategorySchema),
  asyncHandler(categoryController.createCategory.bind(categoryController)),
);

categoryRouter.get(
  "/categories",
  validateRequest(listCategoriesQuerySchema),
  asyncHandler(categoryController.getAllCategories.bind(categoryController)),
);

categoryRouter.get(
  "/categories/:id",
  validateRequest(categoryIdParamSchema),
  asyncHandler(categoryController.getCategoryById.bind(categoryController)),
);

categoryRouter.put(
  "/categories/:id",
  validateRequest(updateCategorySchema),
  asyncHandler(categoryController.updateCategory.bind(categoryController)),
);

categoryRouter.delete(
  "/categories/:id",
  validateRequest(categoryIdParamSchema),
  asyncHandler(categoryController.deleteCategory.bind(categoryController)),
);

categoryRouter.get(
  "/categories/:id/articles",
  validateRequest(categoryIdParamSchema),
  asyncHandler(categoryController.getArticlesByCategory.bind(categoryController)),
);
