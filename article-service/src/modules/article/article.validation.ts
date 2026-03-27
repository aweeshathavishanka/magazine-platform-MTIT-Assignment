import { z } from "zod";
import { ARTICLE_STATUSES } from "./article.types";

const uuidLikeRegex =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const uuidLike = z.string().regex(uuidLikeRegex, "Must be a valid UUID");

export const createArticleSchema = z.object({
  body: z.object({
    title: z
      .string({ required_error: "title is required" })
      .min(5, "title must be at least 5 characters")
      .max(200, "title must be at most 200 characters"),
    content: z
      .string({ required_error: "content is required" })
      .min(20, "content must be at least 20 characters"),
    author_id: uuidLike,
    category_id: uuidLike,
    tags: z.array(z.string().min(1, "tag cannot be empty")).default([]),
    status: z.enum(ARTICLE_STATUSES).default("draft"),
    thumbnail_url: z
      .string()
      .url("thumbnail_url must be a valid URL")
      .optional(),
  }),
});

export const articleIdParamSchema = z.object({
  params: z.object({
    id: uuidLike,
  }),
});

export const updateArticleSchema = z.object({
  params: z.object({
    id: uuidLike,
  }),
  body: z
    .object({
      title: z
        .string()
        .min(5, "title must be at least 5 characters")
        .max(200, "title must be at most 200 characters")
        .optional(),
      content: z
        .string()
        .min(20, "content must be at least 20 characters")
        .optional(),
      category_id: uuidLike.optional(),
      tags: z.array(z.string().min(1, "tag cannot be empty")).optional(),
      status: z.enum(ARTICLE_STATUSES).optional(),
      thumbnail_url: z
        .string()
        .url("thumbnail_url must be a valid URL")
        .optional(),
    })
    .refine((payload) => Object.keys(payload).length > 0, {
      message: "At least one field must be provided for update",
    }),
});

export const listArticlesQuerySchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive().optional(),
    limit: z.coerce.number().int().positive().max(100).optional(),
    category_id: uuidLike.optional(),
    author_id: uuidLike.optional(),
    status: z.enum(ARTICLE_STATUSES).optional(),
  }),
});
