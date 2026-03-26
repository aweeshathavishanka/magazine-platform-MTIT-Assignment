import { v4 as uuidv4 } from "uuid";
import { AppError } from "../../common/errors/AppError";
import { HTTP_STATUS } from "../../common/utils/httpStatus";
import { Article, ArticleListQuery, ArticleStatus } from "./article.types";
import { ArticleRepository } from "./article.repository";

interface CreateArticleInput {
  title: string;
  content: string;
  author_id: string;
  category_id: string;
  tags: string[];
  status?: ArticleStatus;
  thumbnail_url?: string;
}

interface UpdateArticleInput {
  title?: string;
  content?: string;
  category_id?: string;
  tags?: string[];
  status?: ArticleStatus;
  thumbnail_url?: string;
}

export class ArticleService {
  constructor(private readonly articleRepository: ArticleRepository) {}

  async createArticle(payload: CreateArticleInput): Promise<Article> {
    const entity: Article = {
      article_id: uuidv4(),
      title: payload.title,
      content: payload.content,
      author_id: payload.author_id,
      category_id: payload.category_id,
      tags: payload.tags,
      status: payload.status ?? "draft",
      thumbnail_url: payload.thumbnail_url,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return this.articleRepository.create(entity);
  }

  async getAllArticles(query: ArticleListQuery) {
    return this.articleRepository.findAll(query);
  }

  async getArticleById(articleId: string): Promise<Article> {
    const article = await this.articleRepository.findByArticleId(articleId);

    if (!article) {
      throw new AppError("Article not found", HTTP_STATUS.NOT_FOUND);
    }

    return article;
  }

  async updateArticle(
    articleId: string,
    payload: UpdateArticleInput,
  ): Promise<Article> {
    const updated = await this.articleRepository.updateByArticleId(
      articleId,
      payload,
    );

    if (!updated) {
      throw new AppError("Article not found", HTTP_STATUS.NOT_FOUND);
    }

    return updated;
  }

  async deleteArticle(articleId: string): Promise<void> {
    const deleted = await this.articleRepository.deleteByArticleId(articleId);

    if (!deleted) {
      throw new AppError("Article not found", HTTP_STATUS.NOT_FOUND);
    }
  }

  async publishArticle(articleId: string): Promise<Article> {
    const article = await this.getArticleById(articleId);

    if (article.status === "published") {
      throw new AppError("Article already published", HTTP_STATUS.BAD_REQUEST);
    }

    return this.updateArticle(articleId, { status: "published" });
  }

  async unpublishArticle(articleId: string): Promise<Article> {
    const article = await this.getArticleById(articleId);

    if (article.status === "draft") {
      throw new AppError(
        "Article already in draft state",
        HTTP_STATUS.BAD_REQUEST,
      );
    }

    return this.updateArticle(articleId, { status: "draft" });
  }
}

export const articleService = new ArticleService(new ArticleRepository());
