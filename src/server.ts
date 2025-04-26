// Imports
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import incidentRoute from './routes/incident.route';

// Load env variables
dotenv.config();

// App setup
const app = express();
const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/incidents', incidentRoute);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
