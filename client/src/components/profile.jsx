import React, { useState } from 'react'; 


const Profile = ({ user, setUser }) => {
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        window.location.href = "/"; 
    };

    if (!user) return <p>Загрузка...</p>;

    return(
        <div className="custom-container" style={{padding: '100px 0'}}>
            <h1>Личный кабинет</h1>
            <p>Добро пожаловать, {user.full_name}!</p>
            <p>Email: {user.email}</p>
            <button onClick={handleLogout} className="login-btn" style={{width: '200px'}}>
                Выйти из аккаунта
            </button>
        </div>
    )
}

export default Profile;