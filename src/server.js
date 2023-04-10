import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import http from 'http';
import session from 'express-session';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import storeRoutes from './routes/storeRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import usedProductRoutes from './routes/usedProductRoutes.js';

const PORT = process.env.PORT || 8000;
dotenv.config();

// Connect to database
connectDB();

const app = express();
const server = http.createServer(app);

// Enable CORS
app.use(
	cors({
		origin: process.env.CLIENT_URL,
		credentials: true,
	})
);

// Enable session management
// Should change to JWT token in the future
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: true,
		saveUninitialized: true,
	})
);

// To accept JSON data in the body
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/store', storeRoutes);
app.use('/review', reviewRoutes);
app.use('/usedproduct', usedProductRoutes);

server.listen(PORT, console.log(`Server listening on port ${PORT}...`));
