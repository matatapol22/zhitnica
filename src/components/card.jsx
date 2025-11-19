import React from 'react';

const Card = ({ image, title, description, price  }) => {
  return (
    <div className='card'>
      <img src={image} alt={title} className='card-image' />
      <div className='card-content'>
        <h3 className='card-title'>{title}</h3>
        <p className='card-description'>{description}</p>
        <div className='product-card__footer'>
          <button className='product-card__btn'>В корзину</button>
          <div className='product-card__btn-quantity'>
              <button class="product-card-btn-um" type="button" aria-label="Уменьшить">-</button>
              <input class="product-card-input" type="text" value="1" readonly/>
              <button class="product-card-btn-uv" type="button" aria-label="Увеличить">+</button>
          </div>
          <span className='product-card-price'>{price}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;