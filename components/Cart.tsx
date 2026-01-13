import React, { useState, useMemo, useEffect } from 'react';
import type { CartItem } from '../types';

interface CartProps {
  cart: CartItem[];
  onUpdateQuantity: (itemId: number, newQuantity: number) => void;
  onClearCart: () => void;
}

const WHATSAPP_NUMBER = "5564123456789"; // Substitua pelo número do restaurante (código do país + DDD + número)

const Cart: React.FC<CartProps> = ({ cart, onUpdateQuantity, onClearCart }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [customerName, setCustomerName] = useState('');
  const [deliveryOption, setDeliveryOption] = useState<'pickup' | 'delivery'>('pickup');
  const [nameError, setNameError] = useState('');

  const totalItems = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);
  const totalPrice = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);
  
  // Reset view when cart is closed
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setView('cart');
        setCustomerName('');
        setNameError('');
      }, 300); // Wait for closing animation
    }
  }, [isOpen]);

  const toggleCart = () => setIsOpen(!isOpen);

  const handleProceedToCheckout = () => {
    if (cart.length > 0) {
      setView('checkout');
    }
  };

  const handleFinalizeOrder = () => {
    if (!customerName.trim()) {
      setNameError('Por favor, informe seu nome.');
      return;
    }
    setNameError('');

    const orderItems = cart.map(item => 
      `- ${item.quantity}x ${item.name}`
    ).join('\n');

    const message = `Olá! Gostaria de fazer um pedido no *Empadão Goiano da Tânia*:\n\n${orderItems}\n\n*Total:* ${totalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}\n\n*Cliente:* ${customerName}\n*Opção:* ${deliveryOption === 'pickup' ? 'Retirada no local' : 'Entrega'}`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    setView('success');
  };

  const handleNewOrder = () => {
    onClearCart();
    setIsOpen(false);
  }

  return (
    <>
      {/* Floating Cart Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={toggleCart}
          className="bg-amber-800 text-white rounded-full shadow-lg w-16 h-16 flex items-center justify-center transform transition-transform hover:scale-110"
          aria-label={`Abrir carrinho com ${totalItems} itens`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center border-2 border-amber-800">
              {totalItems}
            </span>
          )}
        </button>
      </div>

      {/* Cart Modal */}
      <div className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={toggleCart}></div>
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-amber-50 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-4 border-b-2 border-amber-200">
            <h2 className="text-2xl font-bold text-amber-900">
              {view === 'cart' && 'Meu Pedido'}
              {view === 'checkout' && 'Finalizar Pedido'}
              {view === 'success' && 'Pedido Enviado!'}
            </h2>
            <button onClick={toggleCart} className="text-slate-500 hover:text-amber-800" aria-label="Fechar carrinho">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Cart View */}
          {view === 'cart' && (
            <>
              {cart.length === 0 ? (
                <div className="flex-grow flex flex-col items-center justify-center text-center p-4">
                  <span className="text-6xl mb-4">🧺</span>
                  <p className="text-xl font-semibold text-amber-800">Seu carrinho está vazio</p>
                  <p className="text-slate-600">Adicione alguns empadões para começar!</p>
                </div>
              ) : (
                <div className="flex-grow overflow-y-auto p-4 space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center space-x-4 bg-white p-2 rounded-lg shadow-sm">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md"/>
                      <div className="flex-grow">
                        <p className="font-bold text-amber-900">{item.name}</p>
                        <p className="text-sm text-amber-700">{item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 bg-slate-200 rounded-full font-bold text-slate-700 hover:bg-slate-300">-</button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 bg-slate-200 rounded-full font-bold text-slate-700 hover:bg-slate-300">+</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Checkout View */}
          {view === 'checkout' && (
             <div className="flex-grow overflow-y-auto p-6 space-y-6">
                <div>
                  <label htmlFor="customerName" className="block text-lg font-semibold text-amber-900 mb-2">Seu Nome</label>
                  <input
                    type="text"
                    id="customerName"
                    value={customerName}
                    onChange={(e) => { setCustomerName(e.target.value); setNameError(''); }}
                    placeholder="Como devemos te chamar?"
                    className={`w-full p-3 border rounded-lg shadow-sm transition duration-150 ${nameError ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-amber-500'} focus:ring-2 focus:border-transparent`}
                  />
                  {nameError && <p className="text-red-600 text-sm mt-1">{nameError}</p>}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-amber-900 mb-2">Opção de Entrega</h3>
                  <div className="grid grid-cols-2 gap-4">
                      <button onClick={() => setDeliveryOption('pickup')} className={`p-4 border-2 rounded-lg text-center font-semibold transition-colors ${deliveryOption === 'pickup' ? 'bg-amber-100 border-amber-600 text-amber-900' : 'bg-white border-slate-300 hover:border-amber-500'}`}>
                        Vou Retirar
                      </button>
                      <button onClick={() => setDeliveryOption('delivery')} className={`p-4 border-2 rounded-lg text-center font-semibold transition-colors ${deliveryOption === 'delivery' ? 'bg-amber-100 border-amber-600 text-amber-900' : 'bg-white border-slate-300 hover:border-amber-500'}`}>
                        Quero Entrega
                      </button>
                  </div>
                </div>
             </div>
          )}

          {/* Success View */}
          {view === 'success' && (
            <div className="flex-grow flex flex-col items-center justify-center text-center p-6">
                <span className="text-6xl mb-4">✅</span>
                <p className="text-2xl font-bold text-green-700">Pedido enviado com sucesso!</p>
                <p className="text-slate-600 mt-2">Abra o WhatsApp para confirmar seu pedido conosco. Entraremos em contato em breve!</p>
            </div>
          )}


          {/* Footer */}
          <div className="p-4 bg-white border-t-2 border-amber-200">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold text-slate-700">Total:</span>
              <span className="text-2xl font-bold text-amber-900">
                {totalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </span>
            </div>
            {view === 'cart' && (
              <button
                onClick={handleProceedToCheckout}
                disabled={cart.length === 0}
                className="w-full bg-amber-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-amber-700 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed"
              >
                Continuar
              </button>
            )}
            {view === 'checkout' && (
              <button
                onClick={handleFinalizeOrder}
                className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
              >
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="currentColor" viewBox="0 0 448 512"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.8 0-67.6-9.5-97.2-27.2l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>
                Enviar via WhatsApp
              </button>
            )}
             {view === 'success' && (
              <button
                onClick={handleNewOrder}
                className="w-full bg-amber-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-amber-700 transition-colors"
              >
                Fazer Novo Pedido
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
