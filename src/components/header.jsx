import { useState } from 'react';
import { Dialog } from '@headlessui/react'; 
import '../styles/style.css';
import logo from '../image/logo.svg';
import search from '../image/search.svg';
import cart from '../image/cart.svg';
import userIcon from '../image/user.svg';
import AuthModal from '../components/authModal.jsx';
import RegisterModal from '../components/registerModal.jsx'

const Header = () => {
    const [modalType, setModalType] = useState(null);

    return (
        <header className="app-header">
            <div className="custom-container">
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
                        <a href="#!" onClick={(e) => {setModalType('authModal'); }}>
                            <img src={userIcon} alt="User" />
                        </a>
                    </div>

                    <Dialog open={modalType !== null} onClose={() => setModalType(null)}>
                        <div className="modal-container">
                            <Dialog.Panel className="modal-panel">
                                {modalType === 'authModal' && <AuthModal setModalType={setModalType}/>}
                                {modalType === 'registerModal' && <RegisterModal setModalType={setModalType}/>}

                                
                            </Dialog.Panel>
                        </div>
                    </Dialog>
                </div>
            </div>
        </header>
    );
};

export default Header;