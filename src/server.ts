import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import incidentRoute from './routes/incident.route';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());
app.use('/api/incidents', incidentRoute);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
