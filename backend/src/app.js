const express = require('express');
const cookieParser = require('cookie-parser')
const authRouter = require('./routers/auth.router')
const musicRoutes = require('./routers/music.routers')
const cors = require('cors');

const app = express()
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth',authRouter);
app.use('/api/music',musicRoutes);

module.exports = app