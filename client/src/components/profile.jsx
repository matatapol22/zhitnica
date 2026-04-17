import React, { useState } from 'react'; 
import logoutIcon from '../image/Icon-logout.svg';


const Profile = ({ user, setUser }) => {
    

    const [activeTab, setActiveTab] = useState('profile');
    const [passFormData, setPassFormData] = useState({
        password: '',
        new_password: '',
        rep_new_password: ''
    });
    const [errorPass, setErrorPass] = useState('');
    const [errorProfileEdit, setErrorProfileEdit] = useState('');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        window.location.href = "/"; 
    };

    const handleEditPassword = (e) => {
        setPassFormData({...passFormData, [e.target.name]: e.target.value}); // ... - создает копию объекта, потому что нельзя напрямую изменять состояние, а нужно создавать его копию и изменять уже ее
    }

    const handleSubmitPass = async (e) => {
        e.preventDefault();
        setErrorPass('');

        if(passFormData.new_password !== passFormData.rep_new_password) {
            setErrorPass('Новые пароли не совпадают');
            return;
        }
        if(passFormData.new_password.length < 8) {
            setErrorPass('Новый пароль должен быть не менее 8 символов');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/profile/edit-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    password: passFormData.password,
                    new_password: passFormData.new_password
                })
            });

            const data = await response.json(); //дождаться пока все пакетики придут и превратить их в объект

            if(response.ok){
                setPassFormData({
                    password: '',
                    new_password: '',
                    rep_new_password: ''
                })
                setErrorPass('');
                alert("Пароль успешно изменен!");
            }
            else{
                setErrorPass(data.message || 'Ошибка при изменении пароля');
            }

        } catch (err) {
            setErrorPass('Ошибка при изменении пароля');
            console.error("Ошибка при изменении пароля:", err);
        }
    }

    return(
        <div className="custom-container">
            <div className='profile-client'>    
                {/* <p>Добро пожаловать, {user.full_name}!</p>
                <p>Email: {user.email}</p>
                 */}
                <div className='profile-client-menu'>
                    <div className='profile-client-menu-leftSide'>
                        <button className={`login-btn  ${activeTab === 'profile' ? 'active' : ''}`}  onClick={() => {setActiveTab('profile')}}>Профиль</button>
                        <button className={`login-btn  ${activeTab === 'orders' ? 'active' : ''}`}  onClick={() => {setActiveTab('orders')}}>История заказов</button>
                        <button 
                            onClick={handleLogout} 
                            className="logout-btn" 
                        >
                            <img src={logoutIcon}/>
                            Выйти из аккаунта 
                        </button>
                    </div>
                </div>
                <div className='profile-client-info'>
                    {activeTab === 'profile' && 
                        <div className='profile-client-info-editprofile'>
                            <div className='profile-client-info-title'>
                                <h2>Настройки профиля</h2>
                                <p>Управляйте своей личной информацией и настройками безопасности</p>
                            </div>
                            <form className='profile-client-info-form' >
                                <span className='profile-client-info-formLabel'>Личная информация</span>
                                <div className='profile-client-info-form-container'>
                                    <div className='profile-form-group'>
                                        <label>Имя Фамилия</label>
                                        <input 
                                            type="full_name" 
                                            name="full_name" 
                                            placeholder="Иван Иванов" 
                                            required
                                            
                                        />
                                    </div>
                                    <div className='profile-form-group'>
                                        <label>Почта</label>
                                        <input  
                                            type="email" 
                                            name="email"
                                            placeholder="example@mail.com" 
                                            required 
                                        />
                                    </div>
                                    <div className='profile-form-group-phone'>
                                        <div className='profile-form-group'>
                                            <label>Номер телефона</label>
                                            <input  
                                                type="phone" 
                                                name="phone"
                                                placeholder="+7 (999) 111 22 33" 
                                                required 
                                            />
                                        </div>
                                    </div>
                                    <button 
                                        className="logout-btn" 
                                        type="submit"
                                    >
                                        Сохранить изменения
                                    </button>
                                </div>
                            </form>
                            <form className='profile-client-pass-form' onSubmit={handleSubmitPass}>
                                <span className='profile-client-info-formLabel'>Безопасность</span>
                                    {errorPass && <div style={{color: 'red', fontSize: '14px', marginBottom: '10px'}}>{errorPass}</div>}
                                <div className='profile-client-info-form-container'>
                                    <div className='profile-form-group'>
                                        <label>Текущий пароль</label>
                                        <input 
                                            type="password" 
                                            name="password" 
                                            placeholder="Введите свой текущий пароль"
                                            value={passFormData.password}
                                            onChange={handleEditPassword}
                                            required
                                        />
                                    </div>
                                    <div className='profile-form-group'>
                                        <label>Новый пароль</label>
                                        <input  
                                            type="password" 
                                            name="new_password"
                                            value={passFormData.new_password}
                                            placeholder="Введите свой новый пароль"
                                            onChange={handleEditPassword}
                                            required 
                                        />
                                    </div>
                                    <div className='profile-form-group-phone'>
                                        <div className='profile-form-group'>
                                            <label>Подтвердите новый пароль</label>
                                            <input  
                                                type="password" 
                                                name="rep_new_password"
                                                value={passFormData.rep_new_password}
                                                placeholder="Повторите свой новый пароль"
                                                onChange={handleEditPassword}
                                                required 
                                            />
                                        </div>
                                    </div>
                                    <button 
                                        className="logout-btn" 
                                        type="submit"
                                    >
                                        Изменить пароль
                                    </button>
                                </div>
                            </form>
                        </div>
                    }
                    {activeTab === 'orders' && 
                        <div className='profile-client-info-orders'>

                        </div> 
                    }
                    
                </div>
            </div>
        </div>
    )
}

export default Profile;