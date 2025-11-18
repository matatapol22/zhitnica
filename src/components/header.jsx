import React from 'react';
import '../styles/style.css';

const Header = () => {
    return (
        <header className="app-header">
            <div className="container">
                <div className='header-content'>
                    <div className='header-logo'>
                        <img src="../image/logo.jpg" alt="Logo" />
                        <a className='header-logo-name' href="#">Житница</a>
                    </div>
                    <div className='header-categories'>
                        <a href="#">Главная</a>
                        <a href="#">Каталог</a>
                        <a href="#">О нас</a>
                        <a href="#">Заказы</a>
                        <a href="#">Доставка</a>
                        <a href="#">Оплата</a>
                    </div>

                </div>
            </div>
        </header>
    )

};
export default Header;  