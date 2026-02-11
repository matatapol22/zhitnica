import React from 'react';
import { useEffect } from 'react';
import Card from '../components/card.jsx';
import CategoriesSlider from '../components/сategories-slider.jsx'
import Footer from '../components/footer.jsx'
import orderCart from '../image/home-order-cart.svg';
import orderPay from '../image/home-order-pay.svg';
import orderMsg from '../image/home-order-msg.svg';

const Home = () => {
  const products = [
    { id: 1, image: '/images_product/product1.png', title: 'Драже из вишни', price: '150 ₽', description: 'Натуральный шоколад, сушёная вишня' },
    { id: 2, image: '/images_product/product2.png', title: 'Конфеты «Алтайская тыква»', price: '200 ₽', description: 'Семена тыквы,  натуральный шоколадСемена тыквы,  натуральный шоколад' },
    { id: 3, image: '/images_product/product3.png', title: 'Конфеты «Кедровое ассорти»', price: '2000 ₽', description: 'Ядро кедрового ореха, мёд' },
  ];
  useEffect(() => {
    // Ждем загрузки DOM
    const timer = setTimeout(() => {
        const mapContainer = document.getElementById('yandex-map');
        if (mapContainer && !mapContainer.innerHTML) {
        // Удаляем предыдущую карту, если она есть
        mapContainer.innerHTML = '';
        
        // Создаем скрипт для карты
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.charset = 'utf-8';
        script.async = true;
        script.src = `https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3Aed42dad986acc7855d51417761d41c6006ee59c0157e5ea778981717f4e5ef3c&width=100%&height=500&lang=ru_RU&scroll=true`;
        
        // Вставляем скрипт прямо в контейнер карты
        mapContainer.appendChild(script);
        }
    }, 100); // Небольшая задержка для гарантии отрисовки DOM

    return () => {
        clearTimeout(timer);
        const mapContainer = document.getElementById('yandex-map');
        if (mapContainer) {
        mapContainer.innerHTML = '';
        }
    };
    }, []);
  return (
    <main className='home'>
        <div className='home-top'>
            <div className='custom-container'>
                <div className='home-content'>
                    <h1>ПОЛЕЗНЫЕ ПРОДУКТЫ <br/> 
                        С ДОСТАВКОЙ <br/> 
                        ДЛЯ ВАШЕГО <br/> 
                        ЗДОРОВЬЯ</h1>
                    <p>Мы стараемся для вас, больше продукции <br/> 
                        вы можете найти в нашем каталоге</p>
                    <a href="#" className='btn-primary' >Перейти в каталог →</a>
                </div>
            </div>
        </div>
        <div className='custom-container'>
            <h2>ПОПУЛЯРНОЕ</h2>
            <div className='home-popular'>
                
                <div className='products-grid'>
                    {products.map(product => (
                    <Card 
                        key={product.id}
                        image={product.image}
                        title={product.title}
                        price={product.price}
                        description={product.description}
                    />
                    ))}
                </div>
            </div>
            <h2>КАТЕГОРИИ</h2>
            <CategoriesSlider />
            <h2>КАК СДЕЛАТЬ ЗАКАЗ?</h2>
            <div className='home-order-steps'>
                <div className='order-step order-step-one'>
                    <div className='order-step-overlay'>
                        <h3 className='order-step-name order-step-name-one'>1 Соберите корзину</h3>
                        <span className='order-step-text order-step-text-one'>Выберите понравившиеся товары и добавьте их в корзину</span>
                    </div>
                    <img src={orderCart} alt='Корзина'></img>
                </div>
                <div className='order-step order-step-two'>
                    <div className='order-step-overlay'>
                        <h3 className='order-step-name order-step-name-two'>2 Оплатите онлайн</h3>
                        <span className='order-step-text order-step-text-one'>Быстрая и безопасная оплата картой или через СБП    </span>
                    </div>
                    <img src={orderPay} alt='Оплата'></img>
                </div>
                <div className='order-step order-step-three'>
                    <div className='order-step-overlay'>
                        <h3 className='order-step-name order-step-name-three'>3 Получите уведомление</h3>
                        <span className='order-step-text order-step-text-three'>Мы позвоним вам, согласуем детали и сроки доставки</span>
                    </div>
                    <img src={orderMsg} alt='Уведомление'></img>
                </div>
            </div>
            <h2>ГДЕ МЫ НАХОДИМСЯ?</h2>
            <div className='home-map'>
                <div className='home-map-info'>
                    <div className='home-map-info-texts'>
                        <span className='home-map-info-text'>Ждем вас в гости в нашем физическом магазине!
                                                         Здесь вас встретит весь наш ассортимент, а еще 
                                                        вы сможете лично продегустировать любые продукты перед покупкой.
                        </span>
                    </div>
                    <div className='home-map-info-card'>
                        <div className='home-map-info-card-one'>
                            <span className='home-map-info-card-text-one'>Адрес:</span>
                            <span className='home-map-info-card-text'>ПН - ПТ   с 10:00 до 19:00<br/>
                                                                      СБ        с 11:00 до 17:00<br/>          
                            </span>
                        </div>
                        <div className='home-map-info-card-one'>
                            <span className='home-map-info-card-text-two'>Часы работы:</span>
                            <span className='home-map-info-card-text'>Красноярск, <br/>
                                                            Проспект Мира, 60 (1 этаж) <br/>          
                            </span>
                        </div>
                    </div>
                </div>
                <div className='home-map-container'>
                    <div id="yandex-map" style={{ width: '1120px', height: '500px' }}></div>
                    {/* высоту подбери под дизайн, например 400–600px */}
                </div>

            </div>

        </div>
        <Footer />
        
    </main>
  );
};

export default Home;