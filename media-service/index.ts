import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import dotenv from 'dotenv';
import mediaRoutes from './routes/mediaRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3004; // Media service port

// Swagger Setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Media Service API',
      version: '1.0.0',
      description: 'API for managing media files in the magazine platform',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`, // Direct access
      },
      {
        url: 'http://localhost:3000', // Via API Gateway
      }
    ],
  },
  apis: ['./routes/*.ts'], // Scan routes for Swagger JSDoc comments
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/media_db')
  .then(() => console.log('Connected to MongoDB (Media Service)'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/v1/media', mediaRoutes);

// Handle unknown routes
app.use((req: Request, res: Response) => {
  res.status(404).json({
    status: 'error',
    code: 404,
    message: 'Endpoint not found',
    service: 'media-service',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`Media Service running on port ${PORT}`);
});