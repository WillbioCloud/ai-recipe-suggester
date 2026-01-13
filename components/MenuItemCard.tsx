import React, { useState } from 'react';
import type { MenuItem } from '../types';

interface MenuItemCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, onAddToCart }) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCartClick = () => {
    onAddToCart(item);
    setIsAdded(true);
    // Reset the button state after a short delay
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-amber-200/80 overflow-hidden flex flex-col h-full transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      <img src={item.image} alt={item.name} className="w-full h-48 object-cover"/>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-amber-900">{item.name}</h3>
        <p className="text-slate-600 mt-1 flex-grow">{item.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-2xl font-bold text-amber-800" style={{ fontFamily: "'Georgia', 'serif'" }}>
            {item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </span>
          <button
            onClick={handleAddToCartClick}
            disabled={isAdded}
            className={`px-4 py-2 font-semibold text-white rounded-lg transition-all duration-300 transform flex items-center justify-center ${
              isAdded 
                ? 'bg-green-500' 
                : 'bg-amber-600 hover:bg-amber-700 hover:scale-105 focus:ring-4 focus:ring-amber-300'
            }`}
          >
            {isAdded ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Adicionado!
                </>
            ) : 'Adicionar'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;
