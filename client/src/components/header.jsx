import { useState, Fragment} from 'react';
import { Dialog, Transition } from '@headlessui/react'; 
import { Link } from 'react-router-dom';
import '../styles/style.css';
import logo from '../image/logo.svg';
import search from '../image/search.svg';
import cart from '../image/cart.svg';
import userIcon from '../image/user.svg';
import AuthModal from '../components/authModal.jsx';
import RegisterModal from '../components/registerModal.jsx'

const Header = ({ user, setUser }) => {
    const [modalType, setModalType] = useState(null);

    const handleLogout = () => {
        localStorage.removeItem('token'); 
        setUser(null); 
    };

    return (
        <header className="app-header">
            <div className="custom-container">
                <div className='header-content'>
                    <div className='header-logo'>
                        <Link to="/"><img src={logo} alt="Logo" /><p>Житница</p></Link>
                    </div>
                    
                    <div className='header-categories'>
                        <Link to="/" className="btn">Главная</Link>
                        <Link to="/catalog" className="btn">Каталог</Link>
                        <a className="btn" href="#">О нас</a>
                        <a className="btn" href="#">Заказы</a>
                    </div>

                    <div className='header-icons'>
                        <a href="#" className="flex flex-col items-center justify-center pl-[15px]">
                            <img className="flex" src={search} alt="Search" />
                            <p className="flex" >Поиск</p>
                        </a>
                        <a href="#" className="flex flex-col items-center justify-center pl-[15px]">
                            <img className="flex" src={cart} alt="Cart" />
                            <p className="flex" >Корзина</p>
                            
                        </a>
                        {user ? (
                            <Link to="/profile" className="flex flex-col items-center justify-center pl-[15px]">
                                <img className="flex" src={userIcon} alt="User" />
                                {/* Добавили проверку user.full_name перед split */}
                                <p className="flex">
                                    {user.full_name ? user.full_name.split(' ')[0] : 'Кабинет'}
                                </p>
                            </Link>
                        ) : (
                            <a href="#!" className="flex flex-col items-center justify-center pl-[15px]" 
                            onClick={(e) => { e.preventDefault(); setModalType('authModal'); }}>
                                <img className="flex" src={userIcon} alt="User" />
                                <p className="flex">Войти</p>
                            </a>
                        )}
                        
                    </div>

                    <Dialog open={modalType !== null} 
                            onClose={() => {}}
                    >
                        <div className="modal-overlay" aria-hidden="true" />
                        
                        <div className="modal-container">
                            <Dialog.Panel className="modal-panel">
                                <button 
                                    className="close-modal-btn" 
                                    onClick={() => setModalType(null)}
                                >
                                    ×
                                </button>
                                {modalType === 'authModal' && <AuthModal setModalType={setModalType} setUser={setUser}/>}
                                {modalType === 'registerModal' && <RegisterModal setModalType={setModalType} setUser={setUser}/>}

                                
                            </Dialog.Panel>
                        </div>
                    </Dialog>
                </div>
            </div>
        </header>
    );
};

export default Header;