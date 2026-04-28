import React, { useState } from 'react';
import iconTriangle from '../image/icon-triangle.svg';

const OrderRow = ({ order }) => {
    const [isOpen, setIsOpen] = useState(false);
    const statusMap = {
        'pending': 'Cоздан',
        'processing': 'В обработке',
        'shipped': 'В пути',
        'delivered': 'Доставлен',
        'cancelled': 'Отменен'
    };

    return (
        <div className="border-b border-gray-100 last:border-none px-2 md:px-0">
            <div className="grid grid-cols-2 md:grid-cols-5 py-4 gap-y-2 md:gap-y-0 items-center text-sm font-medium text-gray-700">
                <div className="font-bold order-1">#{order.order_number}</div>
                <div className="text-gray-500 order-3 md:order-2 col-span-2 md:col-span-1 text-xs md:text-sm">
                    {order.created_at ? new Date(order.created_at).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: '2-digit' }) : 'Дата неизвестна'}
                </div>
                <div className="flex items-center gap-2 order-4 md:order-3">
                    {order.total_amount} ₽
                </div>
                <div className="font-bold order-2 md:order-4 text-right md:text-left">
                    {statusMap[order.status] || order.status}
                </div>
                <div className="text-right order-5 col-span-2 md:col-span-1 border-t border-gray-50 md:border-none pt-2 md:pt-0">
                    <button 
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-[#878B61] flex items-center gap-1 ml-auto hover:text-black transition-colors"
                    >
                        {isOpen ? 'Свернуть' : 'Детали'}
                        <span className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                            <img src={iconTriangle} alt="Детали" />
                        </span>
                    </button>
                </div>
            </div>
            {isOpen && (
                <div className="mb-4 p-4 md:p-6 border-2 border-[#b1b3b9] rounded-2xl bg-[#F4F5F6] flex flex-col md:grid md:grid-cols-2 gap-8">
                    <div className="w-full">
                        <h4 className="text-[14px] tracking-wider text-[#878B61] mb-4 font-medium uppercase">Состав заказа</h4>
                        <div className="space-y-4">
                            {order.items && order.items.map((item, idx) => (
                                <div key={idx} className="flex justify-between items-center gap-2">
                                    <div className="flex gap-3 items-center min-w-0">
                                        <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                            <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="truncate">
                                            <p className="text-sm truncate">{item.name} x{item.quantity}</p>
                                        </div>
                                    </div>
                                    <span className="text-[14px] text-[#4B5157] whitespace-nowrap">{item.price} ₽</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="border-t-2 md:border-t-0 md:border-l-2 border-[#b1b3b9] pt-6 md:pt-0 md:pl-8">
                        <h4 className="text-[14px] tracking-wider text-[#878B61] mb-4 font-medium uppercase">Информация о доставке</h4>
                        <div className="space-y-4 text-sm">
                            <div>
                                <p className="font-medium text-xs text-gray-400 uppercase mb-1">Адрес доставки</p>
                                <p className="font-normal text-[#4B5157]">{order.delivery_address || 'Не указан'}</p>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <p className="font-medium text-xs text-gray-400 uppercase mb-1">Получатель</p>
                                    <p className="font-normal text-[#4B5157]">{order.recipient_name || '—'}</p>
                                </div>
                                <div>
                                    <p className="font-medium text-xs text-gray-400 uppercase mb-1">Телефон</p>
                                    <p className="font-normal text-[#4B5157]">{order.recipient_phone || '—'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderRow;