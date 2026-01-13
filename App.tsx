import React, { useState, useCallback, useEffect } from 'react';
import type { MenuItem, CartItem } from './types';
import { menuData } from './data/menuData';

import Header from './components/Header';
import Footer from './components/Footer';
import AnimateOnScroll from './components/AnimateOnScroll';
import Menu from './components/Menu';
import Cart from './components/Cart';
import Hero from './components/Hero';
import Empadao3D from './components/Empadao3D';


export default function App() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  // Effect for handling header style on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAddToCart = useCallback((item: MenuItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        // Increment quantity if item already exists
        return prevCart.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      } else {
        // Add new item to cart
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  }, []);

  const handleUpdateQuantity = useCallback((itemId: number, newQuantity: number) => {
    setCart((prevCart) => {
      if (newQuantity <= 0) {
        // Remove item if quantity is 0 or less
        return prevCart.filter((item) => item.id !== itemId);
      }
      return prevCart.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );
    });
  }, []);
  
  const handleClearCart = useCallback(() => {
    setCart([]);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-amber-50 text-slate-800">
      <Header isScrolled={isScrolled} />
      <main className="flex-grow flex flex-col items-center">
        
        <Hero />
        
        {/* About Section with 3D Model */}
        <section className="w-full bg-white/50 my-8">
            <div className="w-full max-w-5xl container mx-auto p-4 sm:p-6 lg:p-8 grid md:grid-cols-2 gap-8 items-center">
                <AnimateOnScroll className="md:order-2">
                    <div className="w-full h-80 md:h-96 rounded-lg overflow-hidden">
                        <Empadao3D />
                    </div>
                </AnimateOnScroll>
                <AnimateOnScroll className="md:order-1">
                    <div className="text-center md:text-left">
                        <h2 className="text-4xl font-bold text-amber-900 tracking-tight" style={{ fontFamily: "'Georgia', 'serif'" }}>O Coração de Goiás</h2>
                        <p className="mt-4 text-lg text-slate-600">
                            Mais que uma receita, nosso empadão é um pedaço da nossa história. Cada camada de massa, cada ingrediente do recheio, é preparado com o mesmo carinho e tradição que a Tânia aprendeu com sua família, aqui mesmo em Caldas Novas.
                        </p>
                    </div>
                </AnimateOnScroll>
            </div>
        </section>


        <div className="w-full max-w-4xl container mx-auto p-4 sm:p-6 lg:p-8" id="menu">
           <AnimateOnScroll>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-amber-900 tracking-tight" style={{ fontFamily: "'Georgia', 'serif'" }}>Nosso Cardápio</h2>
              <p className="mt-2 text-lg text-slate-600">Feito com tradição e os melhores ingredientes de Goiás.</p>
            </div>
           </AnimateOnScroll>
          <Menu menuData={menuData} onAddToCart={handleAddToCart} />
        </div>
      </main>
      <Cart 
        cart={cart} 
        onUpdateQuantity={handleUpdateQuantity} 
        onClearCart={handleClearCart} 
      />
      <Footer />
    </div>
  );
}