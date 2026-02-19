import React, { useEffect, useState } from "react";
import { Disclosure, DisclosureButton, DisclosurePanel, Listbox, ListboxButton, ListboxOption, ListboxOptions} from '@headlessui/react';
import '../styles/style.css';

const categoryProduct = [
  { id: 1, name: 'Фито-мука' },
  { id: 2, name: 'Травы' },
  { id: 3, name: 'Мази' },
]

const CatalogComp = () => {
    const [selectedCategory, setSelectedCategory] = useState([])
    return (
        <div className='custom-container'>
            <h1 className='catalog-title'>Каталог</h1>
            <div className='catalog-menu'>
                <Disclosure>
                    <DisclosureButton className="catalog-menu-btn py-2">Цена, ₽ </DisclosureButton>
                        <DisclosurePanel className="text-gray-500">
                            100 - 500
                        </DisclosurePanel>
                </Disclosure>
                <Listbox value={selectedCategory} onChange={setSelectedCategory} multiple>
                    <ListboxButton className="catalog-menu-btn">
                        Категории {selectedCategory.length > 0 ? `(${selectedCategory.length})` : ""}
                        
                    </ListboxButton>
                    
                    <ListboxOptions anchor="bottom" className="catalog-menu-btn-category">
                        {categoryProduct.map((category) => (
                            <ListboxOption 
                                key={category.id} 
                                value={category} 
                                className="group flex items-center gap-2 cursor-pointer p-2 data-focus:bg-blue-50"
                            >
                                <span className="text-sm">{category.name}</span>
                            </ListboxOption>
                        ))}
                    </ListboxOptions>
                </Listbox>
            </div>
        </div>
    )
};
export default CatalogComp;  