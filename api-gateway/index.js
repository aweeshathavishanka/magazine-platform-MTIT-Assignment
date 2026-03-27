const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(morgan('dev'));

// Service Ports configuration
const services = {
  users: 'http://localhost:3001',
  articles: 'http://localhost:3002',
  categories: 'http://localhost:3003',
  media: 'http://localhost:3004',
  comments: 'http://localhost:3005',
  subscriptions: 'http://localhost:3006',
};

// Main API Routes Proxy
app.use('/api/v1/users', createProxyMiddleware({ target: services.users, changeOrigin: true }));
app.use('/api/v1/articles', createProxyMiddleware({ target: services.articles, changeOrigin: true }));
app.use('/api/v1/categories', createProxyMiddleware({ target: services.categories, changeOrigin: true }));
app.use('/api/v1/media', createProxyMiddleware({ target: services.media, changeOrigin: true }));
app.use('/api/v1/comments', createProxyMiddleware({ target: services.comments, changeOrigin: true }));
app.use('/api/v1/subscriptions', createProxyMiddleware({ target: services.subscriptions, changeOrigin: true }));

// Swagger Routes Proxy
app.use('/api-docs/users', createProxyMiddleware({ target: `${services.users}/api-docs`, changeOrigin: true }));
app.use('/api-docs/articles', createProxyMiddleware({ target: `${services.articles}/api-docs`, changeOrigin: true }));
app.use('/api-docs/categories', createProxyMiddleware({ target: `${services.categories}/api-docs`, changeOrigin: true }));
app.use('/api-docs/media', createProxyMiddleware({ target: `${services.media}/api-docs`, changeOrigin: true }));
app.use('/api-docs/comments', createProxyMiddleware({ target: `${services.comments}/api-docs`, changeOrigin: true }));
app.use('/api-docs/subscriptions', createProxyMiddleware({ target: `${services.subscriptions}/api-docs`, changeOrigin: true }));

app.get('/', (req, res) => {
  res.send('API Gateway is running');
});

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});