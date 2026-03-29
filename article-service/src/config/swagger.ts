import swaggerJsdoc from "swagger-jsdoc";
import { env } from "./env";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Article Service API",
      version: "1.0.0",
      description:
        "RESTful API for managing magazine articles in MTIT Assignment 2 platform",
    },
    servers: [
      {
        url: env.swaggerDevUrl,
        description: "Development server",
      },
      {
        url: env.swaggerProdUrl,
        description: "Production server",
      },
    ],
    components: {
      schemas: {
        Article: {
          type: "object",
          properties: {
            article_id: {
              type: "string",
              format: "uuid",
              description: "Unique article identifier",
              example: "550e8400-e29b-41d4-a716-446655440000",
            },
            title: {
              type: "string",
              minLength: 5,
              maxLength: 200,
              description: "Article title",
              example: "Introduction to Artificial Intelligence",
            },
            content: {
              type: "string",
              minLength: 20,
              description: "Article content",
              example:
                "This article explains the fundamentals of artificial intelligence, machine learning, and deep learning concepts for beginners.",
            },
            author_id: {
              type: "string",
              format: "uuid",
              description: "Author ID",
              example: "550e8400-e29b-41d4-a716-446655440010",
            },
            category_id: {
              type: "string",
              format: "uuid",
              description: "Category ID",
              example: "550e8400-e29b-41d4-a716-446655440001",
            },
            tags: {
              type: "array",
              items: {
                type: "string",
              },
              description: "Article tags",
              example: ["AI", "Technology", "Machine Learning"],
            },
            status: {
              type: "string",
              enum: ["draft", "published"],
              description: "Article status",
              example: "published",
            },
            thumbnail_url: {
              type: "string",
              format: "uri",
              description: "Article thumbnail URL",
              example: "https://example.com/images/ai-article.jpg",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Article creation timestamp",
              example: "2026-03-26T14:13:01.149Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Article last update timestamp",
              example: "2026-03-26T14:13:01.149Z",
            },
          },
          required: [
            "article_id",
            "title",
            "content",
            "author_id",
            "category_id",
            "status",
            "createdAt",
            "updatedAt",
          ],
        },
        CreateArticleRequest: {
          type: "object",
          properties: {
            title: {
              type: "string",
              minLength: 5,
              maxLength: 200,
              example: "Introduction to Artificial Intelligence",
            },
            content: {
              type: "string",
              minLength: 20,
              example:
                "This article explains the fundamentals of artificial intelligence, machine learning, and deep learning concepts for beginners.",
            },
            author_id: {
              type: "string",
              format: "uuid",
              example: "550e8400-e29b-41d4-a716-446655440000",
            },
            category_id: {
              type: "string",
              format: "uuid",
              example: "550e8400-e29b-41d4-a716-446655440001",
            },
            tags: {
              type: "array",
              items: {
                type: "string",
              },
              example: ["AI", "Technology", "Machine Learning"],
            },
            status: {
              type: "string",
              enum: ["draft", "published"],
              default: "draft",
              example: "draft",
            },
            thumbnail_url: {
              type: "string",
              format: "uri",
              example: "https://example.com/images/ai-article.jpg",
            },
          },
          required: ["title", "content", "author_id", "category_id"],
        },
        UpdateArticleRequest: {
          type: "object",
          properties: {
            title: {
              type: "string",
              minLength: 5,
              maxLength: 200,
              example: "Introduction to Artificial Intelligence",
            },
            content: {
              type: "string",
              minLength: 20,
              example:
                "This article explains the fundamentals of artificial intelligence, machine learning, and deep learning concepts for beginners.",
            },
            category_id: {
              type: "string",
              format: "uuid",
              example: "550e8400-e29b-41d4-a716-446655440001",
            },
            tags: {
              type: "array",
              items: {
                type: "string",
              },
              example: ["AI", "Technology", "Machine Learning"],
            },
            status: {
              type: "string",
              enum: ["draft", "published"],
              example: "published",
            },
            thumbnail_url: {
              type: "string",
              format: "uri",
              example: "https://example.com/images/ai-article.jpg",
            },
          },
        },
        SuccessResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
            },
            message: {
              type: "string",
            },
            statusCode: {
              type: "integer",
            },
            data: {
              type: "object",
            },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            status: {
              type: "string",
              enum: ["error"],
            },
            code: {
              type: "integer",
            },
            message: {
              type: "string",
            },
            service: {
              type: "string",
            },
            timestamp: {
              type: "string",
              format: "date-time",
            },
          },
        },
      },
    },
    paths: {
      "/api/v1/health": {
        get: {
          summary: "Health check",
          tags: ["Health"],
          responses: {
            "200": {
              description: "Service is healthy",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/SuccessResponse",
                  },
                },
              },
            },
          },
        },
      },
      "/api/v1/articles": {
        post: {
          summary: "Create article",
          tags: ["Articles"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/CreateArticleRequest",
                },
              },
            },
          },
          responses: {
            "201": {
              description: "Article created successfully",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/SuccessResponse",
                  },
                },
              },
            },
            "400": {
              description: "Invalid request data",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ErrorResponse",
                  },
                },
              },
            },
            "500": {
              description: "Internal server error",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ErrorResponse",
                  },
                },
              },
            },
          },
        },
        get: {
          summary: "Get all articles",
          tags: ["Articles"],
          parameters: [
            {
              name: "page",
              in: "query",
              schema: {
                type: "integer",
                default: 1,
              },
              description: "Page number for pagination",
            },
            {
              name: "limit",
              in: "query",
              schema: {
                type: "integer",
                default: 10,
                maximum: 100,
              },
              description: "Number of articles per page",
            },
            {
              name: "category_id",
              in: "query",
              schema: {
                type: "string",
                format: "uuid",
              },
              description: "Filter by category ID",
            },
            {
              name: "author_id",
              in: "query",
              schema: {
                type: "string",
                format: "uuid",
              },
              description: "Filter by author ID",
            },
            {
              name: "status",
              in: "query",
              schema: {
                type: "string",
                enum: ["draft", "published"],
              },
              description: "Filter by status",
            },
          ],
          responses: {
            "200": {
              description: "Articles fetched successfully",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/SuccessResponse",
                  },
                },
              },
            },
            "500": {
              description: "Internal server error",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ErrorResponse",
                  },
                },
              },
            },
          },
        },
      },
      "/api/v1/articles/{id}": {
        get: {
          summary: "Get article by ID",
          tags: ["Articles"],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: {
                type: "string",
                format: "uuid",
              },
              description: "Article ID",
            },
          ],
          responses: {
            "200": {
              description: "Article fetched successfully",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/SuccessResponse",
                  },
                },
              },
            },
            "404": {
              description: "Article not found",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ErrorResponse",
                  },
                },
              },
            },
            "500": {
              description: "Internal server error",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ErrorResponse",
                  },
                },
              },
            },
          },
        },
        put: {
          summary: "Update article",
          tags: ["Articles"],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: {
                type: "string",
                format: "uuid",
              },
              description: "Article ID",
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/UpdateArticleRequest",
                },
              },
            },
          },
          responses: {
            "200": {
              description: "Article updated successfully",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/SuccessResponse",
                  },
                },
              },
            },
            "404": {
              description: "Article not found",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ErrorResponse",
                  },
                },
              },
            },
            "400": {
              description: "Invalid request data",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ErrorResponse",
                  },
                },
              },
            },
            "500": {
              description: "Internal server error",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ErrorResponse",
                  },
                },
              },
            },
          },
        },
        delete: {
          summary: "Delete article",
          tags: ["Articles"],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: {
                type: "string",
                format: "uuid",
              },
              description: "Article ID",
            },
          ],
          responses: {
            "200": {
              description: "Article deleted successfully",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/SuccessResponse",
                  },
                },
              },
            },
            "404": {
              description: "Article not found",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ErrorResponse",
                  },
                },
              },
            },
            "500": {
              description: "Internal server error",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ErrorResponse",
                  },
                },
              },
            },
          },
        },
      },
      "/api/v1/articles/{id}/publish": {
        patch: {
          summary: "Publish article",
          tags: ["Articles"],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: {
                type: "string",
                format: "uuid",
              },
              description: "Article ID",
            },
          ],
          responses: {
            "200": {
              description: "Article published successfully",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/SuccessResponse",
                  },
                },
              },
            },
            "404": {
              description: "Article not found",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ErrorResponse",
                  },
                },
              },
            },
            "400": {
              description: "Article already published or invalid state",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ErrorResponse",
                  },
                },
              },
            },
            "500": {
              description: "Internal server error",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ErrorResponse",
                  },
                },
              },
            },
          },
        },
      },
      "/api/v1/articles/{id}/unpublish": {
        patch: {
          summary: "Unpublish article (move to draft)",
          tags: ["Articles"],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: {
                type: "string",
                format: "uuid",
              },
              description: "Article ID",
            },
          ],
          responses: {
            "200": {
              description: "Article moved to draft successfully",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/SuccessResponse",
                  },
                },
              },
            },
            "404": {
              description: "Article not found",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ErrorResponse",
                  },
                },
              },
            },
            "400": {
              description: "Article already in draft or invalid state",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ErrorResponse",
                  },
                },
              },
            },
            "500": {
              description: "Internal server error",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ErrorResponse",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: [],
};

export const swaggerSpec = swaggerJsdoc(options);
