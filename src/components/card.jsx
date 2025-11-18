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
          <button className='product-card__btn'>+ 1 -</button>
          <span>{price}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;