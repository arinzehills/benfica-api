const express = require('express');
const connectDB = require('./database/connection');
const authRoutes = require('./routes/authRoute');
const postRoutes = require('./routes/postRoutes');
const path = require('path');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Connect Database
connectDB();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware
app.use(express.json());

app.use('/api/posts', postRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

module.exports=app