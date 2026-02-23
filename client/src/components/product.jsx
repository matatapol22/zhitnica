import React, { useEffect, useState } from "react";

const Product = () => {
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
                        <button class="qty-minus">−</button>
                        <input type="text" value="1" class="qty-input" readonly></input>
                        <button class="qty-plus">+</button>
                    </div>
                    <button class="prosuct-favorite-btn" aria-label="Добавить в избранное">
                        
                    </button>
                    <button class="add-to-cart-btn">В корзину</button>
                    </div>
                </div>
                
            </div>
            <div className="product-addinfo">

            </div>
            <div className="product-recomm">

            </div>
        </div>
    )
}

export default Product;