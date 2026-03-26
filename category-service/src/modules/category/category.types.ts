export interface Category {
  category_id: string;
  name: string;
  slug: string;
  description?: string;
  parent_id?: string;
  is_active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryListQuery {
  page?: number;
  limit?: number;
  is_active?: boolean;
  parent_id?: string;
}
