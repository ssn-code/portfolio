import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import contactRouter from './routes/contact.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// trust proxy - required for express-rate-limit to correctly identify client IPs
app.set('trust proxy', 1);

// CORS configuration - only allow frontend origin
const frontendOrigin = process.env.FRONTEND_ORIGIN || 'http://localhost:3000';
app.use(
  cors({
    origin: frontendOrigin,
    optionsSuccessStatus: 200,
  })
);

app.use(express.json());

// Routes
app.use('/api', contactRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Global error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({
    success: false,
    message: 'An internal server error occurred.',
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
