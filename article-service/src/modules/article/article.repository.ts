import { FilterQuery } from "mongoose";
import { ArticleModel } from "./article.model";
import { Article, ArticleListQuery } from "./article.types";

interface ArticleListResult {
  articles: Article[];
  total: number;
  page: number;
  limit: number;
}

export class ArticleRepository {
  async create(payload: Article): Promise<Article> {
    const created = await ArticleModel.create(payload);
    return created.toObject();
  }

  async findByArticleId(articleId: string): Promise<Article | null> {
    return ArticleModel.findOne({ article_id: articleId }).lean<Article>().exec();
  }

  async findAll(query: ArticleListQuery): Promise<ArticleListResult> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;

    const filter: FilterQuery<Article> = {};

    if (query.category_id) {
      filter.category_id = query.category_id;
    }

    if (query.author_id) {
      filter.author_id = query.author_id;
    }

    if (query.status) {
      filter.status = query.status;
    }

    const skip = (page - 1) * limit;

    const [articles, total] = await Promise.all([
      ArticleModel.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean<Article>()
        .exec(),
      ArticleModel.countDocuments(filter)
    ]);

    return {
      articles,
      total,
      page,
      limit
    };
  }

  async updateByArticleId(articleId: string, update: Partial<Article>): Promise<Article | null> {
    return ArticleModel.findOneAndUpdate({ article_id: articleId }, update, {
      new: true,
      runValidators: true
    })
      .lean<Article>()
      .exec();
  }

  async deleteByArticleId(articleId: string): Promise<boolean> {
    const result = await ArticleModel.deleteOne({ article_id: articleId }).exec();
    return result.deletedCount > 0;
  }
}
