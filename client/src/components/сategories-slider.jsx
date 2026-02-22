import { useState, useEffect } from 'react';
import '../styles/style.css';
import { Link } from 'react-router-dom';

function CategoriesSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const categories = [
    {
      id: 1,
      title: "Фито-мука",
      image: "/images_product/category-oil.png",
      color: "#5D727D"
    },
    {
      id: 2, 
      title: "Травы",
      image: "/images_product/category-herb.png",
      color: "#8F926B"
    },
    {
      id: 3,
      title: "Масла", 
      image: "/images_product/category-oil.png",
      color: "#8F926B"
    },
    {
      id: 4,
      title: "Специи",
      image: "/images_product/category-herb.png", 
      color: "#5D727D"
    },
    {
      id: 5,
      title: "Чаи",
      image: "/images_product/category-herb.png",
      color: "#8F926B"
    }
  ];

  // Функция для плавного перехода
  const navigateToSlide = (newIndex) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentIndex(newIndex);
    
    // Сбрасываем анимацию после завершения
    setTimeout(() => setIsAnimating(false), 500);
  };

  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % categories.length;
    navigateToSlide(newIndex);
  };

  const prevSlide = () => {
    const newIndex = (currentIndex - 1 + categories.length) % categories.length;
    navigateToSlide(newIndex);
  };

  // Автоплей
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        nextSlide();
      }
    }, 5500);
    
    return () => clearInterval(interval);
  }, [currentIndex, isAnimating]);

  // Получаем индексы для отображения
  const getDisplayIndexes = () => {
    const indexes = [currentIndex];
    
    // Добавляем следующие две категории
    for (let i = 1; i <= 2; i++) {
      indexes.push((currentIndex + i) % categories.length);
    }
    
    return indexes;
  };

  const displayIndexes = getDisplayIndexes();

  return (
    <div className="container">
      <div className="categories-grid-slider">
        
        {/* Фиксированная сетка с меняющимся контентом */}
        <div className="categories-grid">
          
          <div className="category-card category-card-large">
            <div 
              className={`category-image ${isAnimating ? 'fade-in' : ''}`}
              style={{
                backgroundImage: `url(${categories[displayIndexes[0]].image})`
              }}
              key={displayIndexes[0]} // key для анимации
            />
            <span 
              className="category-text"
              style={{ color: categories[displayIndexes[0]].color }}
            >
              {categories[displayIndexes[0]].title}
            </span>
          </div>
            
          {/* Верхняя маленькая карточка */}
          <div className="category-card category-card-small">
            <div 
              className={`category-image ${isAnimating ? 'fade-in' : ''}`}
              style={{
                backgroundImage: `url(${categories[displayIndexes[1]].image})`
              }}
              key={displayIndexes[1]}
            />
            <span 
              className="category-text"
              style={{ color: categories[displayIndexes[1]].color }}
            >
              {categories[displayIndexes[1]].title}
            </span>
          </div>
          
          {/* Нижняя маленькая карточка */}
          <div className="category-card category-card-small-second">
            <div 
              className={`category-image ${isAnimating ? 'fade-in' : ''}`}
              style={{
                backgroundImage: `url(${categories[displayIndexes[2]].image})`
              }}
              key={displayIndexes[2]}
            />
            <span 
              className="category-text"
              style={{ color: categories[displayIndexes[2]].color }}
            >
              {categories[displayIndexes[2]].title}
            </span>
          </div>
          <Link to="/catalog" className='home-categories-footer'>
            <a href="#" className="home-categories-btn">
              Чтобы увидеть всю нашу коллекцию, загляните в полный&nbsp;
              <span style={{ color: '#8F926B', fontWeight: 600 }}>
                КАТАЛОГ →
              </span> 
            </a>

          </Link>
          
        </div>

        {/* Кнопки навигации */}
        <button 
          className="slider-nav-btn slider-prev"
          onClick={prevSlide}
          disabled={isAnimating}
        >
          ‹
        </button>
        
        <button 
          className="slider-nav-btn slider-next"
          onClick={nextSlide}
          disabled={isAnimating}
        >
          ›
        </button>
      </div>
    </div>
  );
}

export default CategoriesSlider;