import React from 'react';
import Card from '../components/card.jsx';

const Home = () => {
  const products = [
    { id: 1, image: '/images_product/product1.png', title: 'Драже из вишни', price: '150 ₽', description: 'Натуральный шоколад, сушёная вишня' },
    { id: 2, image: '/images_product/product2.png', title: 'Конфеты «Алтайская тыква»', price: '200 ₽', description: 'Семена тыквы,  натуральный шоколадСемена тыквы,  натуральный шоколад' },
    { id: 3, image: '/images_product/product3.png', title: 'Конфеты «Кедровое ассорти»', price: '2000 ₽', description: 'Ядро кедрового ореха, мёд' },
  ];
  return (
    <main className='home'>
        <div className='home-top'>
            <div className='container'>
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
        <div className='container'>
            <div className='home-popular'>
                <h2>ПОПУЛЯРНОЕ</h2>
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
            <div className='home-categories'>
                <h2>КАТЕГОРИИ</h2>
            </div>
        </div>
    </main>
  );
};

export default Home;