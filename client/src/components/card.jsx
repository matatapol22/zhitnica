import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ image, title, description, price, isCatalog  }) => {
  return (
    <Link to="/product">
      <div className='card'>
        <img src={image} alt={title} className='card-image' />
        <div className='card-content '>
          <h3 className={`card-title ${isCatalog ? 'text-sm' : 'text-lg'}`}>{title}</h3>
          <p className="card-description truncate">{description}</p>
          <span className={`product-card-price pb-1 ${isCatalog ? 'text-sm' : 'text-lg'}`}>{price + "₽"}</span>
          <button className='product-card__btn'>В корзину</button>
        </div>
      </div>
    </Link>
  );
};

export default Card;