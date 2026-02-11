import { useState } from 'react';
import { Dialog } from '@headlessui/react'; // Импортируем только Dialog
import '../styles/style.css';
import logo from '../image/logo.svg';
import search from '../image/search.svg';
import cart from '../image/cart.svg';
import userIcon from '../image/user.svg';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="app-header">
            <div className="container">
                <div className='header-content'>
                    <div className='header-logo'>
                        <a href='#'><img src={logo} alt="Logo" /><p>Житница</p></a>
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
                        <a href="#!" onClick={(e) => { e.preventDefault(); setIsOpen(true); }}>
                            <img src={userIcon} alt="User" />
                        </a>
                    </div>

                    {/* МОДАЛЬНОЕ ОКНО HEADLESS UI */}
                    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="modal-root">
                        {/* Фон (Overlay) */}
                        <div className="modal-overlay" aria-hidden="true" />

                        {/* Контейнер для центрирования */}
                        <div className="modal-container">
                            <Dialog.Panel className="modal-panel">
                                <Dialog.Title className="modal-title">Авторизация</Dialog.Title>
                                
                                <form className="auth-form">
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input type="email" placeholder="example@mail.com" />
                                    </div>
                                    <div className="form-group">
                                        <label>Пароль</label>
                                        <input type="password" />
                                    </div>
                                    <button type="submit" className="login-btn">Войти</button>
                                </form>

                                <div className="modal-footer">
                                    <span>Нет аккаунта? <a href="#">Зарегистрироваться</a></span>
                                    <button onClick={() => setIsOpen(false)} className="close-link">Закрыть</button>
                                </div>
                            </Dialog.Panel>
                        </div>
                    </Dialog>
                </div>
            </div>
        </header>
    );
};

export default Header;