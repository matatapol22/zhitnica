import React, { isValidElement, useState } from 'react';

const RegisterModal = ({ setModalType }) => {
    const [agreed, setAgreed] = useState(false);

    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value}); //e.target - сам инпут, e.target.name - из какого инпута берем,  e.target.value - значение
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); 

        if (formData.password !== formData.confirmPassword) {
            setError("Пароли не совпадают");
            return;
        }

        if (agreed) {
            try {
                const response = await fetch('http://localhost:5000/api/auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        full_name: formData.full_name,
                        email: formData.email,
                        password: formData.password
                    })
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || 'Ошибка регистрации');
                }

                // УСПЕХ:
                console.log("Регистрация успешна:", data);
                localStorage.setItem('token', data.token); // Сохраняем "паспорт" пользователя
                alert("Добро пожаловать в Житницу!");
                // Здесь можно добавить закрытие модалки или редирект
                
            } catch (err) {
                setError(err.message);
            }
        }
    };


    

    return (
        <div className='auth-container'>
            <div className='auth-hello'>
                <span className='auth-hello-title'>Добро пожаловать <br/>в ЖИТНИЦУ!</span>
                <span className='auth-hello-text'>Богатство природы для вашего здоровья</span>
            </div>
            
            <form className="auth-form" onSubmit={handleSubmit}>
                <span className="auth-form-label">Регистрация</span>
                
                <div className="form-group">
                    <label>Имя Фамилия</label>
                    <input  type="text" 
                            name="full_name"
                            placeholder="Иван Иванов" 
                            required
                            value ={formData.full_name}
                            onChange={handleChange}
                            />
                </div>
                
                <div className="form-group">
                    <label>Почта</label>
                    <input  type="email" 
                            name="email"
                            placeholder="example@mail.com" 
                            required 
                            value ={formData.email}
                            onChange={handleChange}
                            />
                </div>
                
                <div className="form-group">
                    <label>Пароль</label>
                    <input  type="password" 
                            name="password"
                            placeholder="Введите свой пароль" 
                            required 
                            value ={formData.password}
                            onChange={handleChange}
                            />
                    <span className="pass-info">Должно быть не менее 8 символов</span>
                </div>

                <div className="form-group">
                    <label>Повторите пароль</label>
                    <input  type="password" 
                            name="confirmPassword"
                            placeholder="Введите свой пароль" 
                            required 
                            value ={formData.confirmPassword}
                            onChange={handleChange}
                            />
                </div>
                
                <div className="policy-group">
                    <input 
                        type="checkbox" 
                        id="policy" 
                        checked={agreed} 
                        onChange={() => setAgreed(!agreed)} 
                    />
                    <label htmlFor="policy">
                        Я согласен на <a href="/privacy" target="_blank">обработку персональных данных</a> и принимаю <a href="/terms" target="_blank">условия оферты</a>
                    </label>
                </div>

                <button 
                    type="submit" 
                    className={`login-btn ${!agreed ? 'disabled' : ''}`} 
                    disabled={!agreed}
                    
                >
                    Зарегистрироваться
                </button>

                <div className="modal-footer">
                    <span>Есть аккаунт? <a href="#" onClick={(e) => {
                            e.preventDefault();
                            setModalType('authModal'); 
                        }}>Войдите</a>
                    </span>   
                </div>
            </form>
        </div>





        
    );
}

export default RegisterModal;