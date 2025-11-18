import React from 'react';
import '../styles/style.css';
import logo from '../image/logo.svg';
import search from '../image/search.svg';
import cart from '../image/cart.svg';
import user from '../image/user.svg';

const Header = () => {
    return (
        <header className="app-header">
            <div className="container">
                <div className='header-content'>
                    <div className='header-logo'>
                        <a href='#'>
                            <img src={logo} alt="Logo" />
                            <p>Житница</p>  
                        </a>
                    </div>
                    <div className='header-categories'>
                        <a href="#">Главная</a>
                        <a href="#">Каталог</a>
                        <a href="#">О нас</a>
                        <a href="#">Заказы</a>
                        <a href="#">Доставка</a>
                        <a href="#">Оплата</a>
                    </div>
                    <div className='header-icons'>
                        <a href="#"><img src={search} alt="Search" /></a>
                        <a href="#"><img src={cart} alt="Cart" /></a>
                        <a href="#"><img src={user} alt="User" /></a>
                    </div>

                </div>
            </div>
        </header>
    )

};
export default Header;  