import { Request, Response } from "express";
import { HTTP_STATUS } from "../../common/utils/httpStatus";
import { sendResponse } from "../../common/utils/sendResponse";
import { categoryService } from "./category.service";

export class CategoryController {
  async createCategory(req: Request, res: Response): Promise<void> {
    const created = await categoryService.createCategory(req.body);

    sendResponse(res, {
      success: true,
      message: "Category created successfully",
      statusCode: HTTP_STATUS.CREATED,
      data: {
        category_id: created.category_id,
        name: created.name,
      },
    });
  }

  async getAllCategories(req: Request, res: Response): Promise<void> {
    const result = await categoryService.getAllCategories({
      page: req.query.page ? Number(req.query.page) : undefined,
      limit: req.query.limit ? Number(req.query.limit) : undefined,
    });

    sendResponse(res, {
      success: true,
      message: "Categories fetched successfully",
      statusCode: HTTP_STATUS.OK,
      data: result.categories.map((category) => ({
        category_id: category.category_id,
        name: category.name,
        description: category.description,
      })),
    });
  }

  async getCategoryById(req: Request, res: Response): Promise<void> {
    const category = await categoryService.getCategoryById(req.params.id);

    sendResponse(res, {
      success: true,
      message: "Category fetched successfully",
      statusCode: HTTP_STATUS.OK,
      data: {
        category_id: category.category_id,
        name: category.name,
        description: category.description,
      },
    });
  }

  async updateCategory(req: Request, res: Response): Promise<void> {
    const category = await categoryService.updateCategory(
      req.params.id,
      req.body,
    );

    sendResponse(res, {
      success: true,
      message: "Category updated successfully",
      statusCode: HTTP_STATUS.OK,
      data: {
        category_id: category.category_id,
        name: category.name,
      },
    });
  }

  async deleteCategory(req: Request, res: Response): Promise<void> {
    await categoryService.deleteCategory(req.params.id);

    sendResponse(res, {
      success: true,
      message: "Category deleted successfully",
      statusCode: HTTP_STATUS.OK,
      data: {
        category_id: req.params.id,
      },
    });
  }

  async getArticlesByCategory(req: Request, res: Response): Promise<void> {
    const articles = await categoryService.getArticlesByCategory(req.params.id);

    sendResponse(res, {
      success: true,
      message: "Articles fetched successfully for category",
      statusCode: HTTP_STATUS.OK,
      data: articles,
    });
  }
}

export const categoryController = new CategoryController();
