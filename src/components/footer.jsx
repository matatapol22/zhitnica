import React from 'react';
import '../styles/style.css';
import tg from '../image/icon-tg.svg';

const Footer = () => {
    return (
        <div className="footer">
            <div className="custom-container">
                <div className='footer-cont'>
                    <div className="footer-content-one">
                        <span href='#'>ЖИТНИЦА</span>
                        
                    </div>
                    <div className="footer-content">
                        <span>mail.com</span>
                        <span>+7 999 555 33 22</span>
                        <a href='https://t.me/zhitnicaStore'>
                            <img src={tg} alt="Logo" />
                        </a>
                    </div>
                    <div className="footer-content">
                        <a href='#'>Каталог</a>
                        <a href='#'>О нас</a>
                        <a href='#'>Заказы</a>
                        <a href='#'>Доставка</a>
                        <a href='#'>Оплата</a>
                    </div>
                    <div className="footer-content">
                        <a href='#'>Фито-мука</a>
                        <a href='#'>Травы</a>
                        <a href='#'>Масла</a>
                        <a href='#'>Уходовая косметика</a>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default Footer;  