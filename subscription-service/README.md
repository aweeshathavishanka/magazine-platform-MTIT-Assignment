# Subscription Service

Part of Magazine Platform - MTIT IT4020 Assignment 2

## Port
3005

## Setup
npm install
npm run dev

## Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | / | Health check |
| POST | /api/v1/subscriptions | Create subscription |
| GET | /api/v1/subscriptions | Get all |
| GET | /api/v1/subscriptions/user/:userId | Get by user |
| GET | /api/v1/subscriptions/:id | Get by ID |
| PUT | /api/v1/subscriptions/:id | Update |
| DELETE | /api/v1/subscriptions/:id | Delete |

## Swagger
http://localhost:3005/api-docs

## Test via API Gateway
http://localhost:3000/api/v1/subscriptions
