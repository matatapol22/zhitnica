import React, { useState } from 'react'; // ИСПРАВЛЕНО: Добавлен импорт

const AuthModal = ({ setModalType }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    // Функция для обновления полей (как мы учили раньше)
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    email: formData.email, 
                    password: formData.password 
                }) // ИСПРАВЛЕНО: обращение к formData
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                setIsSuccess(true);
                setTimeout(() => {
                    setModalType(null);
                }, 2000);
            } else {
                setError(data.message || 'Ошибка входа');
            }
        } catch (err) {
            setError('Не удалось связаться с сервером');
        }
    };

    if (isSuccess) {
        return (
            <div className='auth-container success-mode'>
                <div className='auth-hello'>
                    <span className='auth-hello-title'>Вход выполнен!</span>
                    <span className='auth-hello-text'>Рады видеть вас снова в ЖИТНИЦЕ</span>
                </div>
                <div className="success-icon" style={{fontSize: '40px', textAlign: 'center'}}>✔️</div>
            </div>
        );
    }

    return (
        <div className='auth-container'>
            <div className='auth-hello'>
                <span className='auth-hello-title'>Рады видеть вас снова!</span>
                <span className='auth-hello-text'>Богатство природы для вашего здоровья</span>
            </div>
            
            <form className="auth-form" onSubmit={handleSubmit}> {/* ИСПРАВЛЕНО: onSubmit лучше для форм */}
                <span className="auth-form-label">Авторизация</span>
                
                {error && <div style={{color: 'red', fontSize: '12px', marginBottom: '10px'}}>{error}</div>}

                <div className="form-group">
                    <label>Почта</label>
                    <input 
                        type="email" 
                        name="email" // Добавлен name для handleChange
                        placeholder="example@mail.com" 
                        required
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                
                <div className="form-group">
                    <label>Пароль</label>
                    <input 
                        type="password" 
                        name="password" // Добавлен name для handleChange
                        placeholder="Введите свой пароль"
                        required
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <button type="button" className="pass-info-btn" style={{background: 'none', border: 'none', color: 'gray', cursor: 'pointer', padding: 0}}>Забыли пароль?</button>
                </div>

                <button type="submit" className="login-btn">Войти</button>
                
                <div className="modal-footer">
                    <span>Нет аккаунта? <button type="button" onClick={() => setModalType('registerModal')} style={{background: 'none', border: 'none', color: '#007bff', cursor: 'pointer', textDecoration: 'underline'}}>Зарегистрируйтесь</button></span>   
                </div>
            </form>
        </div>
    );
}

export default AuthModal;