import React, { useState } from 'react'; 
import logoutIcon from '../image/Icon-logout.svg';
import { PatternFormat } from 'react-number-format';
import OrderRow from '../components/orderRowClient.jsx';
import ClientOrdersHistory from '../components/clientOrdersHistory.jsx';
import logo from '../image/logo.svg';

const Profile = ({ user, setUser }) => {
    
    const [activeTab, setActiveTab] = useState('profile');

    const [passFormData, setPassFormData] = useState({
        password: '',
        new_password: '',
        rep_new_password: ''
    });

    React.useEffect(() => {
        if (user) {
            setProfileFormData({
                full_name: user.full_name || '',
                email: user.email || '',
                phone: user.phone || ''
            });
        }
    }, [user]);

    const [errorPass, setErrorPass] = useState('');
    const [errorProfileEdit, setErrorProfileEdit] = useState('');

    const [profileFormData, setProfileFormData] = useState({
        full_name: user ? user.full_name : '',
        email: user ? user.email : '',
        phone: user ? user.phone : ''
    });

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        window.location.href = "/"; 
    };

    const handleEditPassword = (e) => {
        setPassFormData({...passFormData, [e.target.name]: e.target.value}); // ... - создает копию объекта, потому что нельзя напрямую изменять состояние, а нужно создавать его копию и изменять уже ее
    }

    const handleProfileChange = async (e) => {
        setProfileFormData({ ...profileFormData, [e.target.name]: e.target.value });

    };

    const handleSubmitProfile = async (e) => {
        e.preventDefault();
        setErrorProfileEdit('');

        if (profileFormData.phone.includes('_')) {
            setErrorProfileEdit('Пожалуйста, введите номер телефона полностью');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/profile/edit-profile', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    full_name: profileFormData.full_name,
                    phone: profileFormData.phone
                })
            });

            const data = await response.json();

            if (response.ok) {

                if (data.noChanges) {
                    alert("Изменений не было");
                } else {
                    const updatedData = { ...user, ...profileFormData };
                    setUser(updatedData); 
                    localStorage.setItem('user', JSON.stringify(updatedData));
                    alert("Данные успешно сохранены!");
                }
            } else {
                setErrorProfileEdit(data.message || 'Ошибка при изменении данных');
            }
        } catch (err) {
            console.error("Детальная ошибка запроса:", err);
            setErrorProfileEdit('Ошибка при отправке данных', err);
        }
    };

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
        <div className="custom-container py-6 md:py-10">
            {/* Основной контейнер: на мобилках колонка, на десктопе ряд */}
            <div className='flex flex-col lg:flex-row gap-8'>    
                
                {/* Меню: на мобилках горизонтальный ряд с прокруткой */}
                <div className='w-full lg:w-64 flex-shrink-0'>
                    <div className='flex lg:flex-col overflow-x-auto lg:overflow-visible gap-2 pb-2 lg:pb-0 border-b lg:border-b-0 border-gray-100'>
                        <button 
                            className={`whitespace-nowrap px-6 py-3 rounded-xl transition-all ${activeTab === 'profile' ? 'bg-[#E8EEB0] font-bold' : 'hover:bg-gray-50'}`}  
                            onClick={() => setActiveTab('profile')}
                        >
                            Профиль
                        </button>
                        <button 
                            className={`whitespace-nowrap px-6 py-3 rounded-xl transition-all ${activeTab === 'orders' ? 'bg-[#E8EEB0] font-bold' : 'hover:bg-gray-50'}`}  
                            onClick={() => setActiveTab('orders')}
                        >
                            История заказов
                        </button>
                        <button 
                            onClick={handleLogout} 
                            className="flex items-center gap-2 px-6 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all mt-auto" 
                        >
                            <img src={logoutIcon} alt="logout" className="w-5 h-5"/>
                            <span>Выйти</span>
                        </button>
                    </div>
                </div>

                {/* Контентная часть */}
                <div className='flex-1'>
                    {activeTab === 'profile' && (
                        <div className='animate-fadeIn space-y-6'>
                            <div className='mb-6'>
                                <h2 className='text-2xl md:text-3xl font-bold text-[#141416]'>Настройки профиля</h2>
                                <p className='text-[#777E90] mt-2'>Управляйте своей личной информацией</p>
                            </div>
                            <form className='bg-white border-2 border-[#b1b3b9] rounded-[25px] p-4 md:p-8' onSubmit={handleSubmitProfile}>
                                <h3 className='text-xl mb-6 text-[#141416] block'>Личная информация</h3>
                                {errorProfileEdit && <div className="text-red-500 text-sm mb-4">{errorProfileEdit}</div>}
                                
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
                                    <div className='flex flex-col gap-2'>
                                        <label className='text-[14px] text-[#878B61] font-medium'>Имя Фамилия</label>
                                        <input 
                                            type="text" 
                                            name="full_name" 
                                            placeholder="Иван Иванов" 
                                            required 
                                            value={profileFormData.full_name}
                                            onChange={handleProfileChange}
                                            className='w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#E8EEB0] outline-none'
                                        />
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <label className='text-[14px] text-[#878B61] font-medium'>Почта</label>
                                        <input  
                                            type="email" 
                                            name="email" 
                                            value={profileFormData.email} 
                                            readOnly
                                            className='w-full p-3 border border-gray-100 bg-gray-50 rounded-xl text-gray-500 outline-none'
                                        />
                                    </div>
                                    <div className='flex flex-col gap-2 md:col-span-2'>
                                        <label className='text-[14px] text-[#878B61] font-medium'>Номер телефона</label>
                                        <PatternFormat
                                            format="+7 (###) ### ## ##"
                                            mask="_"
                                            name="phone"
                                            value={profileFormData.phone}
                                            className='w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#E8EEB0] outline-none'
                                            onValueChange={(values) => setProfileFormData({...profileFormData, phone: values.formattedValue})}
                                        />
                                    </div>
                                    
                                    <div className="md:col-span-2">
                                        <button className="w-full md:w-max px-10 py-3 bg-[#E8EEB0] hover:bg-[#d8de9a] text-black rounded-full transition-all" type="submit">
                                            Сохранить изменения
                                        </button>
                                    </div>
                                </div>
                            </form>

                            <form className='bg-white border-2 border-[#b1b3b9] rounded-[25px] p-4 md:p-8' onSubmit={handleSubmitPass}>
                                <h3 className='text-xl mb-6 text-[#141416] block'>Безопасность</h3>
                                {errorPass && <div className="text-red-500 text-sm mb-4">{errorPass}</div>}
                                
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
                                    <div className='flex flex-col gap-2 md:col-span-2'>
                                        <label className='text-[14px] text-[#878B61] font-medium'>Текущий пароль</label>
                                        <input 
                                            type="password" 
                                            name="password" 
                                            placeholder="••••••••" 
                                            required
                                            value={passFormData.password} 
                                            onChange={handleEditPassword}
                                            className='w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#E8EEB0] outline-none'
                                        />
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <label className='text-[14px] text-[#878B61] font-medium'>Новый пароль</label>
                                        <input  
                                            type="password" name="new_password" 
                                            placeholder="Минимум 8 символов" 
                                            required
                                            value={passFormData.new_password} 
                                            onChange={handleEditPassword}
                                            className='w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#E8EEB0] outline-none'
                                        />
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <label className='text-[14px] text-[#878B61] font-medium'>Повторите новый пароль</label>
                                        <input  
                                            type="password" 
                                            name="rep_new_password" 
                                            placeholder="••••••••" 
                                            required
                                            value={passFormData.rep_new_password} 
                                            onChange={handleEditPassword}
                                            className='w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#E8EEB0] outline-none'
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <button className="w-full md:w-max px-10 py-3 bg-[#E8EEB0] hover:bg-[#d8de9a] text-black rounded-full transition-all" type="submit">
                                            Изменить пароль
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    )}
                    {activeTab === 'orders' && <ClientOrdersHistory />}
                </div>
            </div>
        </div>
    )
}

export default Profile;