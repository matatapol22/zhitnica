require('dotenv').config(); 
const db = require('./db');

async function testConnection() {
  try {
    const res = await db.query('SELECT * FROM users');
    console.log('Пользователи в базе:', res.rows);
  } catch (err) {
    console.error('Ошибка подключения:', err);
  }
}

testConnection();