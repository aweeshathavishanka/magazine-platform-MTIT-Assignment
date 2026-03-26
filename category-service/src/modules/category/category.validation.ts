import { z } from "zod";

const uuidLikeRegex =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const uuidLike = z.string().regex(uuidLikeRegex, "Must be a valid UUID");

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const createCategorySchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: "name is required" })
      .min(2, "name must be at least 2 characters")
      .max(100, "name must be at most 100 characters"),
    slug: z
      .string({ required_error: "slug is required" })
      .min(2, "slug must be at least 2 characters")
      .max(100, "slug must be at most 100 characters")
      .regex(slugRegex, "slug must be lowercase letters, numbers and hyphens only"),
    description: z
      .string()
      .max(500, "description must be at most 500 characters")
      .optional(),
    parent_id: uuidLike.optional(),
    is_active: z.boolean().default(true),
  }),
});

export const categoryIdParamSchema = z.object({
  params: z.object({
    id: uuidLike,
  }),
});

export const updateCategorySchema = z.object({
  params: z.object({
    id: uuidLike,
  }),
  body: z
    .object({
      name: z
        .string()
        .min(2, "name must be at least 2 characters")
        .max(100, "name must be at most 100 characters")
        .optional(),
      slug: z
        .string()
        .min(2, "slug must be at least 2 characters")
        .max(100, "slug must be at most 100 characters")
        .regex(slugRegex, "slug must be lowercase letters, numbers and hyphens only")
        .optional(),
      description: z
        .string()
        .max(500, "description must be at most 500 characters")
        .optional(),
      parent_id: uuidLike.optional(),
      is_active: z.boolean().optional(),
    })
    .refine((payload) => Object.keys(payload).length > 0, {
      message: "At least one field must be provided for update",
    }),
});

export const listCategoriesQuerySchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive().optional(),
    limit: z.coerce.number().int().positive().max(100).optional(),
    is_active: z
      .string()
      .optional()
      .transform((val) => {
        if (val === "true") return true;
        if (val === "false") return false;
        return undefined;
      }),
    parent_id: uuidLike.optional(),
  }),
});
