import React, { useState } from 'react'; 

const AuthModal = ({ setModalType, user, setUser }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [isSuccess, setIsSuccess] = useState(false);

    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); //без перезагрузки
        setError('');

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }, 
                body: JSON.stringify({ 
                    email: formData.email, 
                    password: formData.password 
                }) 
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                setUser(data.user);
                setIsSuccess(true);

                setTimeout(() => {
                    setModalType(null);
                }, 2000);

                alert("Вход успешно выполнен!");
                console.log("Вход успешен!");
            } else {
                setError(data.message || 'Ошибка входа');
            }

            
        } catch (err) {
            setError('Не удалось связаться с сервером');
            console.error("Ошибка при логине:", err);
        }
    };


    return (
        <div className='auth-container'>
            <div className='auth-hello'>
                <span className='auth-hello-title'>Рады видеть вас снова!</span>
                <span className='auth-hello-text'>Богатство природы для вашего здоровья</span>
            </div>
            
            <form className="auth-form" onSubmit={handleSubmit}> 
                <span className="auth-form-label">Авторизация</span>
                
                {error && <div style={{color: 'red', fontSize: '12px', marginBottom: '10px'}}>{error}</div>}

                <div className="form-group">
                    <label>Почта</label>
                    <input 
                        type="email" 
                        name="email" 
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
                        name="password" 
                        placeholder="Введите свой пароль"
                        required
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <button type="button" className="pass-info-btn" style={{background: 'none', border: 'none', color: 'gray', cursor: 'pointer', padding: 0}}>Забыли пароль?</button>
                </div>

                <button type="submit" className="loginn-btn">Войти</button>
                
                <div className="modal-footer">
                    <span>Нет аккаунта? <button type="button" onClick={() => setModalType('registerModal')} style={{background: 'none', border: 'none', color: '#007bff', cursor: 'pointer', textDecoration: 'underline'}}>Зарегистрируйтесь</button></span>   
                </div>
            </form>
        </div>
    );
}

export default AuthModal;