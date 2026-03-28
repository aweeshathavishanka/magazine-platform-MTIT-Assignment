export const ARTICLE_STATUSES = ["draft", "published"] as const;

export type ArticleStatus = (typeof ARTICLE_STATUSES)[number];

export interface Article {
  article_id: string;
  title: string;
  content: string;
  author_id: string;
  category_id: string;
  tags: string[];
  status: ArticleStatus;
  thumbnail_url?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ArticleListQuery {
  page?: number;
  limit?: number;
  category_id?: string;
  author_id?: string;
  status?: ArticleStatus;
}
