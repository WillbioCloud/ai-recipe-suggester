import React, { useState } from 'react';
import type { MenuItem, MenuCategory } from '../types';
import MenuItemCard from './MenuItemCard';
import AnimateOnScroll from './AnimateOnScroll';

interface MenuProps {
  menuData: MenuCategory[];
  onAddToCart: (item: MenuItem) => void;
}

type CategoryKey = 'empadao' | 'combo' | 'bebida';

const Menu: React.FC<MenuProps> = ({ menuData, onAddToCart }) => {
  const [activeCategoryKey, setActiveCategoryKey] = useState<CategoryKey>('empadao');

  // Derive categories for tabs from the data itself
  const categories = menuData.map(category => ({
    key: category.key,
    name: category.name
  }));

  // Find the full data for the active category
  const activeCategoryData = menuData.find(category => category.key === activeCategoryKey);

  return (
    <section>
      {/* Category Tabs */}
      <div className="flex justify-center mb-4 border-b-2 border-amber-200">
        {categories.map(({ key, name }) => (
          <button
            key={key}
            onClick={() => setActiveCategoryKey(key)}
            className={`px-4 sm:px-6 py-3 text-lg font-semibold transition-colors duration-300 ease-out -mb-0.5
              ${activeCategoryKey === key 
                ? 'border-b-4 border-amber-600 text-amber-800' 
                : 'text-slate-500 hover:text-amber-700'}`}
          >
            {name}
          </button>
        ))}
      </div>
      
      {/* Category Description */}
      {activeCategoryData && (
        <AnimateOnScroll key={activeCategoryData.key}>
            <p className="text-center text-slate-600 mb-8 text-lg italic">{activeCategoryData.description}</p>
        </AnimateOnScroll>
      )}

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {activeCategoryData?.items.map((item, index) => (
           <AnimateOnScroll key={item.id} className="w-full" style={{ transitionDelay: `${index * 100}ms`}}>
             <MenuItemCard item={item} onAddToCart={onAddToCart} />
           </AnimateOnScroll>
        ))}
      </div>
    </section>
  );
};

export default Menu;