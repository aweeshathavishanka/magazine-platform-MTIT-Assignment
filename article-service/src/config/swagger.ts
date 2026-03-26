import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Article Service API",
      version: "1.0.0",
      description: "RESTful API for managing magazine articles in MTIT Assignment 2 platform"
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server"
      },
      {
        url: "https://api.example.com",
        description: "Production server"
      }
    ],
    components: {
      schemas: {
        Article: {
          type: "object",
          properties: {
            article_id: {
              type: "string",
              format: "uuid",
              description: "Unique article identifier"
            },
            title: {
              type: "string",
              minLength: 5,
              maxLength: 200,
              description: "Article title"
            },
            content: {
              type: "string",
              minLength: 20,
              description: "Article content"
            },
            author_id: {
              type: "string",
              format: "uuid",
              description: "Author ID"
            },
            category_id: {
              type: "string",
              format: "uuid",
              description: "Category ID"
            },
            tags: {
              type: "array",
              items: {
                type: "string"
              },
              description: "Article tags"
            },
            status: {
              type: "string",
              enum: ["draft", "published"],
              description: "Article status"
            },
            thumbnail_url: {
              type: "string",
              format: "uri",
              description: "Article thumbnail URL"
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Article creation timestamp"
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Article last update timestamp"
            }
          },
          required: [
            "article_id",
            "title",
            "content",
            "author_id",
            "category_id",
            "status",
            "createdAt",
            "updatedAt"
          ]
        },
        CreateArticleRequest: {
          type: "object",
          properties: {
            title: {
              type: "string",
              minLength: 5,
              maxLength: 200
            },
            content: {
              type: "string",
              minLength: 20
            },
            author_id: {
              type: "string",
              format: "uuid"
            },
            category_id: {
              type: "string",
              format: "uuid"
            },
            tags: {
              type: "array",
              items: {
                type: "string"
              }
            },
            status: {
              type: "string",
              enum: ["draft", "published"],
              default: "draft"
            },
            thumbnail_url: {
              type: "string",
              format: "uri"
            }
          },
          required: ["title", "content", "author_id", "category_id"]
        },
        UpdateArticleRequest: {
          type: "object",
          properties: {
            title: {
              type: "string",
              minLength: 5,
              maxLength: 200
            },
            content: {
              type: "string",
              minLength: 20
            },
            category_id: {
              type: "string",
              format: "uuid"
            },
            tags: {
              type: "array",
              items: {
                type: "string"
              }
            },
            status: {
              type: "string",
              enum: ["draft", "published"]
            },
            thumbnail_url: {
              type: "string",
              format: "uri"
            }
          }
        },
        SuccessResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean"
            },
            message: {
              type: "string"
            },
            statusCode: {
              type: "integer"
            },
            data: {
              type: "object"
            }
          }
        },
        ErrorResponse: {
          type: "object",
          properties: {
            status: {
              type: "string",
              enum: ["error"]
            },
            code: {
              type: "integer"
            },
            message: {
              type: "string"
            },
            service: {
              type: "string"
            },
            timestamp: {
              type: "string",
              format: "date-time"
            }
          }
        }
      }
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
                    $ref: "#/components/schemas/SuccessResponse"
                  }
                }
              }
            }
          }
        }
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
                  $ref: "#/components/schemas/CreateArticleRequest"
                }
              }
            }
          },
          responses: {
            "201": {
              description: "Article created successfully",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/SuccessResponse"
                  }
                }
              }
            },
            "400": {
              description: "Invalid request data",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ErrorResponse"
                  }
                }
              }
            },
            "500": {
              description: "Internal server error",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ErrorResponse"
                  }
                }
              }
            }
          }
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
                default: 1
              },
              description: "Page number for pagination"
            },
            {
              name: "limit",
              in: "query",
              schema: {
                type: "integer",
                default: 10,
                maximum: 100
              },
              description: "Number of articles per page"
            },
            {
              name: "category_id",
              in: "query",
              schema: {
                type: "string",
                format: "uuid"
              },
              description: "Filter by category ID"
            },
            {
              name: "author_id",
              in: "query",
              schema: {
                type: "string",
                format: "uuid"
              },
              description: "Filter by author ID"
            },
            {
              name: "status",
              in: "query",
              schema: {
                type: "string",
                enum: ["draft", "published"]
              },
              description: "Filter by status"
            }
          ],
          responses: {
            "200": {
              description: "Articles fetched successfully",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/SuccessResponse"
                  }
                }
              }
            },
            "500": {
              description: "Internal server error",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ErrorResponse"
                  }
                }
              }
            }
          }
        }
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
                format: "uuid"
              },
              description: "Article ID"
            }
          ],
          responses: {
            "200": {
              description: "Article fetched successfully",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/SuccessResponse"
                  }
                }
              }
            },
            "404": {
              description: "Article not found",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ErrorResponse"
                  }
                }
              }
            },
            "500": {
              description: "Internal server error",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ErrorResponse"
                  }
                }
              }
            }
          }
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
                format: "uuid"
              },
              description: "Article ID"
            }
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/UpdateArticleRequest"
                }
              }
            }
          },
          responses: {
            "200": {
              description: "Article updated successfully",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/SuccessResponse"
                  }
                }
              }
            },
            "404": {
              description: "Article not found",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ErrorResponse"
                  }
                }
              }
            },
            "400": {
              description: "Invalid request data",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ErrorResponse"
                  }
                }
              }
            },
            "500": {
              description: "Internal server error",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ErrorResponse"
                  }
                }
              }
            }
          }
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
                format: "uuid"
              },
              description: "Article ID"
            }
          ],
          responses: {
            "200": {
              description: "Article deleted successfully",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/SuccessResponse"
                  }
                }
              }
            },
            "404": {
              description: "Article not found",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ErrorResponse"
                  }
                }
              }
            },
            "500": {
              description: "Internal server error",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ErrorResponse"
                  }
                }
              }
            }
          }
        }
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
                format: "uuid"
              },
              description: "Article ID"
            }
          ],
          responses: {
            "200": {
              description: "Article published successfully",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/SuccessResponse"
                  }
                }
              }
            },
            "404": {
              description: "Article not found",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ErrorResponse"
                  }
                }
              }
            },
            "400": {
              description: "Article already published or invalid state",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ErrorResponse"
                  }
                }
              }
            },
            "500": {
              description: "Internal server error",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ErrorResponse"
                  }
                }
              }
            }
          }
        }
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
                format: "uuid"
              },
              description: "Article ID"
            }
          ],
          responses: {
            "200": {
              description: "Article moved to draft successfully",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/SuccessResponse"
                  }
                }
              }
            },
            "404": {
              description: "Article not found",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ErrorResponse"
                  }
                }
              }
            },
            "400": {
              description: "Article already in draft or invalid state",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ErrorResponse"
                  }
                }
              }
            },
            "500": {
              description: "Internal server error",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ErrorResponse"
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  apis: []
};

export const swaggerSpec = swaggerJsdoc(options);
