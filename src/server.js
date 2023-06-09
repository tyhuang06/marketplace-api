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
import cartRoutes from './routes/cartRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

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
		rolling: true,
		cookie: {
			maxAge: 1000 * 60 * 60 * 24, // 1 day
		},
	})
);

// To accept JSON data in the body
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/store', storeRoutes);
app.use('/review', reviewRoutes);
app.use('/usedproduct', usedProductRoutes);
app.use('/cart', cartRoutes);
app.use('/user', userRoutes);
app.use('/order', orderRoutes);

server.listen(PORT, console.log(`Server listening on port ${PORT}...`));
