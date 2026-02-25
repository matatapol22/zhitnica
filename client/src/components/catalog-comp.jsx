import React, { useEffect, useState } from "react";
import { Disclosure, DisclosureButton, DisclosurePanel, Listbox, ListboxButton, ListboxOption, ListboxOptions} from '@headlessui/react';
import '../styles/style.css';
import Card from '../components/card.jsx';

const categoryProduct = [
    {id: 1, name:'Фито-мука'},
    {id: 2, name:'Травы'},
]



const CatalogComp = () => {
    const [selectedCategory, setSelectedCategory] = useState([])
    const products = [
            { id: 1, image: '/images_product/product1.png', title: 'Драже из вишни', price: '150', description: 'Натуральный шоколад, сушёная вишня' },
            { id: 2, image: '/images_product/product2.png', title: 'Конфеты «Алтайская тыква»', price: '200', description: 'Семена тыквы,  натуральный шоколад' },
            { id: 3, image: '/images_product/product3.png', title: 'Конфеты «Кедровое ассорти»', price: '2000', description: 'Ядро кедрового ореха, мёдааааааааааааааааааааааааааааааа' },
            { id: 3, image: '/images_product/product3.png', title: 'Конфеты «Кедровое ассорти»', price: '2000', description: 'Ядро кедрового ореха, мёд' },
            { id: 3, image: '/images_product/product3.png', title: 'Конфеты «Кедровое ассорти»', price: '2000', description: 'Ядро кедрового ореха, мёд' },
            
        ];
    return (
        <div className='custom-container'>
            <h1 className='catalog-title'>Каталог</h1>
            <div className='catalog-menu'>
                <div className="catalog-menu-left">
                    <div className="catalog-menu-price">
                        <span className="catalog-menu-btn">Цена, ₽</span>
                        <input type="number" placeholder="0"></input>
                        <span className="text-[24px] p-1">-</span> 
                        <input type="number" placeholder="9999"></input>
                    </div>
                    <Listbox value={selectedCategory} onChange={setSelectedCategory} multiple>
                        <ListboxButton className="catalog-menu-btn">
                            Категории {selectedCategory.length > 0 ? `(${selectedCategory.length})` : ""}
                            
                        </ListboxButton>
                        
                        <ListboxOptions anchor="bottom start" className="catalog-menu-btn-category w-52 rounded-xl">
                        {categoryProduct.map((category) => (
                            <ListboxOption 
                            key={category.id} 
                            value={category} 
                            className="group flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 select-none data-[focus]:bg-[#D9DEA7]"
                            >
                            <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded bg-white transition-colors group-data-[selected]:bg-[#878B61]">
                                <svg 
                                className="h-3 w-3 stroke-white opacity-0 transition-opacity group-data-[selected]:opacity-100" 
                                viewBox="0 0 14 14" 
                                fill="none"
                                >
                                <path 
                                    d="M3 8L6 11L11 3.5" 
                                    strokeWidth="2.5" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                />
                                </svg>
                            </div>
                            <span className="text-sm text-[#515560] group-data-[selected]:font-medium group-data-[selected]:text-[#000]">
                                {category.name}
                            </span>
                            </ListboxOption>
                        ))}
                        </ListboxOptions>
                    </Listbox>
                </div>
                <div className="catalog-menu-right">
                    <div className="search-wrapper">
                    <div className="search-container">
                        <input 
                        type="search" 
                        className="search-input" 
                        placeholder="Найти травы..." 
                        />
                        <button className="search-button" aria-label="Поиск">
                        <svg className="search-icon" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 19L15 15M15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        </button>
                    </div>
                    </div>
                    
                </div>
                
            </div>
            <div className="grid grid-cols-4 gap-4"> 
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
    )
};
export default CatalogComp;  