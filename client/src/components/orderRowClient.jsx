import React, { useState } from 'react';

const OrderRow = ({ order }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-100 last:border-none">
            {/* Основная строка */}
            <div className="grid grid-cols-5 py-4 items-center text-sm font-medium text-gray-700">
                <div className="font-bold">#{order.id}</div>
                <div className="text-gray-500">{order.date}</div>
                <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${order.statusColor}`}></span>
                    {order.status}
                </div>
                <div className="font-bold">{order.total} ₽</div>
                <div className="text-right">
                    <button 
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-green-600 flex items-center gap-1 ml-auto hover:text-green-700 transition-colors"
                    >
                        {isOpen ? 'Свернуть' : 'Детали'}
                        <span className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
                    </button>
                </div>
            </div>

            {/* Раскрывающийся блок деталей */}
            {isOpen && (
                <div className="mb-4 p-6 border border-yellow-100 rounded-2xl bg-white shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Состав заказа */}
                    <div>
                        <h4 className="text-xs uppercase tracking-wider text-gray-400 mb-4 font-bold">Состав заказа</h4>
                        <div className="space-y-4">
                            {order.items.map((item, idx) => (
                                <div key={idx} className="flex justify-between items-center">
                                    <div className="flex gap-3 items-center">
                                        <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
                                            <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm">{item.name}</p>
                                            <p className="text-xs text-gray-400">{item.weight} × {item.count}</p>
                                        </div>
                                    </div>
                                    <span className="font-bold text-sm">{item.price} ₽</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Информация о доставке */}
                    <div className="border-l border-gray-50 pl-8">
                        <h4 className="text-xs uppercase tracking-wider text-gray-400 mb-4 font-bold">Информация о доставке</h4>
                        <div className="space-y-3 text-sm">
                            <div className="flex gap-2">
                                <span className="text-gray-400">📍</span>
                                <div>
                                    <p className="font-bold">Адрес доставки</p>
                                    <p className="text-gray-500">{order.address}</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <span className="text-gray-400">👤</span>
                                <div>
                                    <p className="font-bold">Получатель</p>
                                    <p className="text-gray-500">{order.receiver}</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 flex gap-3">
                            <button className="bg-green-500 text-white px-6 py-2 rounded-xl font-bold text-xs hover:bg-green-600 transition-all flex items-center gap-2">
                                🟢 Отследить
                            </button>
                            <button className="bg-gray-100 text-gray-600 px-6 py-2 rounded-xl font-bold text-xs hover:bg-gray-200 transition-all">
                                📄 Чек
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};