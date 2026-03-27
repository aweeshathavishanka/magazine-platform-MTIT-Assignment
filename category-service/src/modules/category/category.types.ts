export interface Category {
  category_id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryListQuery {
  page?: number;
  limit?: number;
}
