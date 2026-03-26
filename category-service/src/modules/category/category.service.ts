import { v4 as uuidv4 } from "uuid";
import { AppError } from "../../common/errors/AppError";
import { HTTP_STATUS } from "../../common/utils/httpStatus";
import { Category, CategoryListQuery } from "./category.types";
import { CategoryRepository } from "./category.repository";

interface CreateCategoryInput {
  name: string;
  slug: string;
  description?: string;
  parent_id?: string;
  is_active?: boolean;
}

interface UpdateCategoryInput {
  name?: string;
  slug?: string;
  description?: string;
  parent_id?: string;
  is_active?: boolean;
}

export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async createCategory(payload: CreateCategoryInput): Promise<Category> {
    const existingSlug = await this.categoryRepository.findBySlug(payload.slug);

    if (existingSlug) {
      throw new AppError(
        `Slug "${payload.slug}" is already taken`,
        HTTP_STATUS.CONFLICT,
      );
    }

    const entity: Category = {
      category_id: uuidv4(),
      name: payload.name,
      slug: payload.slug,
      description: payload.description,
      parent_id: payload.parent_id,
      is_active: payload.is_active ?? true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return this.categoryRepository.create(entity);
  }

  async getAllCategories(query: CategoryListQuery) {
    return this.categoryRepository.findAll(query);
  }

  async getCategoryById(categoryId: string): Promise<Category> {
    const category =
      await this.categoryRepository.findByCategoryId(categoryId);

    if (!category) {
      throw new AppError("Category not found", HTTP_STATUS.NOT_FOUND);
    }

    return category;
  }

  async updateCategory(
    categoryId: string,
    payload: UpdateCategoryInput,
  ): Promise<Category> {
    if (payload.slug) {
      const existing = await this.categoryRepository.findBySlug(payload.slug);
      if (existing && existing.category_id !== categoryId) {
        throw new AppError(
          `Slug "${payload.slug}" is already taken`,
          HTTP_STATUS.CONFLICT,
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
    const deleted =
      await this.categoryRepository.deleteByCategoryId(categoryId);

    if (!deleted) {
      throw new AppError("Category not found", HTTP_STATUS.NOT_FOUND);
    }
  }
}

export const categoryService = new CategoryService(new CategoryRepository());
