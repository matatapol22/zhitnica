import React, { useEffect, useState } from "react";
import Card from '../components/card.jsx';

const Product = () => {
    const [activeTab, setActiveTab] = useState('description');
    const [valueProductToCard, setValueProductToCard] = useState(1);

    const handleValueProductToCard = (type) => {
        type === 'plus' ? setValueProductToCard(prev => prev + 1) : setValueProductToCard(prev => prev - 1) ;
    }
    const products = [
            { id: 1, image: '/images_product/product1.png', title: 'Драже из вишни', price: '150', description: 'Натуральный шоколад, сушёная вишня' },
            { id: 2, image: '/images_product/product2.png', title: 'Конфеты «Алтайская тыква»', price: '200', description: 'Семена тыквы,  натуральный шоколад' },
            { id: 3, image: '/images_product/product3.png', title: 'Конфеты «Кедровое ассорти»', price: '2000', description: 'Ядро кедрового ореха, мёдааааааааааааааааааааааааааааааа' },
            { id: 3, image: '/images_product/product3.png', title: 'Конфеты «Кедровое ассорти»', price: '2000', description: 'Ядро кедрового ореха, мёд' },
            
        ];
    
    return (
        <div className="custom-container">
            <div className="product-main">
                <div className="product-main-cont-image">
                    <img src='/images_product/g4gsti1asv1p3ua609u1jkyhrclzenm0.jpg' className="product-main-image"></img>
                </div>
                
                <div className="product-main-info pl-[5%] ">
                    <h1>Драже из вишни</h1>
                    
                    <p >Набор конфет в форме шоколадных матрёшек, внутрь которых заключён отборный кедровый орех с добавлением клюквы и натурального алтайского мёда.</p>
                    <span className="mt-[5%]" >150 ₽</span>
                    <div class="product-footer">
                    <div class="quantity-controls">
                        <button class="qty-minus" onClick={() => handleValueProductToCard('minus')}>−</button>
                        <input type="text" value={valueProductToCard} class="qty-input" readOnly></input>
                        <button class="qty-plus" onClick={() => handleValueProductToCard('plus')}>+</button>
                    </div>
                    <button class="prosuct-favorite-btn" aria-label="Добавить в избранное">
                        
                    </button>
                    <button class="add-to-cart-btn">В корзину</button>
                    </div>
                </div>
                
            </div>
            <div className="product-addinfo">

                <button className={activeTab === 'description' ? 'active' : ''} onClick={() => {setActiveTab('description')}}>
                    Описание
                </button>
                <button className={activeTab === 'structure' ? 'active' : ''} onClick={() => {setActiveTab('structure')}}>
                    Состав
                </button>
                <div className="product-addinfo-text">
                    {activeTab === 'description' && <p>Ядро кедрового ореха, натуральный шоколад </p>}
                    {activeTab === 'structure' && <p>ffff</p>}
                </div>

            </div>
            <div className="product-recomm">
                <h2>Вам может понравится</h2>
                <div className="grid grid-cols-4 gap-4 mt-[5%]">
                    {products.map(product => (
                        <Card 
                            key={product.id}
                            image={product.image}
                            title={product.title}
                            price={product.price}
                            description={product.description}
                            isCatalog={true}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Product;