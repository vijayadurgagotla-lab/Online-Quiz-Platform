const express = require('express');
const session = require('express-session');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routers/auth');
const quizRoutes = require('./routers/quizzes');
const resultRoutes = require('./routers/result');

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_ORIGIN || 'http://127.0.0.1:5500',
    credentials: true
}));

app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET || 'dev_secret_change_me',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 2, // 2 hours
        sameSite: 'lax'
    }
}));

app.use('/api/auth', authRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/results', resultRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Backend API running on http://localhost:${PORT}`);
});