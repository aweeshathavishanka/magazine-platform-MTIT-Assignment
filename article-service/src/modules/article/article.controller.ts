import { Request, Response } from "express";
import { HTTP_STATUS } from "../../common/utils/httpStatus";
import { sendResponse } from "../../common/utils/sendResponse";
import { articleService } from "./article.service";

export class ArticleController {
  async createArticle(req: Request, res: Response): Promise<void> {
    const created = await articleService.createArticle(req.body);

    sendResponse(res, {
      success: true,
      message: "Article created successfully",
      statusCode: HTTP_STATUS.CREATED,
      data: {
        article_id: created.article_id,
        title: created.title,
        status: created.status
      }
    });
  }

  async getAllArticles(req: Request, res: Response): Promise<void> {
    const result = await articleService.getAllArticles({
      page: req.query.page ? Number(req.query.page) : undefined,
      limit: req.query.limit ? Number(req.query.limit) : undefined,
      category_id: req.query.category_id as string | undefined,
      author_id: req.query.author_id as string | undefined,
      status: req.query.status as "draft" | "published" | undefined
    });

    sendResponse(res, {
      success: true,
      message: "Articles fetched successfully",
      statusCode: HTTP_STATUS.OK,
      data: result.articles.map((article) => ({
        article_id: article.article_id,
        title: article.title,
        author_id: article.author_id,
        status: article.status
      }))
    });
  }

  async getArticleById(req: Request, res: Response): Promise<void> {
    const article = await articleService.getArticleById(req.params.id);

    sendResponse(res, {
      success: true,
      message: "Article fetched successfully",
      statusCode: HTTP_STATUS.OK,
      data: article
    });
  }

  async updateArticle(req: Request, res: Response): Promise<void> {
    const article = await articleService.updateArticle(req.params.id, req.body);

    sendResponse(res, {
      success: true,
      message: "Article updated successfully",
      statusCode: HTTP_STATUS.OK,
      data: {
        article_id: article.article_id,
        title: article.title,
        status: article.status
      }
    });
  }

  async deleteArticle(req: Request, res: Response): Promise<void> {
    await articleService.deleteArticle(req.params.id);

    sendResponse(res, {
      success: true,
      message: "Article deleted successfully",
      statusCode: HTTP_STATUS.OK,
      data: {
        article_id: req.params.id
      }
    });
  }

  async publishArticle(req: Request, res: Response): Promise<void> {
    const article = await articleService.publishArticle(req.params.id);

    sendResponse(res, {
      success: true,
      message: "Article published successfully",
      statusCode: HTTP_STATUS.OK,
      data: {
        article_id: article.article_id,
        status: article.status
      }
    });
  }

  async unpublishArticle(req: Request, res: Response): Promise<void> {
    const article = await articleService.unpublishArticle(req.params.id);

    sendResponse(res, {
      success: true,
      message: "Article moved to draft",
      statusCode: HTTP_STATUS.OK,
      data: {
        article_id: article.article_id,
        status: article.status
      }
    });
  }
}

export const articleController = new ArticleController();
