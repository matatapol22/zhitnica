import React, { useState } from 'react';
import iconTriangle from '../image/icon-triangle.svg';

const OrderRow = ({ order }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-100 last:border-none">
            {/* Основная строка: на мобилках 3 колонки, на десктопе 12 (или твои 5) */}
            <div className="grid grid-cols-3 md:grid-cols-12 py-4 items-center text-sm font-medium text-gray-700 px-2 md:px-6">
                
                {/* Номер заказа - виден всегда */}
                <div className="col-span-1 md:col-span-2 font-bold text-[#141416]">
                    #{order.id}
                </div>

                {/* Дата - скрыта на мобилках, видна от планшета (md) */}
                <div className="hidden md:block md:col-span-4 text-gray-500">
                    {order.date}
                </div>

                {/* Статус - скрыт на мобилках, либо можно оставить иконку */}
                <div className="hidden md:flex md:col-span-2 items-center gap-2">
                    {order.status}
                </div>

                {/* Сумма - видна всегда */}
                <div className="col-span-1 md:col-span-2 font-bold text-right md:text-left">
                    {order.total} ₽
                </div>

                {/* Кнопка действий */}
                <div className="col-span-1 md:col-span-2 text-right">
                    <button 
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-[#878B61] flex items-center gap-1 ml-auto hover:text-black transition-colors text-xs md:text-sm"
                    >
                        <span className="hidden sm:inline">{isOpen ? 'Свернуть' : 'Детали'}</span>
                        <span className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                            <img src={iconTriangle} alt="Детали" className="w-3 h-3 md:w-auto" />
                        </span>
                    </button>
                </div>
            </div>

            {/* Раскрывающийся блок деталей */}
            {isOpen && (
                <div className="mb-4 p-4 md:p-6 border-2 border-[#b1b3b9] rounded-2xl bg-[#F4F5F6] mx-2 md:mx-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        
                        {/* Состав заказа */}
                        <div>
                            <h4 className="text-[14px] tracking-wider text-[#878B61] mb-4 font-medium uppercase">Состав заказа</h4>
                            <div className="space-y-4">
                                {order.items.map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-center gap-4">
                                        <div className="flex gap-3 items-center">
                                            <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-lg overflow-hidden flex-shrink-0 shadow-sm">
                                                <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-sm truncate font-medium">{item.name}</p>
                                                <p className="text-xs text-gray-400 md:hidden">{order.date}</p> {/* Показываем дату здесь на мобилке */}
                                            </div>
                                        </div>
                                        <span className="text-sm font-bold whitespace-nowrap">{item.price} ₽</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Информация о доставке */}
                        {/* На мобилках убираем border-l и заменяем его на border-t или просто отступ */}
                        <div className="border-t-2 md:border-t-0 md:border-l-2 border-[#b1b3b9] pt-6 md:pt-0 md:pl-8">
                            <h4 className="text-[14px] tracking-wider text-[#878B61] mb-4 font-medium uppercase">Доставка</h4>
                            <div className="space-y-4 text-sm">
                                <div>
                                    <p className="font-bold text-xs uppercase text-gray-400 mb-1">Адрес доставки</p>
                                    <p className="font-normal text-[#4B5157] leading-relaxed">{order.address}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="font-bold text-xs uppercase text-gray-400 mb-1">Получатель</p>
                                        <p className="text-[#4B5157]">{order.receiver.split(',')[0]}</p>
                                    </div>
                                    <div>
                                        <p className="font-bold text-xs uppercase text-gray-400 mb-1">Статус</p>
                                        <p className="text-[#4B5157] md:hidden">{order.status}</p>
                                        <p className="hidden md:block text-[#4B5157]">В обработке</p>
                                    </div>
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