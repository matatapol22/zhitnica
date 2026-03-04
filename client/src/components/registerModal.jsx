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

    const handleSubmit = (e) => {
        e.preventDefault(); 
        if (agreed) {
            console.log("Форма отправлена!");
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
                            placeholder="Иван Иванов" 
                            required
                            value ={formData.full_name}
                            onChange={handleChange}
                            />
                </div>
                
                <div className="form-group">
                    <label>Почта</label>
                    <input  type="email" 
                            placeholder="example@mail.com" 
                            required 
                            value ={formData.email}
                            onChange={handleChange}
                            />
                </div>
                
                <div className="form-group">
                    <label>Пароль</label>
                    <input  type="password" 
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