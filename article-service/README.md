# Article Service

Backend microservice for managing magazine articles in the MTIT Assignment 2 platform.

## Tech Stack
- Node.js
- Express.js
- TypeScript
- MongoDB + Mongoose
- Zod (request validation)

## Features
- Create article
- Get all articles (with pagination and filters)
- Get article by ID
- Update article
- Delete article
- Publish article
- Unpublish article
- Standard success response format
- Centralized error handling with service metadata
- Input validation for body, params, and query
- Graceful shutdown for production readiness

## Project Structure

```text
article-service/
  src/
    app.ts
    server.ts
    config/
      env.ts
      database.ts
    common/
      errors/
      middlewares/
      utils/
    modules/
      article/
        article.types.ts
        article.model.ts
        article.validation.ts
        article.repository.ts
        article.service.ts
        article.controller.ts
        article.routes.ts
    routes/
      index.ts
```

## Prerequisites
- Node.js 18+ recommended
- npm 9+ recommended
- MongoDB instance (local or cloud)

## Environment Variables
Create a .env file in article-service root:

```env
NODE_ENV=development
PORT=3000
MONGODB_URL=mongodb://localhost:27017/article_service
```

Notes:
- PORT defaults to 3000 if missing.
- MONGODB_URL is required.
- No hardcoded localhost/port is used in source code.

## Setup and Run

1. Install dependencies

```bash
npm install
```

2. Run in development mode

```bash
npm run dev
```

3. Build for production

```bash
npm run build
```

4. Start production build

```bash
npm run start
```

## Available Scripts
- npm run dev: Run with hot reload using ts-node-dev
- npm run build: Compile TypeScript to dist/
- npm run start: Start compiled app from dist/
- npm run lint: Lint project
- npm run format: Format files with Prettier

## Base URL
- Local: http://localhost:3000
- API prefix: /api/v1

## Health Check
- GET /api/v1/health

Success response:

```json
{
  "success": true,
  "message": "Article service is healthy",
  "statusCode": 200,
  "data": {
    "uptime": 123.45
  }
}
```

## API Endpoints

### 1) Create Article
- Method: POST
- Path: /api/v1/articles

Request body:

```json
{
  "title": "Introduction to Artificial Intelligence",
  "content": "This article explains the basics of AI...",
  "author_id": "550e8400-e29b-41d4-a716-446655440000",
  "category_id": "550e8400-e29b-41d4-a716-446655440001",
  "tags": ["AI", "Technology"],
  "status": "draft",
  "thumbnail_url": "https://example.com/image.jpg"
}
```

### 2) Get All Articles
- Method: GET
- Path: /api/v1/articles
- Query params (optional):
  - page
  - limit
  - category_id
  - author_id
  - status (draft|published)

Example:

```text
/api/v1/articles?page=1&limit=10&category_id=550e8400-e29b-41d4-a716-446655440001
```

### 3) Get Article By ID
- Method: GET
- Path: /api/v1/articles/:id

### 4) Update Article
- Method: PUT
- Path: /api/v1/articles/:id

### 5) Delete Article
- Method: DELETE
- Path: /api/v1/articles/:id

### 6) Publish Article
- Method: PATCH
- Path: /api/v1/articles/:id/publish

### 7) Unpublish Article
- Method: PATCH
- Path: /api/v1/articles/:id/unpublish

## Validation Rules (Implemented)
- article id, author_id, category_id must be valid UUID format
- title: min 5, max 200 chars
- content: min 20 chars
- tags: array of non-empty strings
- status: draft | published
- thumbnail_url: valid URL when provided
- update body requires at least one field
- list query validation for page/limit and filters

## Response Standards

### Success

```json
{
  "success": true,
  "message": "Article created successfully",
  "statusCode": 201,
  "data": {
    "article_id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "Introduction to Artificial Intelligence",
    "status": "draft"
  }
}
```

### Error

```json
{
  "status": "error",
  "code": 400,
  "message": "Invalid request data",
  "service": "article-service",
  "timestamp": "2026-03-26T10:00:00.000Z",
  "errors": [
    {
      "path": "body.title",
      "message": "title must be at least 5 characters"
    }
  ]
}
```

## Production Readiness Notes
- Security middleware: helmet, cors
- Input validation on all REST endpoints
- Centralized error handling
- Environment-driven configuration
- Graceful shutdown on SIGINT/SIGTERM
- Layered architecture (controller/service/repository/model)

## Integration Notes
- Service is designed to run behind API Gateway.
- Authentication and role checks can be added at gateway or middleware level.
- Swagger can be introduced later after all services are merged.
