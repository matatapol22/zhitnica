import React, { useState } from 'react'; 
import logoutIcon from '../image/Icon-logout.svg';
import OrderRow from '../components/orderRowClient.jsx';
import ClientOrdersHistory from '../components/clientOrdersHistory.jsx';
import SettingsProfileClient from '../components/settingsProfileClient.jsx';
import logo from '../image/logo.svg';

const Profile = ({ user, setUser }) => {
    
    const [activeTab, setActiveTab] = useState('profile');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        window.location.href = "/"; 
    };

    return(
        <div className="custom-container py-6 md:py-10">
            <div className='flex flex-col lg:flex-row gap-8'>    
                <div className='w-full lg:w-64 flex-shrink-0'>
                    <div className='flex lg:flex-col overflow-x-auto lg:overflow-visible gap-2 pb-2 lg:pb-0 border-b lg:border-b-0 border-gray-100'>
                        <button 
                            className={`whitespace-nowrap px-6 py-3 rounded-xl transition-all ${activeTab === 'profile' ? 'bg-[#E8EEB0] hover:bg-[#cacf9b] hover:border-[#cacf9b]' : 'hover:bg-[#fff] hover:border-[#fff]'}`}  
                            onClick={() => setActiveTab('profile')}
                        >
                            Профиль
                        </button>
                        <button 
                            className={`whitespace-nowrap px-6 py-3 rounded-xl transition-all ${activeTab === 'orders' ? 'bg-[#E8EEB0] hover:bg-[#cacf9b] hover:border-[#cacf9b]' : 'hover:bg-[#fff] hover:border-[#fff]'}`}  
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

                <div className='flex-1'>
                    {activeTab === 'profile' && <SettingsProfileClient user={user} setUser={setUser}/>}
                    {activeTab === 'orders' && <ClientOrdersHistory />}
                </div>
            </div>
        </div>
    )
}

export default Profile;