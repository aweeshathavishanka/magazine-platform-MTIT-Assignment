import { Router } from "express";
import { validateRequest } from "../../common/middlewares/validateRequest";
import { asyncHandler } from "../../common/utils/asyncHandler";
import { articleController } from "./article.controller";
import {
  articleIdParamSchema,
  createArticleSchema,
  listArticlesQuerySchema,
  updateArticleSchema,
} from "./article.validation";

export const articleRouter = Router();

articleRouter.post(
  "/articles",
  validateRequest(createArticleSchema),
  asyncHandler(articleController.createArticle.bind(articleController)),
);

articleRouter.get(
  "/articles",
  validateRequest(listArticlesQuerySchema),
  asyncHandler(articleController.getAllArticles.bind(articleController)),
);

articleRouter.get(
  "/articles/:id",
  validateRequest(articleIdParamSchema),
  asyncHandler(articleController.getArticleById.bind(articleController)),
);

articleRouter.put(
  "/articles/:id",
  validateRequest(updateArticleSchema),
  asyncHandler(articleController.updateArticle.bind(articleController)),
);

articleRouter.delete(
  "/articles/:id",
  validateRequest(articleIdParamSchema),
  asyncHandler(articleController.deleteArticle.bind(articleController)),
);

articleRouter.patch(
  "/articles/:id/publish",
  validateRequest(articleIdParamSchema),
  asyncHandler(articleController.publishArticle.bind(articleController)),
);

articleRouter.patch(
  "/articles/:id/unpublish",
  validateRequest(articleIdParamSchema),
  asyncHandler(articleController.unpublishArticle.bind(articleController)),
);
