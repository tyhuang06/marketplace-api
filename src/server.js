import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import http from 'http';
import connectDB from './config/db.js';

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

// To accept JSON data in the body
app.use(express.json());

// Test route
app.get('/', (req, res) => {
	res.send('Hello World!');
});

server.listen(PORT, console.log(`Server listening on port ${PORT}...`));
