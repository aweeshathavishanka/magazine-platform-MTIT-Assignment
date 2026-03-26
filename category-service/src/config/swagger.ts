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
          env.nodeEnv === "production" ? "Production server" : "Development server",
      },
    ],
    components: {
      schemas: {
        Category: {
          type: "object",
          properties: {
            category_id: { type: "string", format: "uuid" },
            name: { type: "string" },
            slug: { type: "string" },
            description: { type: "string" },
            parent_id: { type: "string", format: "uuid", nullable: true },
            is_active: { type: "boolean" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        CreateCategoryBody: {
          type: "object",
          required: ["name", "slug"],
          properties: {
            name: { type: "string", minLength: 2, maxLength: 100 },
            slug: { type: "string", minLength: 2, maxLength: 100 },
            description: { type: "string", maxLength: 500 },
            parent_id: { type: "string", format: "uuid" },
            is_active: { type: "boolean", default: true },
          },
        },
        UpdateCategoryBody: {
          type: "object",
          properties: {
            name: { type: "string", minLength: 2, maxLength: 100 },
            slug: { type: "string", minLength: 2, maxLength: 100 },
            description: { type: "string", maxLength: 500 },
            parent_id: { type: "string", format: "uuid" },
            is_active: { type: "boolean" },
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
      { name: "Health", description: "Health check endpoints" },
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
              },
            },
          },
          responses: {
            "201": {
              description: "Category created",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ApiResponse" },
                },
              },
            },
            "400": { description: "Validation error" },
            "409": { description: "Slug already exists" },
          },
        },
        get: {
          tags: ["Categories"],
          summary: "List all categories",
          parameters: [
            { name: "page", in: "query", schema: { type: "integer" } },
            { name: "limit", in: "query", schema: { type: "integer" } },
            { name: "is_active", in: "query", schema: { type: "boolean" } },
            { name: "parent_id", in: "query", schema: { type: "string" } },
          ],
          responses: {
            "200": {
              description: "Categories fetched",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ApiResponse" },
                },
              },
            },
          },
        },
      },
      "/api/v1/categories/{id}": {
        get: {
          tags: ["Categories"],
          summary: "Get a category by ID",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string", format: "uuid" },
            },
          ],
          responses: {
            "200": { description: "Category found" },
            "404": { description: "Category not found" },
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
              },
            },
          },
          responses: {
            "200": { description: "Category updated" },
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
            "200": { description: "Category deleted" },
            "404": { description: "Category not found" },
          },
        },
      },
    },
  },
  apis: [],
};

export const swaggerSpec = swaggerJsdoc(options);
