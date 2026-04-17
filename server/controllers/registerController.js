const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { email, password, full_name } = req.body;

        if (!email || !password || !full_name) {
            return res.status(400).json({ message: "Пожалуйста, заполните все поля" });
        }

        const userCheck = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        
        if (userCheck.rows.length > 0) {
            return res.status(400).json({ message: "Пользователь с таким email уже зарегистрирован" });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await db.query(
            'INSERT INTO users (email, password_hash, full_name) VALUES ($1, $2, $3) RETURNING id, email, full_name, role',
            [email, hashedPassword, full_name]
        );

        const token = jwt.sign(
            { userId: newUser.rows[0].id, role: newUser.rows[0].role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(201).json({
            message: "Пользователь успешно создан",
            user: newUser.rows[0],
            token: token
        });

    } catch (err) {
        console.error("Ошибка при регистрации:", err.message);
        res.status(500).json({ message: "Ошибка сервера при регистрации" });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Ищем пользователя по почте
        const userResult = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        
        if (userResult.rows.length === 0) {
            return res.status(401).json({ message: "Неверная почта или пароль" });
        }

        const user = userResult.rows[0];

        // 2. Сравниваем введенный пароль с захешированным в базе
        const isMatch = await bcrypt.compare(password, user.password_hash);
        
        if (!isMatch) {
            return res.status(401).json({ message: "Неверная почта или пароль" });
        }

        // 3. Создаем токен
        const token = jwt.sign(
            { userId: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Отправляем ответ
        res.json({
            message: "Вход выполнен успешно",
            token,
            user: { id: user.id, email: user.email, full_name: user.full_name, role: user.role }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Ошибка сервера при входе" });
    }
};