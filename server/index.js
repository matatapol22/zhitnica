const express = require('express');
const cors = require('cors'); 
const authRoutes = require('./routes/registerRoutes');
require('dotenv').config();

const app = express();

app.use(cors()); // Разрешаем запросы с фронтенда
app.use(express.json()); 

app.use('/api/auth', authRoutes);

app.listen(5000, () => console.log('Сервер летит на 5000 порту'));