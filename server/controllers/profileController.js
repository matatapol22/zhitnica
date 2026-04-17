const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.editPassword = async (req, res) => {
    const { password, new_password} = req.body;
    const token = req.headers.authorization?.split(' ')[1];

    if(!token){
        return res.status(401).json({ message: "Токен не предоставлен" });
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id || decoded.userId;

        const userRes = await db.query('SELECT * FROM users WHERE id = $1', [userId]);
        const user = userRes.rows[0];

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if(!isMatch){
            return res.status(401).json({ message: "Неверный пароль" });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(new_password, saltRounds);

        await db.query('UPDATE users SET password_hash = $1 WHERE id = $2', [hashedPassword, userId]);
        res.json({ message: "Пароль успешно изменен" });
    } catch(err){
        return res.status(400).json({ message: "Не удалось изменить пароль" });
        
    }
}