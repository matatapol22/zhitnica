import { useState, useEffect, Fragment} from 'react';
import OrderRow from '../components/orderRowClient.jsx';

const ClientOrdersHistory = ({}) => {
    const [activeButton, setActiveButton] = useState('all');
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/profile/my-orders', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setOrders(data);
                    console.log("Загруженные заказы:", data);
                } else {
                    console.error("Ошибка при загрузке заказов:", response.statusText);
                }
            } catch (err) {
                console.error("Ошибка загрузки заказов:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) return <div>Загрузка заказов...</div>;
    console.log("Отображаемые заказы:", orders);

    return (
        <div className='p-0 md:p-4'>
            <div className='flex flex-col md:flex-row justify-between items-start md:items-end gap-4 px-4 md:px-0'>
                <div className='mb-6'>
                    <h2 className='text-xl md:text-2xl font-bold'>История заказов</h2>
                    <p className='text-[#777E90]'>Просматривайте свои заказы</p>
                </div>
                <div className="pb-4 flex gap-1 overflow-x-auto w-full md:w-auto no-scrollbar">
                    <button 
                        className={`whitespace-nowrap px-4 py-2 rounded-xl border-2 ${activeButton === 'all' ? 'border-[#E8EEB0] bg-[#E8EEB0] text-black hover:bg-[#cacf9b] hover:border-[#cacf9b]' : 'border-[#F6F8F6] hover:bg-[#fff] hover:border-[#fff]'}`} 
                        onClick={() => setActiveButton('all')}
                    >
                        Все
                    </button>
                    <button 
                        className={`whitespace-nowrap px-4 py-2 rounded-xl border-2 ${activeButton === 'processing' ? 'border-[#E8EEB0] bg-[#E8EEB0] text-black hover:bg-[#cacf9b] hover:border-[#cacf9b]' : 'border-[#F6F8F6] hover:bg-[#fff] hover:border-[#fff]'}`} 
                        onClick={() => setActiveButton('processing')}
                    >
                        В обработке
                    </button>
                    <button 
                        className={`whitespace-nowrap px-4 py-2 rounded-xl border-2 ${activeButton === 'archived' ? 'border-[#E8EEB0] bg-[#E8EEB0] text-black hover:bg-[#cacf9b] hover:border-[#cacf9b]' : 'border-[#F6F8F6] hover:bg-[#fff] hover:border-[#fff]'}`} 
                        onClick={() => setActiveButton('archived')}
                    >
                        Архив
                    </button>
                </div>
            </div> 
            <div className="bg-white md:rounded-3xl border-[#b1b3b9] border-y-2 md:border-2 overflow-hidden">
                <div className="grid grid-cols-2 md:grid-cols-5 tracking-[0.05em] text-[10px] md:text-[11px] uppercase text-[#777E90] font-bold py-4 px-4 md:px-6 border-b-2 border-[#b1b3b9] bg-[#F4F5F6]">
                    <div className="order-1">№ Заказа</div>
                    <div className="hidden md:block order-2">Дата оформления</div>
                    <div className="hidden md:block order-3">Статус</div>
                    <div className="order-2 text-right md:text-left">Сумма</div>
                    <div className="hidden md:block order-5 text-right">Действия</div>
                </div>

                <div className="max-h-[500px] overflow-y-auto custom-scrollbar">
                    <div className="divide-y divide-gray-50 px-4 md:px-6">
                        {orders.map((order) => (
                            <OrderRow key={order.id} order={order} />
                        ))}
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mt-6 px-4 md:px-0">
                <div className="border-solid border-2 border-[#b1b3b9] rounded-[25px] p-[15px] bg-[#fff] flex justify-between items-center md:block">
                    <p className="text-[14px] text-[#777E90]">Всего заказов</p>
                    <p className="text-[22px] ">24</p>
                </div>
                <div className="border-solid border-2 border-[#b1b3b9] rounded-[25px] p-[15px] bg-[#fff] flex justify-between items-center md:block">
                    <p className="text-[14px] text-[#777E90]">Общая сумма</p>
                    <p className="text-[22px] ">54 200 ₽</p>
                </div>
            </div>
        </div>
    );
}

export default ClientOrdersHistory;