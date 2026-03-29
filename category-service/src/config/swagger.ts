import swaggerJsdoc from "swagger-jsdoc";
import { env } from "./env";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Category Service API",
      version: "1.0.0",
      description: "REST API documentation for the Category microservice",
    },

    servers: [
      {
        url:
          env.nodeEnv === "production"
            ? env.swaggerProdUrl
            : env.swaggerDevUrl,
        description:
          env.nodeEnv === "production"
            ? "Production server"
            : "Development server",
      },
    ],
    components: {
      schemas: {
        Category: {
          type: "object",
          properties: {
            category_id: { type: "string", format: "uuid" },
            name: { type: "string" },
            description: { type: "string" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        CreateCategoryBody: {
          type: "object",
          required: ["name"],
          properties: {
            name: { type: "string", minLength: 2, maxLength: 100 },
            description: { type: "string", maxLength: 500 },
          },
        },
        UpdateCategoryBody: {
          type: "object",
          properties: {
            name: { type: "string", minLength: 2, maxLength: 100 },
            description: { type: "string", maxLength: 500 },
          },
        },
        ApiResponse: {
          type: "object",
          properties: {
            success: { type: "boolean" },
            message: { type: "string" },
            statusCode: { type: "integer" },
            data: { type: "object" },
          },
          
        },
        ErrorResponse: {
          type: "object",
          properties: {
            status: { type: "string" },
            code: { type: "integer" },
            message: { type: "string" },
            service: { type: "string" },
            timestamp: { type: "string", format: "date-time" },
          },
        },
      },
    },
    tags: [
      { name: "Health", description: "Health check" },
      { name: "Categories", description: "Category CRUD operations" },
    ],
    paths: {
      "/api/v1/health": {
        get: {
          tags: ["Health"],
          summary: "Health check",
          responses: {
            "200": {
              description: "Service is healthy",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ApiResponse" },
                },
              },
            },
          },
        },
      },
      "/api/v1/categories": {
        post: {
          tags: ["Categories"],
          summary: "Create a new category",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/CreateCategoryBody" },
                example: {
                  name: "Technology",
                  description: "Articles related to technology and innovations",
                },
              },
            },
          },
          responses: {
            "201": {
              description: "Category created successfully",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ApiResponse" },
                  example: {
                    success: true,
                    message: "Category created successfully",
                    statusCode: 201,
                    data: { category_id: "uuid", name: "Technology" },
                  },
                },
              },
            },
            "400": {
              description: "Validation error",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                  example: {
                    status: "error",
                    code: 400,
                    message: "Category already exists",
                    service: "category-service",
                    timestamp: "2026-03-24T10:00:00Z",
                  },
                },
              },
            },
            "409": { description: "Category name already exists" },
          },
        },
        get: {
          tags: ["Categories"],
          summary: "Get all categories",
          parameters: [
            {
              name: "page",
              in: "query",
              schema: { type: "integer", minimum: 1 },
              description: "Page number",
            },
            {
              name: "limit",
              in: "query",
              schema: { type: "integer", minimum: 1, maximum: 100 },
              description: "Items per page",
            },
          ],
          responses: {
            "200": {
              description: "Categories fetched successfully",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ApiResponse" },
                  example: {
                    success: true,
                    message: "Categories fetched successfully",
                    statusCode: 200,
                    data: [
                      {
                        category_id: "uuid",
                        name: "Technology",
                        description: "Articles related to technology",
                      },
                    ],
                  },
                },
              },
            },
          },
        },
      },
      "/api/v1/categories/{id}": {
        get: {
          tags: ["Categories"],
          summary: "Get category by ID",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string", format: "uuid" },
              description: "Category UUID",
            },
          ],
          responses: {
            "200": {
              description: "Category fetched successfully",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ApiResponse" },
                  example: {
                    success: true,
                    message: "Category fetched successfully",
                    statusCode: 200,
                    data: {
                      category_id: "uuid",
                      name: "Technology",
                      description: "Articles related to technology",
                    },
                  },
                },
              },
            },
            "404": {
              description: "Category not found",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
        put: {
          tags: ["Categories"],
          summary: "Update a category",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string", format: "uuid" },
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/UpdateCategoryBody" },
                example: {
                  name: "Business",
                  description: "Articles related to business and finance",
                },
              },
            },
          },
          responses: {
            "200": {
              description: "Category updated successfully",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ApiResponse" },
                  example: {
                    success: true,
                    message: "Category updated successfully",
                    statusCode: 200,
                    data: { category_id: "uuid", name: "Business" },
                  },
                },
              },
            },
            "400": { description: "Invalid update data or category name already exists" },
            "404": { description: "Category not found" },
          },
        },
        delete: {
          tags: ["Categories"],
          summary: "Delete a category",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string", format: "uuid" },
            },
          ],
          responses: {
            "200": {
              description: "Category deleted successfully",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ApiResponse" },
                  example: {
                    success: true,
                    message: "Category deleted successfully",
                    statusCode: 200,
                    data: { category_id: "uuid" },
                  },
                },
              },
            },
            "404": { description: "Category not found" },
          },
        },
      },
      "/api/v1/categories/{id}/articles": {
        get: {
          tags: ["Categories"],
          summary: "Get all articles under a category",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string", format: "uuid" },
              description: "Category UUID",
            },
          ],
          responses: {
            "200": {
              description: "Articles fetched successfully for category",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ApiResponse" },
                  example: {
                    success: true,
                    message: "Articles fetched successfully for category",
                    statusCode: 200,
                    data: [
                      {
                        article_id: "uuid",
                        title: "AI in 2026",
                        author_id: "uuid",
                      },
                    ],
                  },
                },
              },
            },
            "404": {
              description: "Category not found",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
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
