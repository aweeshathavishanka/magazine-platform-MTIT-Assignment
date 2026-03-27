import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { AppError } from "../../common/errors/AppError";
import { HTTP_STATUS } from "../../common/utils/httpStatus";
import { env } from "../../config/env";
import { Category, CategoryListQuery } from "./category.types";
import { CategoryRepository } from "./category.repository";

interface CreateCategoryInput {
  name: string;
  description?: string;
}

interface UpdateCategoryInput {
  name?: string;
  description?: string;
}

export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async createCategory(payload: CreateCategoryInput): Promise<Category> {
    const existing = await this.categoryRepository.findByName(payload.name);

    if (existing) {
      throw new AppError(
        "Category already exists",
        HTTP_STATUS.CONFLICT,
      );
    }

    const entity: Category = {
      category_id: uuidv4(),
      name: payload.name,
      description: payload.description,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return this.categoryRepository.create(entity);
  }

  async getAllCategories(query: CategoryListQuery) {
    return this.categoryRepository.findAll(query);
  }

  async getCategoryById(categoryId: string): Promise<Category> {
    const category = await this.categoryRepository.findByCategoryId(categoryId);

    if (!category) {
      throw new AppError("Category not found", HTTP_STATUS.NOT_FOUND);
    }

    return category;
  }

  async updateCategory(
    categoryId: string,
    payload: UpdateCategoryInput,
  ): Promise<Category> {
    if (payload.name) {
      const existing = await this.categoryRepository.findByName(payload.name);
      if (existing && existing.category_id !== categoryId) {
        throw new AppError(
          "Invalid update data or category name already exists",
          HTTP_STATUS.BAD_REQUEST,
        );
      }
    }

    const updated = await this.categoryRepository.updateByCategoryId(
      categoryId,
      payload,
    );

    if (!updated) {
      throw new AppError("Category not found", HTTP_STATUS.NOT_FOUND);
    }

    return updated;
  }

  async deleteCategory(categoryId: string): Promise<void> {
    const deleted = await this.categoryRepository.deleteByCategoryId(categoryId);

    if (!deleted) {
      throw new AppError("Category not found", HTTP_STATUS.NOT_FOUND);
    }
  }

  async getArticlesByCategory(categoryId: string): Promise<unknown[]> {
    // Verify category exists first
    await this.getCategoryById(categoryId);

    try {
      const response = await axios.get(
        `${env.articleServiceUrl}/api/v1/articles`,
        { params: { category_id: categoryId } },
      );

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const body = response.data as any;
      return Array.isArray(body.data) ? body.data : [];
    } catch {
      // If article-service is unreachable, return empty list gracefully
      return [];
    }
  }
}

export const categoryService = new CategoryService(new CategoryRepository());
