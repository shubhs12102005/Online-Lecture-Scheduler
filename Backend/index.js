import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// All Files Imports
import { connectDB } from './DB/db.js';
import UserRoute from './Routes/UserRoute.js'

// Middlewares
dotenv.config({});
const app = express();
app.use(express.json());
app.use(cors())

const port = process.env.PORT || 5000;

// Routes
app.use('/api/user', UserRoute);

app.listen(port, () => {
    console.log(`Backend is running on port ${port}`);
    connectDB();
})