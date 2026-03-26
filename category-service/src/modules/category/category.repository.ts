import { FilterQuery } from "mongoose";
import { CategoryModel } from "./category.model";
import { Category, CategoryListQuery } from "./category.types";

interface CategoryListResult {
  categories: Category[];
  total: number;
  page: number;
  limit: number;
}

export class CategoryRepository {
  async create(payload: Category): Promise<Category> {
    const created = await CategoryModel.create(payload);
    return created.toObject();
  }

  async findByCategoryId(categoryId: string): Promise<Category | null> {
    return CategoryModel.findOne({ category_id: categoryId })
      .lean<Category>()
      .exec();
  }

  async findBySlug(slug: string): Promise<Category | null> {
    return CategoryModel.findOne({ slug }).lean<Category>().exec();
  }

  async findAll(query: CategoryListQuery): Promise<CategoryListResult> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;

    const filter: FilterQuery<Category> = {};

    if (query.is_active !== undefined) {
      filter.is_active = query.is_active;
    }

    if (query.parent_id) {
      filter.parent_id = query.parent_id;
    }

    const skip = (page - 1) * limit;

    const [categories, total] = await Promise.all([
      CategoryModel.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean()
        .exec() as Promise<Category[]>,
      CategoryModel.countDocuments(filter),
    ]);

    return {
      categories,
      total,
      page,
      limit,
    };
  }

  async updateByCategoryId(
    categoryId: string,
    update: Partial<Category>,
  ): Promise<Category | null> {
    return CategoryModel.findOneAndUpdate({ category_id: categoryId }, update, {
      new: true,
      runValidators: true,
    })
      .lean<Category>()
      .exec();
  }

  async deleteByCategoryId(categoryId: string): Promise<boolean> {
    const result = await CategoryModel.deleteOne({
      category_id: categoryId,
    }).exec();
    return result.deletedCount > 0;
  }
}
