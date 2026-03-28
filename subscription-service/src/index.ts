import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { connectDB } from './config/db';
import subscriptionRouter from './routes/subscription.routes';

const app = express();
const PORT = process.env.PORT || 3005;

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Subscription Service API',
      version: '1.0.0',
      description:
        'Subscription management for Magazine Platform - MTIT Assignment 2',
    },
    servers: [
      { url: 'http://localhost:3005', description: 'Direct access' },
      { url: 'http://localhost:3000', description: 'Via API Gateway' },
    ],
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    service: 'subscription-service',
    port: PORT,
  });
});

app.use('/api/v1/subscriptions', subscriptionRouter);

app.use((_req: Request, res: Response) => {
  res.status(404).json({
    status: 'error',
    code: 404,
    message: 'Route not found',
    service: 'subscription-service',
    timestamp: new Date().toISOString(),
  });
});

app.use(
  (
    err: { statusCode?: number; message?: string; name?: string },
    _req: Request,
    res: Response,
    _next: NextFunction
  ) => {
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      res.status(400).json({
        status: 'error',
        code: 400,
        message: err.message,
        service: 'subscription-service',
        timestamp: new Date().toISOString(),
      });
      return;
    }

    res.status(err.statusCode || 500).json({
      status: 'error',
      code: err.statusCode || 500,
      message: err.message || 'Internal Server Error',
      service: 'subscription-service',
      timestamp: new Date().toISOString(),
    });
  }
);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Subscription Service running on port ${PORT}`);
    console.log(`Swagger: http://localhost:${PORT}/api-docs`);
  });
});
