const express = require('express');
const cors = require('cors'); // npm install cors
const authRoutes = require('./routes/registerRoutes');
require('dotenv').config();

const app = express();

app.use(cors()); // Разрешаем запросы с фронтенда
app.use(express.json()); // Позволяет серверу читать JSON из req.body

// Все роуты из authRoutes теперь будут начинаться с /api/auth
app.use('/api/auth', authRoutes);

app.listen(5000, () => console.log('Сервер летит на 5000 порту'));