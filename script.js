/* --- IMPORTANDO DADOS DO ARQUIVO SEPARADO --- */
import { menuData } from './menu.js';

/* --- LÓGICA GERAL DO SITE --- */
let cart = [];

// Elementos DOM
const menuGrid = document.getElementById('menu-grid');
const highlightsGrid = document.getElementById('highlights-grid');
const tabs = document.querySelectorAll('.tab-btn');

// Função para criar o HTML do Card
// Função para criar o HTML do Card com opção Anota.ai
function createCardHTML(item) {
    // Se tiver link específico, usa ele. Se não, usa o geral da loja.
    const targetLink = item.anotaAiLink || 'https://pedido.anota.ai/loja/empado-goiano-da-tnia-caldas-novas';

    return `
        <div class="menu-item fade-in">
            <img src="${item.image}" alt="${item.name}" class="item-img" onerror="this.src='https://via.placeholder.com/300?text=Foto+do+Prato'">
            <div class="item-info">
                <h4>${item.name}</h4>
                <p class="item-desc">${item.description}</p>
                <div class="item-footer">
                    <div class="price-box">
                        <span class="price">R$ ${item.price.toFixed(2).replace('.', ',')}</span>
                    </div>
                    
                    <div class="action-buttons">
                        <a href="${targetLink}" target="_blank" class="btn-icon-link" aria-label="Ver no Anota.ai" title="Pedir pelo Anota.ai">
                            🔗
                        </a>

                        <button onclick="window.addToCart(${item.id})" class="add-btn" aria-label="Adicionar ao Carrinho WhatsApp">+</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// 1. Renderizar Home (Destaques)
function renderHighlights() {
    if (!highlightsGrid) return;
    const highlights = menuData.filter(item => item.highlight);
    highlightsGrid.innerHTML = highlights.map(item => createCardHTML(item)).join('');
}

// 2. Renderizar Cardápio Completo
function renderFullMenu(filterCategory = 'media') { // Começa exibindo as Médias
    if (!menuGrid) return;
    
    menuGrid.innerHTML = '';
    const items = menuData.filter(item => item.category === filterCategory);
    
    if(items.length === 0) {
         menuGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #666;">Em breve fotos desta categoria!</p>';
    } else {
        menuGrid.innerHTML = items.map(item => createCardHTML(item)).join('');
    }
}

// Eventos de Carregamento
document.addEventListener('DOMContentLoaded', () => {
    // Se estiver na Home
    if (highlightsGrid) renderHighlights();
    
    // Se estiver no Cardapio
    if (menuGrid) {
        renderFullMenu('media'); // Categoria padrão ao abrir
        
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                renderFullMenu(tab.dataset.category);
            });
        });
    }
});

/* --- LÓGICA DO CARRINHO (Global) --- */
// Precisamos anexar ao window porque o onclick do HTML procura lá
window.addToCart = (id) => {
    const item = menuData.find(i => i.id === id);
    if (!item) return;

    const existingItem = cart.find(i => i.id === id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    updateCartUI();
    
    // Animaçãozinha no botão
    const btn = document.getElementById('cart-btn');
    if(btn) {
        btn.classList.remove('hidden');
        btn.style.transform = 'scale(1.2)';
        setTimeout(() => btn.style.transform = 'scale(1)', 200);
    }
};

window.removeFromCart = (id) => {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
};

function updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    const cartBtn = document.getElementById('cart-btn');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    if (!cartCount) return;

    const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.innerText = totalQty;

    if (totalQty > 0) cartBtn.classList.remove('hidden');
    else cartBtn.classList.add('hidden');

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-msg">Seu carrinho está vazio 😢</p>';
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item-row">
                <div>
                    <strong>${item.name}</strong>
                    <div style="font-size:0.9rem; color:#666">
                        ${item.quantity}x R$ ${item.price.toFixed(2)}
                    </div>
                </div>
                <button onclick="window.removeFromCart(${item.id})" style="color:red; border:none; background:none; cursor:pointer;">&times;</button>
            </div>
        `).join('');
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.innerText = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

/* --- LÓGICA DE CHECKOUT PROFISSIONAL --- */

// Controle de Campos do Modal
window.toggleAddressField = () => {
    const type = document.getElementById('order-type').value;
    const fieldAddress = document.getElementById('field-extra');
    const fieldTable = document.getElementById('field-table');

    // Reseta visibilidade
    fieldAddress.classList.add('hidden');
    fieldTable.classList.add('hidden');

    if (type === 'delivery') {
        fieldAddress.classList.remove('hidden');
    } else if (type === 'mesa') {
        fieldTable.classList.remove('hidden');
    }
};

// Formatação e Envio
const checkoutBtn = document.getElementById('checkout-btn');

if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        const name = document.getElementById('client-name').value;
        const type = document.getElementById('order-type').value;
        const address = document.getElementById('client-address').value;
        const table = document.getElementById('table-number').value;
        const obs = document.getElementById('client-obs').value;

        // Validação
        if (!name) { alert('Por favor, informe seu nome.'); return; }
        if (type === 'delivery' && !address) { alert('Por favor, informe o endereço de entrega.'); return; }
        if (type === 'mesa' && !table) { alert('Por favor, informe o número da mesa.'); return; }
        if (cart.length === 0) { alert('Seu carrinho está vazio.'); return; }

        // Construindo a mensagem estilo "Ticket Fiscal"
        let msg = `*NOVO PEDIDO - SITE* 🛒%0A`;
        msg += `--------------------------------%0A`;
        
        // Tipo de Pedido (Destaque)
        if (type === 'mesa') msg += `🍽️ *NA MESA: ${table}*%0A`;
        else if (type === 'balcao') msg += `🥡 *RETIRADA BALCÃO*%0A`;
        else msg += `🛵 *DELIVERY*%0A`;
        
        msg += `👤 Cliente: *${name}*%0A`;
        msg += `--------------------------------%0A`;
        
        // Itens
        cart.forEach(item => {
            msg += `• ${item.quantity}x ${item.name}%0A`;
            // Se quiser colocar obs por item, seria aqui
        });
        
        msg += `--------------------------------%0A`;
        const total = cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
        msg += `💰 *TOTAL: R$ ${total.toFixed(2).replace('.', ',')}*%0A`;
        
        if (obs) msg += `📝 Obs: ${obs}%0A`;
        if (type === 'delivery') msg += `📍 End: ${address}%0A`;
        
        msg += `--------------------------------%0A`;
        msg += `Aguardo confirmação.`;

        // Enviar
        const phone = "5564999999999"; // Troque pelo da Tânia
        window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
    });
}

// Scroll e Parallax
window.addEventListener('scroll', () => {
    const header = document.getElementById('main-header');
    if (header && !header.classList.contains('header-scrolled')) {
        if (window.scrollY > 50) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
    }
    const bg = document.querySelector('.hero-bg-parallax');
    if(bg) bg.style.transform = `translateY(${window.scrollY * 0.5}px)`;

    document.querySelectorAll('.scroll-reveal').forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top < window.innerHeight - 100) el.classList.add('visible');
    });
});